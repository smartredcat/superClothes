<template>
  <div class="wrapper">
    <div class="content">
      <ul>
        <li>我是内容1</li>
        <li>我是内容2</li>
        <li>我是内容3</li>
        <li>我是内容4</li>
        <li>我是内容5</li>
        <li>我是内容6</li>
        <li>我是内容7</li>
        <li>我是内容8</li>
        <li>我是内容9</li>
        <li>我是内容10</li>
        <li>我是内容1</li>
        <li>我是内容2</li>
        <li>我是内容3</li>
        <li>我是内容4</li>
        <li>我是内容5</li>
        <li>我是内容6</li>
        <li>我是内容7</li>
        <li>我是内容8</li>
        <li>我是内容9</li>
        <li>我是内容10</li>
      </ul>
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