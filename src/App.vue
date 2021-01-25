<template>
  <div>
    <!-- 有点难理解 -->
    <router-view v-slot="{ Component }">
    <!-- 缓存页面 -->
    <keep-alive :include="$store.state.keepLiveRoute">
      <component :is="Component" />
    </keep-alive>
  </router-view>


    <!-- <router-view></router-view> -->
    <tab-bar-context/>
  </div>
</template>
<script>
import TabBarContext from 'components/context/TabBarContext.vue'; // 底部的导航
export default {
  name: "App",
  components: {
    TabBarContext
  }
};
</script>
<style>
  @import 'assets/css/base';
</style>