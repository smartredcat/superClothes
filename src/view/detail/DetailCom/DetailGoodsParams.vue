<template>
  <div>
    <div class="info">
      <table class="infoTb">
        <tr><th class="tTitle">{{goodsParams.infoKey}}</th></tr>
        <tr v-for="item in goodsParams.infoSet"
          :key="item">
          <td>{{item.key + ':'}}</td>
          <td>{{item.value}}</td>
        </tr>
      </table>
    </div>
    <div class="rule">
       <table class="ruleTb">
        <tr><th>{{goodsParams.ruleKey}}</th></tr>
        <tr><th>{{goodsParams.ruleDes}}</th></tr>
        <div v-for="item in this.goodsParams.ruleTable"
          :key="item">
          <tr v-for='a in item' :key="a">
              <td v-for="b in a" :key="b">{{b}}</td>
          </tr>
        </div>
      </table>
    </div> 

  </div>
</template>

<script>
export default {
  name:"DetailGoodsParams",
  props:{
    goodsParams:{
      type:Object,
      default(){
        return {};
      }
    }
  },
  computed:{
    ruleTable(){
      let ls = this.goodsParams.ruleTable[0];
      if(this.goodsParams.ruleTable.length >= 2){
        for (const iterator of this.goodsParams.ruleTable[1]) {
            ls.push(iterator)
        }
      }
      return ls;
    }
  }
}
</script>

<style>
.info, .rule{
  padding:20px;
}
/* .tTitle{
  font-size:15px;
  flex:1;
} */
.infoTb, .ruleTb{
 text-align: center;
 border-bottom: solid 1px gray;
 border-top: solid 1px gray;
 padding:20px;
}
.infoTb tr, .ruleTb tr{
  line-height: 30px;
}
.infoTb{
   border-left: solid 1px gray;
}
.ruleTb {
   border-right: solid 1px gray;
}
.ruleTb td{
  padding-left: 25px;
}
</style>