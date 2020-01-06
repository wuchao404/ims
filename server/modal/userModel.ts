import { DataTypes } from 'sequelize';
import { modelOptions } from '../db/sequelizeHelper';
import {User} from './user';
import {BaseModel} from './BaseModel';

export class UserModel extends BaseModel implements User {
  public username!: string;
  public password!: string;
  public userId!: string;
  public name!: string;
  public birthday!: string;
  public address!: string;
  public mobilePhone!: string;
}
UserModel.init({
  userId: { type: DataTypes.STRING, defaultValue:'', allowNull: false, unique: true, primaryKey: true },
  username: { type: DataTypes.STRING, defaultValue:'', allowNull: false, unique: true },
  password: { type: DataTypes.STRING, defaultValue:'', allowNull: false, unique: true },
  name: { type: DataTypes.STRING, defaultValue:'', allowNull: true, unique: true },
  birthday: { type: DataTypes.STRING, defaultValue:'', allowNull: true },
  address: { type: DataTypes.STRING, defaultValue:'', allowNull: true },
  mobilePhone: { type: DataTypes.STRING, defaultValue:'', allowNull: true },
},{
  ...modelOptions,
  modelName: 'userModel',
  tableName:'user',
});
