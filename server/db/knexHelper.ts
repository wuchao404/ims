import knexConfig from '../config/knex';
import knex from 'knex';

const instance:knex = knex(knexConfig);

export default instance;


