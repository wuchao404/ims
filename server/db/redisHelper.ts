import { User } from '../modal/user';
import redis, { RedisClient,  } from 'redis';
import redisConfig from '../config/redis';

const client: RedisClient = redis.createClient(redisConfig);
// client.auth(redisConfig.password!);
export default client;

export const queryByToken = (token = '',) => {
  
}

export const addToken2Redis = (token: string,user: User) => {
  user.password && delete user.password;
  client.hmset(token, {...user},(err: Error | null, reply: any) => {
    console.log('reply:',reply)
  })
}
export const deleteByToken = (token = '') => {

}