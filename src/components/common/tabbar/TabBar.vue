<template>
  <div class="tabbar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name:'TabBar'
}
</script>
<style>
.tabbar{
  position:absolute;
  left:0;
  right:0;
  bottom:0;
  display:flex;
  flex-direction:row;
  background-color: #f6f6f6;
  justify-content: space-evenly;
  box-shadow: 0 -1px 2px rgba(100, 100, 100, .8);
  width:100vw;
}
</style>