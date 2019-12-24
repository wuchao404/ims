import { UUID } from '../tools/unique';

// 创建用户id
export const createUserId = () => {
  return new UUID().v4();
}