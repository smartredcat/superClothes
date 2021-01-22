import axios from 'axios'

export function IndexAxios(config){
  const instance =  axios.create({
    // 基本配置
  }),
  return instance.axios(config)
}
