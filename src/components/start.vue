<template>
  <div>启动图</div>
</template>

<script>
  export default{
    name:'Start',
    data(){
      return{
        
      }
    },
    created() {
      var _this = this;
      setTimeout(function(){
        _this.$router.push('/Login');
      },2000)
    }
  }
</script>

<style>
</style>
