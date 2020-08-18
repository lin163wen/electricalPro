<template>
  <div class="start_img">
    <div class="logo"></div>
  </div>
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
<style scoped lang="less">
  .start_img{
    background: url(../assets/start@2x.png) no-repeat center center;
    background-size: 100% 100%;
    width: 100%;
    height: 100%;
    .logo{
      background: url(../assets/logo@2x.png) no-repeat center center;
      background-size: 100% 100%;
      width: 322px;
      height: 313px;
      position: absolute;
      top:133px;
      left: 215px;
    }
  }
</style>
