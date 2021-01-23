<template>
  <div id="home">
    <!-- 头部导航 -->
    <nav-bar class="home-bar">
      <template #center> 超级商店 </template>
    </nav-bar>

    <!-- 轮播图 成功了但是暂时看不懂 -->
    <home-slider :bannerList="banner"></home-slider>

    <!-- 推荐 -->
    <home-recommend :recommend="recommend"></home-recommend>
    <!-- 受欢迎的 -->
    <home-popular />
    <tab-control :title="homeTitle" class="isFixed" />
    <div>
      <div>ww</div>
      <div>ww</div>
      <div>ww</div>
      <div>ww</div>
      <div>ww</div>
      <div>ww</div>
      <div>ww</div>
      <div>ww</div>
      <div>ww</div>
      <div>ww</div>
      <div>ww</div>
      <div>ww</div>
      <div>ww</div>
    </div>
  </div>
</template>

<script>
import { RequestMultiData, RequestGoodsData} from "network/HomeRequest.js";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/context/TabControl";

import HomeSlider from './HomeCom/HomeSlider'
import HomeRecommend from "./HomeCom/HomeRecommend";
import HomePopular from "./HomeCom/HomePopular";
export default {
  name: "Home",
  components: {
    NavBar,
    TabControl,
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
    }
  },
  created() {
    RequestMultiData().then(
      (res) => {
        this.banner = res.data.banner.list;
        this.recommend = res.data.recommend.list;
      },
    );
    RequestGoodsData('pop', 1).then(()=>{
      console.log('..')
    })
  },
  methods: {},
};
</script>

<style>
#home {
  padding-top: 44px;
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
.isFixed {
  /* 当滚动44px  定位就变成fixed */
  position: sticky;
  top: 44px;
}
</style>