import {RequestAxios} from './index';
export function RequestDetail(iid){
  return RequestAxios({
    url:'/detail',
    params: {iid}
  })
}