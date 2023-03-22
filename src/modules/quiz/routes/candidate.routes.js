const express = require("express");
const { validateBody } = require("../../../middleware/validator.middleware");
const router = express.Router();
const QuizController = require("../quiz.controller");
const { createQuizValidation, createSubmissionValidator } = require("../quiz.validator");

router.post(
    `/submit`,
    createQuizValidation,
    validateBody,
    QuizController.createQuiz
);

router.get('/:id', QuizController.getQuiz)
router.post('/:id/submit', createSubmissionValidator, validateBody, QuizController.submitQuiz)

// app.get('/:id', async (req, res) => {
//     const quiz = await db('quizzes')
//         .select()
//         .where({ id: req.params.id })
//         .first();

//     if (!quiz) {
//         res.sendStatus(404);
//         return;
//     }

//     const questions = await db('questions')
//         .select()
//         .where({ quizId: quiz.id });

//     const questionIds = questions.map(q => q.id);

//     const choices = await db('choices')
//         .select()
//         .whereIn('questionId', questionIds);

//     res.json({
//         id: quiz.id,
//         title: quiz.title,
//         description: quiz.description,
//         questions: questions.map(question => ({
//             id: question.id,
//             text: question.text,
//             isMandatory: question.isMandatory,
//             choices: choices.filter(choice => choice.questionId === question.id).map(choice => ({
//                 id: choice.id,
//                 text: choice.text,
//                 isCorrect: choice.isCorrect
//             }))
//         }))
//     });
// });

module.exports = router;