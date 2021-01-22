<template>
  <div>
    <!-- 头部导航 -->
    <nav-bar class="home-bar"> 
      <template #center>
        超级商店
      </template>
    </nav-bar> 
    <!-- 轮播图 -->
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';
import {RequestMultiData} from 'network/HomeRequest.js'

export default {
  name:'Home',
  components:{
    NavBar
  },
  data(){
    return {
      banner:[],
      dKeyWord:[],
      keywords:[],
      recommend:[]
    }
  },
  created(){
    RequestMultiData().then(res => {
      this.banner = res.data.banner.list;
      this.dKeyWord = res.data.dKeyword.list;
      this.keywords = res.data.keywords.list;
      this.recommend = res.data.recommend.list;
    }, err =>{console.log(err)});
  },
  methods: {
  }
}
</script>

<style>
.home-bar{
  background-color:var(--color-tint);
  color:#fff;
  font-size: var(--font-size) + 2px;
}
</style>