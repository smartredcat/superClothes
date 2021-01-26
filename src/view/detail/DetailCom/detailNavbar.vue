<template>
  <div class="detail-navbar">
    <nav-bar>
      <!-- 左侧 -->
      <template #left>
          <img src="~assets/image/common/back.svg" alt="" @click="backTo"> 
      </template>
      <!-- 中间 -->
      <template #center>
          <tab-control :title="detailTitle"/>
          <!-- @tabClick="tabClick"  -->
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/context/TabControl";
export default {
  name: "DetailNavbar",
  components: {
    NavBar,
    TabControl,
  },
  data() {
    return {
      detailTitle: [
        { id: 1, name: "商品" },
        { id: 2, name: "参数" },
        { id: 3, name: "评论" },
        { id: 4, name: "推荐" },
      ],
    };
  },
  methods: {
    // tabClick(item) {
    //   // 状态栏的事件 具体显示哪个文字
    //   const index = item[0];
    //   console.log(index);
    // },
    backTo(){
      // 返回之前页面      
      this.$router.back();
    },
  },
};
</script>

<style scoped>
.detail-navbar{
  font-size: 13px;
}
.detail-navbar img{
  margin: 12px 0  0 12px;;
}
</style>