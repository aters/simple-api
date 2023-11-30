import knex from 'knex';
const config = require('./knexfile');

export function getDB(): knex.Knex {
	return knex(config);
}
