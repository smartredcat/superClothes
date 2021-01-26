<template>
  <div class="detail">
    <!-- 导航 -->
    <detail-navbar class="navbar" />
    <better-scroll
      class="wrapper"
      ref="detailS"
      :probe-type="3"
      @scrollContent="scrollContent"
    >
      <!-- 轮播图 -->
      <detail-swiper :topImageList="topImage" />
      <!-- 商品基本信息 -->
      <detail-info :detailInfo="detailInfo" />
      <!-- 店铺信息 -->
      <detail-shop :shopInfo="shopInfo" />
      <!-- 商品信息更多 -->
      <detail-goods-info :goodsInfos="goodsInfos" @imgLoad="imgLoad" />
      <!-- 商品参数信息 -->
      <detail-goods-params :goodsParams="goodsParams"  ref="param"/>
      <!-- 商品评论 -->
      <detail-common :goodsRate="goodsRate"  ref="rate"/>
      <!-- 推荐商品 -->
      <goods :goodsType="goodsList" ref="pushgoods"/>
    </better-scroll>
      <!-- 返回顶部 -->
    <back-to @click="backTop" v-show="isShowBackTo" />
  </div>
</template>

<script>
import { RequestDetail } from "network/DetailRequest";
import { RequestGoodsData } from "network/HomeRequest.js";

import { unShake } from "common/utils";

import DetailNavbar from "./DetailCom/DetailNavbar";
import DetailSwiper from "./DetailCom/DetailSwiper";
import DetailInfo from "./DetailCom/DetailInfo";
import DetailShop from "./DetailCom/DetailShop";
import DetailGoodsInfo from "./DetailCom/DetailGoodsInfo";
import DetailGoodsParams from "./DetailCom/DetailGoodsParams";
import DetailCommon from "./DetailCom/DetailCommon";

import BetterScroll from "components/common/scroll/BetterScroll";
import Goods from "components/context/goods/Goods";
import BackTo from "components/context/backTo/BackTo";

export default {
  name: "Detail",
  components: {
    DetailNavbar,
    DetailSwiper,
    DetailInfo,
    DetailShop,
    Goods,
    BackTo,
    BetterScroll,
    DetailGoodsInfo,
    DetailGoodsParams,
    DetailCommon,
  },
  data() {
    return {
      iid: 0,
      // detailObj: {},  // 详情页数据
      topImage: [], // 轮播图图片
      detailInfo: {}, // 不然会包裹其他的
      shopInfo: {}, // 商家信息
      goodsList: [], // 推荐商品
      goodsInfos: {}, // 商品信息
      goodsParams: {}, // 商品参数
      goodsRate: [], // 商品评论
      isShowBackTo:false, // 是否显示返回
      paramTop:0, // 参数高度
      rateTop:0, // 评论高度
      pushTop:0, // 推荐商品高度
      currentIndex:1 // 当前状态
    };
  },
  created() {
    // 赋值iid
    this.iid = this.$route.query.iid;
    // 发送请求
    RequestDetail(this.iid).then((res) => {
      // console.log(res.result);
      this.topImage = res.result.itemInfo.topImages;
      this.detailInfo = {
        deTitle: res.result.itemInfo.title,
        lowNowPrice: res.result.itemInfo.lowNowPrice,
        lowPrice: res.result.itemInfo.lowPrice,
        discountDesc: res.result.itemInfo.discountDesc,
        columns: res.result.columns,
        sentTime: "72小时发货",
      };
      this.shopInfo = {
        logo: res.result.shopInfo.shopLogo,
        name: res.result.shopInfo.name,
        fans: res.result.shopInfo.cFans,
        goods: res.result.shopInfo.cGoods,
        score: res.result.shopInfo.score,
        url: res.result.shopInfo.shopUrl,
      };
      this.goodsInfos = {
        desc: res.result.detailInfo.desc,
        kes: res.result.detailInfo.detailImage[0].key,
        list: res.result.detailInfo.detailImage[0].list,
      };
      this.goodsParams = {
        infoKey: res.result.itemParams.info.key,
        infoSet: res.result.itemParams.info.set,
        ruleKey: res.result.itemParams.rule.key,
        ruleTable: res.result.itemParams.rule.tables,
        ruleDes: res.result.itemParams.rule.disclaimer,
      };
      this.goodsRate = res.result.rate.list;
    });
    // 请求推荐商品
    this.RequestGoodsData("new");
    this.RequestGoodsData("sell");
    this.RequestGoodsData("pop");
  },
  mounted() {
    // 推荐商品加载完成 重新计算高度
    const refresh = unShake(this.$refs.detailS.refresh, 200);
    this.$bus.$on("imgLoad", () => {
      refresh();
      // 当推荐商品加载完成 获取各位位置的高度
      this.paramTop = this.$refs.param.$el.offsetTop;
      this.rateTop = this.$refs.rate.$el.offsetTop;
      this.pushTop = this.$refs.pushgoods.$el.offsetTop;
    });
  },
  methods: {
    // 请求商品封装
    RequestGoodsData(type) {
      RequestGoodsData(type, 1).then((res) => {
        this.goodsList.push(...res.data.list);
      });
    },
    // 图片加载完成 重新计算高度
    imgLoad() {
      this.$refs.detailS.refresh();
    },
    // 监听滚动高度
    scrollContent(position){
      const y = -position.y
      // 显示返回顶部的图标
      this.isShowBackTo = y > 1400
      // 监听滚动更改状态栏
      if(y > this.paramTop){
        this.currentIndex = 2
      }else if (y > this.rateTop){
        this.currentIndex = 3
      }else if (y > this.pushTop){
        this.currentIndex = 4
      }else {
        this.currentIndex = 1
      }
      console.log(this.currentIndex)
    },
    // 返回顶部
    backTop(){
      this.$refs.detailS.scroll.scrollTo(0, 0, 800);
    }
  },
};
</script>

<style>
.detail {
  position: relative;
  z-index: 9;
  background: #fff;
  height: 100vh;
}
.navbar {
  position: relative;
  z-index: 9;
  background: #fff;
}
.wrapper {
  overflow: hidden;
  height: calc(100% - 44px);
}
</style>