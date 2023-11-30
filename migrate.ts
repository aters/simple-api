const knex = require('knex');
const config = require('./knexfile');

const dbConfig = config;
const db = knex(dbConfig);

// Function to run migrations
const runMigrations = async () => {
	try {
		console.log('Running migrations...');
		await db.migrate.latest();
		console.log('Migrations completed successfully');
	} catch (error) {
		console.error('Failed to complete migrations:', error);
	} finally {
		// Destroy the Knex instance to close database connection
		db.destroy();
	}
};

runMigrations();
