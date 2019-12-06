import axios,{AxiosRequestConfig,AxiosResponse,AxiosPromise} from 'axios';


axios.interceptors.request.use((config: AxiosRequestConfig) => {
  return config;
},(err: any) => {
  return Promise.reject(err);
})
axios.interceptors.response.use((response: AxiosResponse) => {
  return response;
},(err: any) => {
  return Promise.reject(err);
})

// 封装请求
export default (request: AxiosRequestConfig): AxiosPromise => {
  return axios(request)
}