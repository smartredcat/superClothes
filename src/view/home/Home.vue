<template>
  <div id="home">
    <!-- 头部导航 -->
    <nav-bar class="home-bar">
      <template #center> 超级商店 </template>
    </nav-bar>
    <!-- 封装好的滚动scroll -->
    <better-scroll class="wrapper" ref="wrapper" 
    :probe-type="3" :pull-down-refresh="true" :pull-upLoad="true"
     @scrollContent="scrollContent" @pullingDown="pullingDown" @pullingUp="pullingUp">
      <!-- 轮播图 成功了但是暂时看不懂 -->
      <!-- https://c.runoob.com/codedemo/3391 3D实例 -->
      <home-slider :bannerList="banner"></home-slider>

      <!-- 推荐 -->
      <home-recommend :recommend="recommend"></home-recommend>
      <!-- 受欢迎的 -->
      <home-popular />
      <tab-control :title="homeTitle" class="isFixed" @tabClick="tabClick" />
      <!-- 商品列表 -->
      <goods :goodsType="returnList"/>
    </better-scroll>
    <!-- 返回顶部 -->
    <back-to  @click="backTop" v-show="isShowBackTo"/>
  </div>
</template>

<script>
import { RequestMultiData, RequestGoodsData } from "network/HomeRequest.js";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/context/TabControl";
import BetterScroll from "components/common/scroll/BetterScroll";
import Goods from "components/context/goods/Goods";
import BackTo from 'components/context/backTo/BackTo'

import HomeSlider from "./HomeCom/HomeSlider";
import HomeRecommend from "./HomeCom/HomeRecommend";
import HomePopular from "./HomeCom/HomePopular";
export default {
  name: "Home",
  components: {
    NavBar,
    TabControl,
    Goods,
    BackTo,
    BetterScroll,
    HomeSlider,
    HomeRecommend,
    HomePopular,
  },
  data() {
    return {
      banner: [],
      recommend: [],
      homeTitle: [
        { id: 1, name: "流行" },
        { id: 2, name: "新款" },
        { id: 3, name: "精选" },
      ],
      goodsList: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }, //精选
      },
      returnList: null,
      currentType:'pop',  // 当前的分类
      isShowBackTo:false
    };
  },
  created() {
    // 请求多个数据
    this.RequestMultiData();
    // 请求商品数据
    this.RequestGoodsData("pop");
    this.RequestGoodsData("new");
    this.RequestGoodsData("sell");
  },
  methods: {
    // 网络请求方法
    RequestMultiData() {
      RequestMultiData().then((res) => {
        this.banner = res.data.banner.list;
        this.recommend = res.data.recommend.list;
      });
    },
    RequestGoodsData(type) {
      // 动态的增加page
      let page = this.goodsList[type].page + 1;
      RequestGoodsData(type, page).then((res) => {
        // 使用 ... 将可迭代对象 添加到数组中
        this.goodsList[type].list.push(...res.data.list);
        this.goodsList[type].page += 1;
      });
      // 初始列表
      this.returnList = this.goodsList["pop"].list;
    },
    // 事件监听方法
    tabClick(item) {
      const index = item[0];
      switch (index) {
        case 1:
          this.returnList = this.goodsList["pop"].list;
          this.currentType = 'pop';
          break;
        case 2:
          this.returnList = this.goodsList["new"].list;
          this.currentType = 'new';
          break;
        case 3:
          this.returnList = this.goodsList["sell"].list;
          this.currentType = 'sell';
          break;
      }
    },
    backTop(){
      //  返回顶部
      this.$refs.wrapper.scrollTo(0, 0)
    },
    // 监听滚动方位
    scrollContent(position){
      this.isShowBackTo = (-position.y) > 1000 
    },
    // 监听下拉刷新
    pullingDown(){
      console.log('下拉刷新')
      this.RequestGoodsData(this.currentType)
      this.$refs.wrapper.refresh()
    },
    // 监听上拉刷新
    pullingUp(){
      console.log('上拉刷新')
      RequestGoodsData(this.currentType, 1).then((res) => {
        // 使用 ... 将可迭代对象 添加到数组中
        this.goodsList[this.currentType].list.unshift(...res.data.list);
        this.goodsList[this.currentType].page += 1;
      });
      this.$refs.wrapper.refresh()
    }
  },
  mounted() {
    // 间隔一段事件 重新计算滚动高度  
    setTimeout(()=> {
      this.$refs.wrapper.refresh()
    }, 800)
  }
};
</script>

<style scoped>
#home {
  padding-top: 44px;
  height: 100vh;
  position: relative;
}
.home-bar {
  background-color: var(--color-tint);
  color: #fff;
  font-size: var(--font-size) + 2px;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
  /* 当滚动44px  定位就变成fixed  在原生js有效 但是用了插件 失效*/
.isFixed {
  position: sticky;
  top: 44px;
  z-index: 9;
}
/* 可滚动的高度 */
.wrapper {
  background: #fff;
  overflow-y: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>