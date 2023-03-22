const { body } = require('express-validator');

const createQuizValidation = [
    body('title').notEmpty().withMessage('Title is required'),
    body('isPublished').notEmpty().withMessage('Is published is required').isBoolean(),
    body('description').notEmpty().withMessage('Description is required'),
    body('questions')
        .isArray({ min: 1 })
        .withMessage('Questions must be an array with at least one question'),
    body('questions.*.text')
        .notEmpty()
        .withMessage('Question text is required for all questions'),
    body('questions.*.isMandatory').isBoolean().withMessage('Mandatory must be a boolean'),
    body('questions.*.choices')
        .optional({ nullable: true })
        .isArray({ max: 5 })
        .withMessage('Choices must be an array with no more than 5 choices'),
    body('questions.*.choices.*.text')
        .optional({ nullable: true })
        .notEmpty()
        .withMessage('Choice text is required for all choices'),
    body('questions.*.choices.*.isCorrect')
        .optional({ nullable: true })
        .isBoolean()
        .withMessage('isCorrect must be a boolean for all choices'),
]

const createSubmissionValidator = [
    // body('answers')
    //     .isArray({ min: 1 })
    //     .withMessage('Answers must be an array with at least one answer'),
    body('answers.*.questionId').notEmpty().withMessage('Question ID is required for all answers'),
    body('answers.*.choiceId').notEmpty().withMessage('Choice ID is required for all answers'),
]

module.exports = { createQuizValidation, createSubmissionValidator }