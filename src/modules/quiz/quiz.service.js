const knex = require('../../config/database.config');
const QuestionRepository = require('../question/question.repository');
const ChoiceRepository = require('../question/choice.repository');
const QuizRepository = require('./quiz.repository');
const EntityNotFoundException = require('../../exceptions/entity-not-found.exception');
const AnswerRepository = require('../question/answer.repository');
const SubmissionRepository = require('./submission.repository');
const MandatoryQuestionNotAttendedException = require('../../exceptions/mandatory-question-not-attended.exception');

class QuizService {
  constructor() {
    this.quizRepository = new QuizRepository();
    this.questionRepository = new QuestionRepository();
    this.choiceRepository = new ChoiceRepository();
  }

  async createQuiz({ title, description, questions, isPublished }) {
    const trx = await knex.transaction();
    try {
      const quiz = await this.quizRepository.create({ title, description, is_published: isPublished }, trx);

      await Promise.all(questions.map(async ({ text, isMandatory, choices }) => {
        const questionId = await this.questionRepository.create({ quiz_id: quiz, text, is_mandatory: isMandatory }, trx);
        for (let choiceIndex = 0; choiceIndex < choices.length; choiceIndex++) {
          const { text, isCorrect } = choices[choiceIndex]
          await this.choiceRepository.create({ question_id: questionId, text, is_correct: isCorrect }, trx)
        }
      }));
      await trx.commit();

      return quiz;
    } catch (error) {
      await trx.rollback();

      throw error;
    }
  }

  async getQuizById(id) {
    try {
      const quiz = await this.quizRepository.findById(id);

      if (!quiz) {
        throw new EntityNotFoundException(`Quiz id ${id} not found`)
      }

      const questions = await this.questionRepository.getQuestionsByQuizId(id)
      const questionIds = questions.map(question => question.id);
      const choices = await this.choiceRepository.findByQuestionIds(questionIds)

      return {
        id: quiz.id,
        title: quiz.title,
        description: quiz.description,
        questions: questions.map(question => ({
          id: question.id,
          text: question.text,
          isMandatory: Boolean(question.is_mandatory),
          choices: choices.filter(choice => choice.question_id === question.id).map(choice => ({
            id: choice.id,
            text: choice.text,
          }))
        }))
      }
    } catch (error) {
      throw error;
    }
  }

  async submitQuizResponse(quizId, { answers }) {
    const trx = await knex.transaction();

    try {
      const quiz = await this.quizRepository.findById(quizId);
      if (!quiz) {
        throw new EntityNotFoundException(`Quiz id ${quizId} not found`)
      }

      const questions = await this.questionRepository.getQuestionsByQuizId(quizId)
      // Check if any mandatory questions are missing answers
      const missingMandatoryQuestions = questions.filter((question) => {
        return question.is_mandatory && !answers.some((answer) => answer.questionId === question.id);
      });

      if (missingMandatoryQuestions.length > 0) {
        // Rollback transaction if mandatory questions are missing answers
        await trx.rollback();

        throw new MandatoryQuestionNotAttendedException()
      }

      const answerRepository = new AnswerRepository()
      const submissionRepository = new SubmissionRepository()

      const submissionId = await submissionRepository.create({ quiz_id: quizId }, trx)
      const answerInserts = answers.map(({ questionId, choiceId }) => { return { submission_id: submissionId, question_id: questionId, choice_id: choiceId } }
      );

      await answerRepository.createMany(answerInserts, trx)

      await trx.commit()
    } catch (error) {
      await trx.rollback()

      throw error
    }
  }

  async publishQuiz(quizId) {
    const quiz = await this.quizRepository.findById(quizId);
    if (!quiz) {
      throw new EntityNotFoundException(`Quiz id ${quizId} not found`)
    }

    await this.quizRepository.update(quizId, { is_published: true })
  }
}

module.exports = QuizService;