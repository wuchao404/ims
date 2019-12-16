import axios,{AxiosRequestConfig,AxiosResponse,AxiosPromise} from 'axios';
import { getToken } from './frontend/storage'

axios.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers['token'] = getToken();
  return config;
},(err: any) => {
  return Promise.reject(err);
})
axios.interceptors.response.use((response: AxiosResponse) => {
  if (response.data.status === 40001) {
    
  }
  return response;
},(err: any) => {
  return Promise.reject(err);
})

// 封装请求
const instance =  (request: AxiosRequestConfig): AxiosPromise => {
  return axios(request)
}
export default instance;