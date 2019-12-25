import kConnection from '../knexHelper';
import {QueryBuilder, } from 'knex';

import { User } from '../../modal/user';

export const userBuilder = ():QueryBuilder => kConnection<User>('user');
