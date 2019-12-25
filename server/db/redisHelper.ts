import { User } from '../modal/user';
import redis, { RedisClient,  } from 'redis';
import redisConfig from '../config/redis';

const client: RedisClient = redis.createClient(redisConfig);
// client.auth(redisConfig.password!);
export default client;

// 此token是否在redis中
export const existTokenInRedis = (token: string): boolean => {
  return client.exists(token);
}
// 向redis中添加token
export const addToken2Redis = (token: string,user: User) => {
  user.password && delete user.password;
  client.hmset(token, {...user},(err: Error | null, reply: any) => {
    console.log('reply:',reply)
  })
}
/**
 * 删除redis中的token
 * @param token 
 * @return boolean 是否删除成功
 */
export const deleteByToken = (token = ''): boolean => {
  return client.del(token);
}