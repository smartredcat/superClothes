<template>
  <div>
    <router-view></router-view>
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
