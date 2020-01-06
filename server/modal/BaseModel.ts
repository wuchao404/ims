import { Model } from 'sequelize'
import { formatDateTime } from '../tools/format'

export interface BaseTime {
  createTime?: string;
  updateTime?: string;
}

 // Model基类
export class BaseModel extends Model implements BaseTime {
  createTime?: string = '';
  updateTime?: string = '';
  // 格式化-创建时间
  get createTimeFormat(): string {
    return formatDateTime(this.getDataValue('createTime')!);
  }
  // 格式化-更新时间
  get updateTimeFormat(): string {
    return formatDateTime(this.getDataValue('updateTime')!);
  }
}
