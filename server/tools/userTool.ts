import { UUID } from '../tools/unique';
import MD5 from 'blueimp-md5';

// 创建用户id
export const createUserId = () => {
  return new UUID().v4();
}
/**
 * 将密码转换成md5
 * @param password 明文
 */
export const encryptMd5Pwd = (password: string): string => {
  return MD5(password);
}

/**
 * 比较明文加密后是否跟密文完全一样
 * @param decryption 明文
 * @param md5 密文
 */
export const compareMd5 = (decryption: string, md5: string) => {
  return encryptMd5Pwd(decryption) === md5;
}