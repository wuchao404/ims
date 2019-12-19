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