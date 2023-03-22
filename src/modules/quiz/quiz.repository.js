const knex = require('../../config/database.config')

class QuizRepository {
    async create(quiz, trx) {
      const [id] =  await (trx || knex).table('quizzes').insert(quiz);
      return id;
    }
  
    async findById(id) {
      const quiz = await knex('quizzes').where({ id }).first();
      return quiz;
    }
  
    async update(id, quiz) {
      await knex('quizzes').where({ id }).update(quiz);
    }
  }
  
  module.exports = QuizRepository;