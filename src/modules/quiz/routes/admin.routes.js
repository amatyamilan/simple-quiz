const express = require("express");
const { validateBody } = require("../../../middleware/validator.middleware");
const router = express.Router();
const QuizController = require("../quiz.controller");
const { createQuizValidation } = require("../quiz.validator");

router.post(
  `/`,
  createQuizValidation,
  validateBody,
  QuizController.createQuiz
);

router.patch(
  `/:id/publish`,
  QuizController.publishQuiz
);

module.exports = router;