const QuizService = require("./quiz.service");
const { sendResponse } = require("../../utils/response");
const HttpStatusCode = require("../../constants/http-status-code");

class QuizController {
  constructor() {
    this.quizService = new QuizService()
  }

  createQuiz = async (req, res) => {
    try {
      const quiz = await this.quizService.createQuiz(req.body);

      sendResponse(res, HttpStatusCode.OK, true, { id: quiz, message: "Succesfully created quiz" })

    } catch (error) {
      console.error(error);
      sendResponse(res, HttpStatusCode.BAD_REQUEST, false, null, [error])
    }
  }

  getQuiz = async (req, res) => {
    try {
      const quiz = await this.quizService.getQuizById(req.params.id);

      sendResponse(res, HttpStatusCode.OK, true, quiz)

    } catch (error) {
      console.error(error);
      sendResponse(res, HttpStatusCode.BAD_REQUEST, false, null, [error])
    }
  }

  submitQuiz = async (req, res) => {
    try {
      await this.quizService.submitQuizResponse(req.params.id, req.body)

      sendResponse(res, HttpStatusCode.OK, true, { message: "Successfully submitted your response." })

    } catch (error) {
      console.error(error);
      sendResponse(res, HttpStatusCode.BAD_REQUEST, false, null, [error])
    }
  }

  publishQuiz = async (req, res) => {
    try {
      await this.quizService.publishQuiz(req.params.id)

      sendResponse(res, HttpStatusCode.OK, true, { message: "Successfully published the quiz." })
    } catch (error) {
      sendResponse(res, HttpStatusCode.BAD_REQUEST, false, null, [error])

    }
  }
}

module.exports = new QuizController();
