
exports.up = function(knex) {
  return knex.schema.createTable('cars', tbl => {
      tbl.increments();

      tbl
        .string('VIN', 17)
        .unique()
        .notNullable();
        tbl.string('Make', 128).notNullable();
        tbl.string('Model', 128).notNullable();
        tbl.integer('Mileage', 6).notNullable();
        tbl.string('Transmission_Type', 128);
        tbl.string('Title_Status', 128);
      });
    };

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cars');
};
