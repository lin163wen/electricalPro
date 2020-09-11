<template>
  <div class="login">
  	<div class="login_bg">
  		<img src="../assets/login_bg@2x.png" />
  	</div>
    <div class="logo">
      <img src="../assets/logo@2x.png" />
    </div>
    <div class="login_text">
      登陆后更精彩
    </div>
    <div class="username_div">
      账号
      <input type="text" v-model="username" class="username_input" placeholder="请输入您的账号"></input>
    </div>
    <div class="password_div" v-show="!showPwdInput">
      密码
      <input type="password" v-model="passwordCoven" class="password_input" placeholder="请输入您的密码"></input>
      <img class="password_img" src="../assets/pwd_hide@2x.png" @click="showPwd()" />
    </div>
    <div class="password_div" v-show="showPwdInput">
      密码
      <input type="text" v-model="password" class="password_input" placeholder="请输入您的密码"></input>
      <img class="password_img" src="../assets/pwd_show@2x.png" @click="hidenPwd()" />
    </div>
    <div class="login_tip">
      {{message}}
    </div>
    <div class="login_btn" @click="goto()">
      登陆
    </div>
    <div class="no_login">登陆成功后7天内免登陆</div>
  </div>
</template>

<script>
  import {
    Prelogin,
    Trylogin,
    Comfirmlogin,
    Test,
    Test2
  } from '../utils/request.js'
  import {
    Toast
  } from 'vant';
  import {
    encryptByDES
  } from '../utils/util.js'
  export default {
    name: 'Login',
    data() {
      return {
        showPwdInput: false,
        username: '',
        password: '', //明文密码
        passwordCoven: '', //秘文密码
        message: '',
        confirmMessage: '',
        comfirmLoginInterval: null,
        comfirmLoginCount: 0,
        loginToast: null
      }
    },
    created() {
    },
    methods: {
      goto() {
        var _this = this;
        this.loginToast = Toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true,
        });
        Prelogin({
          platform: 'app'
        }).then((response) => {
          if (response && response.code == 0) { //成功
            var accessId = response.data.accessId;
            var key = accessId.substr(0, 24);
            var password = encryptByDES(this.password, key)
            var loginParams = {
              accessId: accessId,
              username: this.username,
              password: password
            }
            Trylogin(loginParams).then(response => {
              if (response.code == 0) {
                var loginId = response.data.loginId;
                _this.comfirmLoginInterval = setInterval(function() {
                  if (_this.comfirmLoginCount > 10) {
                    _this.message = _this.confirmMessage;
                    _this.comfirmLoginCount = 0;
                    clearInterval(_this.comfirmLoginInterval);
                    _this.loginToast.clear()

                  }
                  Comfirmlogin({
                    loginId: loginId
                  }).then(response => {
                    _this.confirmMessage = response.message;
                    if (response.code == 0) {
                      _this.comfirmLoginCount = 0;
                      clearInterval(_this.comfirmLoginInterval);
                      _this.loginToast.clear()
                      localStorage.setItem('token', response.data.token);
                      _this.$router.push('/Mission')
                    } else {
                      _this.comfirmLoginCount++;
                    }
                  }, err => {
                    console.log(err);
                    _this.loginToast.clear()
                  })
                }, 1000);
              } else {
                this.message = response.message;
                _this.loginToast.clear()
              }
            }, err => {
              console.log(err);
              _this.loginToast.clear()
            })
          } else {
            this.message = response.message;
            _this.loginToast.clear()
          }
        }, (err) => {
          console.log(err);
          _this.loginToast.clear()
        })
        //this.$router.push('/Setting')
      },
      showPwd() {
        this.showPwdInput = true;
        this.password = this.passwordCoven;
      },
      hidenPwd() {
        this.showPwdInput = false;
        this.passwordCoven = this.password;
      },
      test2() {
        Test2({
          phone: '18859147151',
          verifycode: '0000',
          new_password: '123456'
        }).then(response => {
          console.log(response);
        }).catch(err => {
          console.log(err);
        })
      },
      test() {
        console.log('start');
        Test({}).then(response => {
          console.log(response);
        }).catch(err => {
          console.log(err);
        })
        /* this.ajaxGet('https://health.motree.cn/api/user/servertime',data =>{
          console.log(data);
        }) */
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .login {
    background-color: #FFFFFF;
    width: 100%;
    height: 100%;
    position: relative;
    overflow-y: auto;
    overflow-x: hidden;
    div {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      margin: 0 auto;
    }
	.login_bg{
		width: 100%;
		height: 258px;
		top: 0;
		left: 0;
		img{
			width: 100%;
			height: 100%;
		}
	}
    .logo {
      width: 104px;
      height: 102px;
      top: 56px;

      img {
        width: 100%;
      }
    }

    .login_text {
      top: 288px;
      width: 144px;
      height: 33px;
      font-size: 24px;
      font-family: PingFangSC-Medium, PingFang SC;
      color: #2E2D2D;
      line-height: 33px;
      width: 100%;
      left: 16px;
    }

    .username_div {
      width: 344px;
      height: 57px;
      background: #F0F0F0;
      border-radius: 29px;
      top: 356px;
      padding-left: 30px;
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      color: #2E2D2D;
      line-height: 57px;
      .username_input{
        margin-left: 50px;
        border: none;
        background: #F0F0F0;
        width: 45%;
        max-width: 45%;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #BABABA;
        line-height: 20px;
      }
    }

    .password_div {
      width: 344px;
      height: 57px;
      background: #F0F0F0;
      border-radius: 29px;
      top: 443px;
      padding-left: 30px;
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      color: #2E2D2D;
      line-height: 57px;
      img{
        width: 22px;
        margin-left: 30px;
        transform: translateY(3px);
      }
      .password_input{
        margin-left: 50px;
        border: none;
        background: #F0F0F0;

        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #BABABA;
        line-height: 20px;
        width: 45%;
        max-width: 45%;
      }
    }
    .login_tip{
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #E81616;
      line-height: 20px;
      top: 510px;
      left:42px;

    }

    .login_btn {
      width: 344px;
      height: 50px;
      background: #009C86;
      border-radius: 10px;
      top: 580px;
      line-height: 50px;
      text-align: center;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #FFFFFF;
    }

    .no_login {
      width: 100%;
      text-align: center;
      height: 17px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #2E2D2D;
      line-height: 17px;
      top: 676px;
      padding-bottom: 75px;
    }
  }
</style>
