const knex = require('../../config/database.config');

class ChoiceRepository {
  async create(choice, trx) {
    const [id] = await (trx || knex)('choices').insert(choice);
    return id;
  }

  async findAllByQuestionId(questionId) {
    const choices = await knex('choices').where('question_id', questionId);
    return choices;
  }

  async findByQuestionIds(questionIds, trx) {
    const choices = await (trx || knex)('choices').whereIn('question_id', questionIds);

    return choices;
  }
}

module.exports = ChoiceRepository;