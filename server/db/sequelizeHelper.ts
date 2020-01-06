import { Sequelize,InitOptions } from 'sequelize';
import config from '../config/sequelize';

const sequelize:Sequelize = new Sequelize(config.database!, config.username!, config.password, config)
// sequelize实例
export default sequelize;

// Model全局配置，需要个性化配置需要在init方法中实现
export const modelOptions:InitOptions = {
  sequelize,
  underscored: true,// 驼峰转下划线
  createdAt: 'createTime', // 创建时间
  updatedAt: 'updateTime', // 修改时间
  deletedAt: false,
  timestamps: true
}