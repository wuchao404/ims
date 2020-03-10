
import axios from '../../utils/axios';
import { AxiosPromise } from 'axios';

// 删除图片
export const deleteApi = (data: {id: string}): AxiosPromise => {
  return axios({
    method:'get',
    url: '/api/upload/delete',
    params: data
  })
}