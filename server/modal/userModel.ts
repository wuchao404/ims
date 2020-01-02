import {Model, DataTypes} from 'sequelize';
import sequelize from '../db/sequelizeHelper';
import {User} from './user';
import {BaseTime} from './BaseModel'

export class UserModel extends Model implements User,BaseTime {
  public username!: string;
  public password!: string;
  public userId!: string;
  public name!: string;
  public birthday!: string;
  public address!: string;
  public mobilePhone!: string;
  public createTime?: string;
  public UpdateTime?: string;
  
}
UserModel.init({
  userId: { type: DataTypes.STRING, defaultValue:'', allowNull: false, unique: true, primaryKey: true },
  username: { type: DataTypes.STRING, defaultValue:'', allowNull: false, unique: true },
  password: { type: DataTypes.STRING, defaultValue:'', allowNull: false, unique: true },
  name: { type: DataTypes.STRING, defaultValue:'', allowNull: true, unique: true },
  birthday: { type: DataTypes.STRING, defaultValue:'', allowNull: true },
  address: { type: DataTypes.STRING, defaultValue:'', allowNull: true },
  mobilePhone: { type: DataTypes.STRING, defaultValue:'', allowNull: true },
  createTime: { type: DataTypes.DATE, defaultValue:'', allowNull: true },
  UpdateTime: { type: DataTypes.DATE, defaultValue:'', allowNull: true },
},{
  sequelize,
  modelName: 'userModel',
  tableName:'user',
  underscored: true,
  createdAt: false,
  updatedAt: false,
  deletedAt: false,
});
