exports.up = async function(knex) {
    await knex.schema.createTable('quizzes', (table) => {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.text('description').notNullable();
      table.boolean('is_published').defaultTo(false);
      table.timestamps(true, true);
    });
  
    await knex.schema.createTable('questions', (table) => {
      table.increments('id').primary();
      table.integer('quiz_id').unsigned().notNullable().references('id').inTable('quizzes').onDelete('cascade');
      table.text('text').notNullable();
      table.boolean('is_mandatory').notNullable().defaultTo(false);
      table.timestamps(true, true);
    });
  
    await knex.schema.createTable('choices', (table) => {
      table.increments('id').primary();
      table.integer('question_id').unsigned().notNullable().references('id').inTable('questions').onDelete('cascade');
      table.text('text').notNullable();
      table.boolean('is_correct').notNullable().defaultTo(false);
      table.timestamps(true, true);
    });
  
    await knex.schema.createTable('submissions', (table) => {
      table.increments('id').primary();
      table.integer('quiz_id').unsigned().notNullable().references('id').inTable('quizzes').onDelete('cascade');
      table.timestamps(true, true);
    });
  
    await knex.schema.createTable('answers', (table) => {
      table.increments('id').primary();
      table.integer('submission_id').unsigned().notNullable().references('id').inTable('submissions').onDelete('cascade');
      table.integer('question_id').unsigned().notNullable().references('id').inTable('questions').onDelete('cascade');
      table.integer('choice_id').unsigned().notNullable().references('id').inTable('choices').onDelete('cascade');
      table.timestamps(true, true);
    });
  };
  
  exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('answers');
    await knex.schema.dropTableIfExists('submissions');
    await knex.schema.dropTableIfExists('choices');
    await knex.schema.dropTableIfExists('questions');
    await knex.schema.dropTableIfExists('quizzes');
  };
  