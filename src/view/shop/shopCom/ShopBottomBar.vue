<template>
  <div class="bottom">
    <div class="left" @click="switchAll">
      <is-check-btn :isCancel="isCancel"/>
      <span>全选/取消</span>
    </div>
    <div class="center">
      <span>合计:</span>
      <span class="total">{{totalPrice}}</span>
    </div>
    <div class="right" @click="goShop">
      <span>去计算:</span>
      <span >{{totalCount}}</span>
    </div>
  </div>
</template>

<script>
import IsCheckBtn from 'components/common/checkBtn/IsCheckBtn'
export default {
  name:"ShopBottomBar",
  components:{
    IsCheckBtn,
  },
  computed:{
    totalPrice(){
      return this.$store.state.nowCartProduct.filter((item) =>{
        return item.isCancel === false;
      }).reduce((previous, next)=>{
        return next.nowPrice * next.count + previous
      }, 0).toFixed(2);
    },
    totalCount(){
      return this.$store.state.nowCartProduct.filter((item) => {
        return item.isCancel === false;
      }).length;
    },
    isCancel(){
      // 异常值处理  null 值
      if(!this.$store.state.nowCartProduct.length) return true;
      return this.$store.state.nowCartProduct.filter(item => item.isCancel === true).length 
      ? true : false;
    }
  },  
  methods:{
    switchAll(){
      // 切换全选
      this.$store.commit('switchAll');

    },
    goShop(){
      // 计算  暂时发送到me页面
      this.$router.push({
        name:"Me",
        query:{
          totalCount: this.totalCount,
          totalPrice: this.totalPrice,
        }
      })
    }
  }
}
</script>

<style scoped>
.bottom{
  display:flex;
  font-size: 14px;
  font-weight: 520;
}
.left{
  flex:1;
  display: flex;
  align-items:center;
  margin: 0 10px;
}
.left span{
  display:block;
  margin-left:5px;
}
.center{
  flex:1;  
  align-self: center;
}
.center .total{
  margin-left:5px;
}
.center .total::before{
  content:'￥'
}
.right{
  flex:1;
  align-self: center;
  background: #f00;
  height:40px;
  width:50px;
  text-align:center;
  line-height:40px;
  color:#fff;
}
</style>