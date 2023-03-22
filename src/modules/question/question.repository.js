const knex = require('../../config/database.config');

class QuestionRepository {
    async create(question, trx) {
        const [id] = await (trx || knex)('questions').insert(question);

        return id;
    }

    async getQuestionsByQuizId(quizId, trx) {
        const questions = await (trx || knex)('questions').where('quiz_id', quizId);

        return questions
    }
}

module.exports = QuestionRepository;
