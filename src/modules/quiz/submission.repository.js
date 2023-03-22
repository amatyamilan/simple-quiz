const knex = require('../../config/database.config')

class SubmissionRepository {
    async create(submission, trx) {
      const [id] =  await (trx || knex).table('submissions').insert(submission);
      return id;
    }
  }
  
  module.exports = SubmissionRepository;