import axios from '../../utils/axios';
import { AxiosPromise } from 'axios'

 export const homeListApi = (): AxiosPromise => {
    return axios({
      method:'get',
      url: '/api/info/list',
    })
  }