import {BaseModel} from '../BaseModel'
import {modelOptions} from '../../db/sequelizeHelper'
import {DataTypes} from 'sequelize';

// 图片
export class ImageModal extends BaseModel {
  public id!:string;
  public url!:string;
  public alt!:string;
  public dirId!:string;
  public diskPath!:string;
}

ImageModal.init({
  id: {type: DataTypes.BIGINT,autoIncrement:true,allowNull: false, unique: true, primaryKey: true },
  url: {type: DataTypes.STRING,allowNull: true,defaultValue: ''},
  alt: {type: DataTypes.STRING,allowNull: true,defaultValue: ''},
  dirId: {type: DataTypes.STRING,allowNull: false},
  diskPath: {type: DataTypes.STRING, allowNull: false},

},{
  ...modelOptions,
  modelName:'imageModal',
  tableName: 'images'
})