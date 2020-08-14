<template>
  <div class="login">
    <div class="login_div">
      <div class="user_pwd">
        <div class="username">用户名</div>
        <input type="text" v-model="username" class="username_input"></input>
        <div class="password">密码</div>
        <!--秘文密码-->
        <div class="password_div" v-show="!showPwdInput">
          <img class="password_img" src="../assets/login_copy@3x.png" @click="showPwd()" />
          <input type="password" v-model="passwordCoven" class="password_input"></input>
        </div>
        <!--明文秘密-->
        <div class="password_div" v-show="showPwdInput">
          <img class="password_img" src="../assets/login_copy@3x.png" @click="hidenPwd()" />
          <input type="text" v-model="password" class="password_input"></input>
        </div>

      </div>
      <div class="login_tip">{{message}}</div>
      <div class="login_btn" @click="goto()"></div>
    </div>
    <div class="no_login">登陆成功后7天内免登陆</div>
  </div>
</template>

<script>
  import {
    Prelogin,Trylogin,Comfirmlogin
  } from '../utils/request.js'
  import { Toast } from 'vant';
  import {encryptByDES} from '../utils/util.js'
  export default {
    name: 'Login',
    data() {
      return {
        showPwdInput: false,
        username: '',
        password: '', //明文密码
        passwordCoven: '' ,//秘文密码
        message:'',
        comfirmLoginInterval:null,
        comfirmLoginCount:0,
        loginToast:null
      }
    },
    methods: {
      goto() {
        var _this = this;
        this.loginToast = Toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true,
        });
        Prelogin({platform:'app'}).then((response) => {
          if(response && response.code==0){//成功
              var accessId = response.data.accessId;
              var key = accessId.substr(0,24);
              var password = encryptByDES(this.password,key)
              var loginParams = {
                accessId:accessId,
                username:this.username,
                password:password
              }
              Trylogin(loginParams).then(response =>{
                if(response.code==0){
                  var loginId = response.data.loginId;
                  _this.comfirmLoginInterval = setInterval(function(){
                    if(_this.comfirmLoginCount>10){
                      clearInterval(_this.comfirmLoginInterval);
                      _this.loginToast.clear()
                    }
                    Comfirmlogin({loginId:loginId}).then(response=>{
                      if(response.code==0){
                        _this.comfirmLoginCount = 0;
                        clearInterval(_this.comfirmLoginInterval);
                        _this.loginToast.clear()
                        localStorage.setItem('token',response.data.token);
                        this.$router.push('/Mission')
                      }else{
                        _this.comfirmLoginCount++;
                      }
                    },err=>{
                      console.log(err);
                      _this.loginToast.clear()
                    })
                  },1000);
                }else{
                  this.message = response.message;
                  _this.loginToast.clear()
                }
              },err =>{
                console.log(err);
                _this.loginToast.clear()
              })
          }else{
            this.message = response.message;
            _this.loginToast.clear()
          }
        }, (err) => {
          console.log(err);
          _this.loginToast.clear()
        })
        //this.$router.push('/Mission')
      },
      showPwd() {
        this.showPwdInput = true;
        this.password = this.passwordCoven;
      },
      hidenPwd() {
        this.showPwdInput = false;
        this.passwordCoven = this.password;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .login {
    background-image: url(../assets/login_bg1@3x.png);
    background-repeat: no-repeat;
    background-size: 100% auto;
    background-color: #f0f0f0;
    width: 100%;
    height: 100%;

    .login_div {
      position: absolute;
      top: 444px;
      left: 50px;
      width: 650px;
      height: 745px;
      background: #ffffff;
      border-radius: 30px;
      box-shadow: 0px 10px 30px 0px rgba(153, 153, 153, 0.3);
      font-size: 24px;
      font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
      font-weight: 400;
      color: #666666;

      .user_pwd {
        margin-left: 58px;
        margin-top: 128px;

        .username_input {
          border-width: 0;
          border-bottom: solid #807f7f 1px;
          width: 550px;
          height: 69px;
        }

        .password {
          margin-top: 116px;
        }

        .password_div {
          width: 550px;
          height: 69px;

          .password_input {
            width: 550px;
            height: 69px;
            border-width: 0;
            border-bottom: solid #807f7f 1px;
          }

          .password_img {
            width: 34px;
            height: 24px;
            position: absolute;
            right: 0;
            margin-right: 63px;
            margin-top: 29px;
          }
        }

      }

      .login_tip {
        margin-top: 73px;
        color: #a2a2a2;
        text-align: center;
        line-height: 24px;
        height: 24px;
      }

      .login_btn {
        background-image: url(../assets/login_btn@3x.png);
        width: 534px;
        height: 112px;
        margin-top: 58px;
        margin-left: 58px;
        background-size: 100% auto;
      }
    }

    .no_login {
      font-size: 24px;
      font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
      font-weight: 400;
      text-align: center;
      color: #a2a2a2;
      line-height: 24px;
      position: absolute;
      bottom: 36px;
      left: 50%;
      margin-left: -127px;
    }
  }
</style>
