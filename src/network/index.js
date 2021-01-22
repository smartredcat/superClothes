import axios from 'axios'

export function RequestAxios(config){
  const instance =  axios.create({
    // 基本配置
    baseURL:'http://123.207.32.32:8000',
    timeout:5000
  })

  // 请求拦截器
  instance.interceptors.request.use(config =>{
    return config
  }, err => {console.log(err)})

  // 响应拦截器
  instance.interceptors.response.use(res =>{
    return res.data
  }, err => {console.log(err)})

  // 返回一个 Promise对象 如axiso(config)
  return instance(config)
}
