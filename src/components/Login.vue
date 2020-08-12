<template>
  <div class="login">
    <div class="login_div">
        <div class="username">用户名</div>
        <input type="text" class="username_input"></input>
        <div class="password">密码</div>
        <div class="password_input"></div>
        <div class="login_tip">登录信息有误</div>
        <div class="login_btn" @click="goto()"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    goto(){
      this.$router.push('/Mission')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.login{
  background-image: url(../assets/login_bg1@3x.png);
  background-repeat: no-repeat;
  background-size: 100% auto;
  width: 100%;
  height: 100%;
  .login_div{
    position: absolute;
    padding-top: 128px;
    padding-left: 58px;
    top:444px;
    left:50px;
    width: 592px;
    height: 617px;
    background: #ffffff;
    border-radius: 30px;
    box-shadow: 0px 10px 30px 0px rgba(153,153,153,0.3);
    font-size: 24px;
    font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
    font-weight: 400;
    color: #666666;
    .username_input{
      border-width: 0;
      border-bottom: solid #807f7f 1px;
      width: 550px;
      height: 69px;
    }
    .password{
      margin-top: 116px;
    }
    .password_input{
      border-width: 0;
      border-bottom: solid #807f7f 1px;
      width: 550px;
      height: 69px;
    }
    .login_tip{
      margin-top: 73px;
      color: #a2a2a2;
      text-align: center;
      line-height: 24px;
      height: 24px;
    }
    .login_btn{
      background-image: url(../assets/login_btn@3x.png);
      width: 534px;
      height: 112px;
      margin-top: 58px;
      background-size: 100% auto;
    }
  }
}



</style>
