<template>
  <div class="detail">
    <!-- 导航 -->
    <detail-navbar/>   
  </div>
</template>

<script>
import { RequestDetail } from 'network/DetailRequest'
import DetailNavbar from './DetailCom/detailNavbar'
export default {
  name:'Detail',
  components:{
    DetailNavbar,
  },
  data(){
    return {
      iid:null,
      detailObj: {}
    }
  },
  created(){
    // 赋值iid
    this.iid = this.$route.query.iid
    // 发送请求
    RequestDetail(this.iid).then(res=>{
      this.detailObj = res.result
    })
  }
}
</script>

<style>

</style>