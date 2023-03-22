// require("dotenv").config();

// const express = require('express');
// const app = express();
// const routes = require('./routes/main.route')
// app.use(express.json())


// // Initialize routes
// app.use(routes);

// app.use(bodyParser.json());

// // Admin endpoints

// app.post('/quizzes', (req, res) => {
//   const { title, description, questions } = req.body;

//   // db.transaction(async trx => {
//   //   const quiz = await trx('quizzes')
//   //     .insert({ title, description })
//   //     .returning('id')
//   //     .then(rows => rows[0]);

//   //   const questionInserts = questions.map(({ text, isMandatory, choices }) =>
//   //     trx('questions')
//   //       .insert({ quizId: quiz, text, isMandatory })
//   //       .returning('id')
//   //       .then(rows => rows[0])
//   //       .then(questionId =>
//   //         trx('choices').insert(
//   //           choices.map(({ text, isCorrect }) => ({ questionId, text, isCorrect }))
//   //         )
//   //       )
//   //   );

//   //   await Promise.all(questionInserts);

//     res.json({ id: quiz });
//   });
// });


// app.patch('/quizzes/:id', (req, res) => {
//   const { status } = req.body;

//   db('quizzes')
//     .where({ id: req.params.id })
//     .update({ status })
//     .then(() => res.sendStatus(204));
// });

// // Student endpoint

// app.post('/quizzes/:id/submissions', (req, res) => {
//   const { name, email, answers } = req.body;

//   db.transaction(async trx => {
//     const submission = await trx('submissions')
//       .insert({ quizId: req.params.id, name, email })
//       .returning('id')
//       .then(rows => rows[0]);

//     const answerInserts = answers.map(({ questionId, choiceId }) =>
//       trx('answers').insert({ submissionId: submission, questionId, choiceId })
//     );

//     await Promise.all(answerInserts);

//     res.json({ id: submission });
//   });
// });

// // Public endpoints

// app.get('/quizzes/:id', async (req, res) => {
//   const quiz = await db('quizzes')
//     .select()
//     .where({ id: req.params.id })
//     .first();

//   if (!quiz) {
//     res.sendStatus(404);
//     return;
//   }

//   const questions = await db('questions')
//     .select()
//     .where({ quizId: quiz.id });

//   const questionIds = questions.map(q => q.id);

//   const choices = await db('choices')
//     .select()
//     .whereIn('questionId', questionIds);

//   res.json({
//     id: quiz.id,
//     title: quiz.title,
//     description: quiz.description,
//     questions: questions.map(question => ({
//       id: question.id,
//       text: question.text,
//       isMandatory: question.isMandatory,
//       choices: choices.filter(choice => choice.questionId === question.id).map(choice => ({
//         id: choice.id,
//         text: choice.text,
//         isCorrect: choice.isCorrect
//       }))
//     }))
//   });
// });

// // For undefined routes
// app.use("*", (req, res) => {
//   res.status(400).json({
//     msg: "No such route found",
//   });
// });

// app.listen(process.env.APP_PORT, () => {
//   console.log(`Listening at port ${process.env.APP_PORT}`)
// })

// // const express = require('express');
// // const cors = require('cors');
// // const helmet = require('helmet');
// // const { ValidationError } = require('express-validator');
// // const quizRouter = require('./routes/quizRouter');
// // const choiceRouter = require('./routes/choiceRouter');
// // const submissionRouter = require('./routes/submissionRouter');

// // const app = express();

// // // Set up middleware
// // app.use(express.json());
// // app.use(cors());
// // app.use(helmet());

// // // Set up routes
// // app.use('/api/quizzes', quizRouter);
// // app.use('/api/choices', choiceRouter);
// // app.use('/api/submissions', submissionRouter);

// // // Error handling middleware
// // app.use((err, req, res, next) => {
// //   if (err instanceof ValidationError) {
// //     return res.status(err.statusCode).json(err);
// //   }
// //   console.error(err);
// //   return res.status(500).json({ message: 'Internal server error' });
// // });

// // module.exports = app;

require("dotenv").config();

const express = require('express');
const HttpStatusCode = require("./constants/http-status-code");
const CustomException = require("./exceptions/custom.exception");
const app = express();
const routes = require('./routes/main.route');
const logger = require('./middleware/logger.middleware')
const { sendResponse } = require("./utils/response");
const cors = require('cors');
const helmet = require('helmet');

// Set up middleware
app.use(express.json())
app.use(logger);
app.use(cors());
app.use(helmet({
  hidePoweredBy: true
}));


// Initialize routes
app.use(routes);

// For undefined routes
app.use("*", (_, res) => {
  sendResponse(res, HttpStatusCode.BAD_REQUEST, false, null, [new CustomException('No Such route found')])
});

app.listen(process.env.APP_PORT, () => {
  console.log(`Listening at port ${process.env.APP_PORT}`)
})