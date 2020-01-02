import { Sequelize } from 'sequelize';
import config from '../config/sequelize';

const sequelize:Sequelize = new Sequelize(config.database!, config.username!, config.password, config)

export default sequelize;