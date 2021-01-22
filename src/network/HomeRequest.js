import {RequestAxios} from './index.js'

// 返回首页需要的数据
export function RequestMultiData(){
  return RequestAxios({
    url: '/home/multidata'
  })
}