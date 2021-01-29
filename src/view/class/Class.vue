<template>
  <div class="wrapper">
    <div class="content">
    </div>
  </div>
</template>

<script>
// 滑动插件
import BScroll from '@better-scroll/core'

export default {
  name: "Class",
  mounted() {
    new BScroll(".wrapper", {
      movable: true,
      zoom: true,
    });
  },
};
</script>

<style>
.wrapper{
  height: 200px;
  overflow: hidden;
  }
</style>