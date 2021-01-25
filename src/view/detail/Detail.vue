<template>
  <div class="detail">
    <!-- 导航 -->
    <detail-navbar />
    <!-- 轮播图 -->
    <detail-swiper :topImageList="topImage"/>
    <!-- 商品基本信息 -->
    <detail-info/>
  </div>
</template>

<script>
import { RequestDetail } from "network/DetailRequest";
import DetailNavbar from "./DetailCom/DetailNavbar";
import DetailSwiper from "./DetailCom/DetailSwiper";
import DetailInfo from './DetailCom/DetailInfo'

export default {
  name: "Detail",
  components: {
    DetailNavbar,
    DetailSwiper,
    DetailInfo,
  },
  data() {
    return {
      iid: null,
      // detailObj: {},  // 详情页数据
      topImage: null, // 轮播图图片
      detailInfo:null,
    };
  },
  created() {
    // 赋值iid
    this.iid = this.$route.query.iid;
  },
  mounted() {
    // 发送请求
    RequestDetail(this.iid).then((res) => {
      console.log(res.result);
      this.topImage = res.result.itemInfo.topImages;
    });
  },
};
</script>

<style>
</style>