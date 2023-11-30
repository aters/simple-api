exports.up = function up(db) {
	return db.schema.createTable('posts', (table) => {
		table.string('id').notNullable().primary();
		table.string('content').notNullable();
		table.string('title').notNullable();
		table.timestamp('created_at').defaultTo(db.fn.now());
	});
}

exports.down = function down(db) {
	return db.schema.dropTableIfExists('posts');
}
