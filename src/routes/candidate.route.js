const express = require('express');
const router = express.Router();

router.use("/quizzes", require("../modules/quiz/routes/candidate.routes"));

module.exports = router;