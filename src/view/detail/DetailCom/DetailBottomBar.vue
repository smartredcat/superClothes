<template>
  <div class="bottomBar">
    <div class="lt">
      <div class="lt-item">
        <img src="~assets/image/detail/kf.png" alt="" />
        <span>客服</span>
      </div>
      <div class="lt-item">
        <img src="~assets/image/detail/store.png" alt="" />
        <span>店铺</span>
      </div>
      <div class="lt-item" @click="switchSave">
        <div v-if="isSave">
          <img src="~assets/image/detail/sc_ed.png" alt="" />
        </div>
        <div v-else>
          <img src="~assets/image/detail/sc.png" alt="" />
        </div>
        <span>收藏</span>
      </div>
    </div>
    <div class="rt">
      <div class="rt-item">
        <span class="add" @click="addCart">加入购物</span>
      </div>
      <div class="rt-item">
        <span class="buy">立即购买</span>
      </div>
    </div>
    <!-- 点击触发状态显示 收藏  加入购物车 -->
    <div class="status" v-if="isShow">
      <span>{{ message }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBottomBar",
  data() {
    return {
      message: "", // 状态信息
      isSave: false, //   是否收藏
      isShow: false, // 状态信息是否显示
    };
  },
  methods: {
    switchSave() {
      // 收藏商品
      this.isSave = !this.isSave;
      this.message = "已收藏 √ ";
      this.setShow();
    },
    addCart(){
      // 加入购物车商品
      this.message = "已加入 √ "
      this.setShow();
      // 发射出去
      this.$emit('addCart')
    },
    setShow() {
      // 延迟一秒消失
      this.isShow = true;
      setTimeout(() => {
        this.isShow = false;
      }, 2000);
    },
  },
};
</script>

<style scoped>
.bottomBar {
  display: flex;
}
.lt {
  flex: 1;
  width: 50%;
  display: flex;
  font-size: 12px;
  text-align: center;
}
.lt-item {
  flex: 1;
  margin-top: 10px;
}
.lt-item img {
  height: 25px;
  width: 25px;
}
.lt-item span {
  display: block;
  margin-top: -3px;
}
.rt {
  width: 50%;
  flex: 1;
  display: flex;
  text-align: center;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
}
.rt-item {
  flex: 1;
}
.add {
  background: var(--color-tint);
  display: block;
  padding: 15px;
  border-top-left-radius: 10px;
}
.buy {
  background: orange;
  display: block;
  padding: 15px;
  border-top-right-radius: 10px;
}
.status {
  height: 40px;
  width: 80px;
  text-align: center;
  font-size: 16px;
  color: var(--color-tint);
  position: fixed;
  top: 200px;
  left: 150px;
}
.status span {
  line-height: 40px;
}
</style>