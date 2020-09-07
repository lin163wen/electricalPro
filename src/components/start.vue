<template>
  <div class="start_page">
    <div class="logo">
      <img src="../assets/start@2x.png" />
    </div>
    <div class="official">
      享受最便捷的办公
    </div>
    <div class="try">
      点击一下，立即体验
    </div>
    <div class="btn" @click="start()"></div>
    <div class="service">
      登陆注册即代表同意《服务条款》
    </div>
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
    },
    methods:{
      start(){
        this.$router.push('Login')
      }
    }
  }
</script>
<style scoped lang="less">
  .start_page div{
      left: 0;
      bottom: 0;
      right: 0;
      margin: 0 auto;
      position: absolute;
      text-align: center;
      width: 100%;
  }
  .start_page{
    background: #F4F7FF;
    width: 100%;
    height: 100%;
    position: relative;
    overflow-y: auto;
    .logo{
      width: 350px;
      height: 360px;
      top: 44px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .official{
      
      height: 28px;
      font-size: 20px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #484747;
      line-height: 28px;
      top:438px;
      
    }
    .try{
      height: 21px;
      font-size: 15px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #939393;
      line-height: 21px;
      top: 477px;
    }
    .btn{
      width: 344px;
      height: 50px;
      background: url(../assets/start_btn@2x.png);
      background-size: 100% 100%;
      top:583px;
    }
    .service{
      height: 17px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #4783FE;
      line-height: 17px;
      top: 679px;
      bottom: 69px;
    }
  }
</style>
