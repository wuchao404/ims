import knexConfig from '../config/knex';
import knex, { QueryBuilder } from 'knex';

const instance:knex = knex(knexConfig);

export default instance;

export interface QueryHelper {
  [props: string]: <T>(t: T) => QueryBuilder;
  // addUser2DB: <T>(t: T) => QueryBuilder;
}
