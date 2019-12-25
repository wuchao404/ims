import axios,{AxiosRequestConfig,AxiosResponse,AxiosPromise} from 'axios';
import { getToken, hasToken } from './frontend/storage';
import { notification } from 'antd';
import Router from 'next/router'
import routerMap from '../router/routerMap';
import { jumpToLogin } from '../router/redirect'

axios.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers['token'] = getToken();
  return config;
},(err: any) => {
  return Promise.reject(err);
})
axios.interceptors.response.use((response: AxiosResponse) => {
  const { status, message } = response.data;
  if (status === 200) {
    return response;
  } else if (status === 40000 || status === 40001 || status === 40002) {
    notification.warn({ message: '提示', description: message, duration: 2});
    jumpToLogin();
    return Promise.reject(response.data);
  } else if (status >= 400) {
    notification.warn({ message: '提示', description: message, duration: 2});
    return Promise.reject(response.data);
  } else {
    return Promise.reject(response.data);
  }
},(err: any) => {
  return Promise.reject(err);
})

// 封装请求
const instance =  (request: AxiosRequestConfig): AxiosPromise => {
  return axios(request)
}
export default instance;