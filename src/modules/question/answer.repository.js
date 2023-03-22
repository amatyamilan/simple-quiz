const knex = require('../../config/database.config');

class AnswerRepository {
  async create(answer, trx) {
    const [id] = await (trx || knex)('answers').insert(answer);
    return id;
  }

  async createMany(answers, trx) {
    await (trx || knex)('answers').insert(answers);
  }
}

module.exports = AnswerRepository;