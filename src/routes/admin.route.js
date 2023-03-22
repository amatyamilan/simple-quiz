const express = require('express');
const router = express.Router();

router.use("/quizzes", require("../modules/quiz/routes/admin.routes"));

module.exports = router;