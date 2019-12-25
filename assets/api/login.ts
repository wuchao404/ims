import axios from '../../utils/axios';
import { AxiosPromise } from 'axios'

export const loginApi = (data: {username: string, password: string}): AxiosPromise => {
    return axios({
      method:'post',
      url: '/api/doLogin',
      data: data
    })
}

export const registerApi = (data: {username: string, password: string}): AxiosPromise => {
  return axios({
    method:'post',
    url: '/api/register',
    data: data
  })
}
// 检查用户是否存在
export const checkUsernameApi = (params: {username: string}): AxiosPromise => {
  return axios({
    method:'get',
    url: '/api/register/checkUsername',
    params: params
  })
}
// 退出登陆
export const logoutApi = (): AxiosPromise => {
  return axios({
    method:'get',
    url: '/api/doLogout',
  })
}