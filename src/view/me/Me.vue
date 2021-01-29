<template>
  <div>
    {{totalCount}}
    {{totalPrice}}
  </div>
</template>

<script>
export default {
  name:'Me',
  computed:{
    totalPrice(){
      return this.$route.query.totalPrice
    },
    totalCount(){
      return this.$route.query.totalCount
    }
  }
}
</script>

<style>

</style>