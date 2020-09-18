<template>
  <div class="mine_div">
    <!-- 'title','hasRight','back','parting','search','upload' -->
    <div>
      <div class="mine">
        <!-- 'title','hasRight','back','parting','search','upload' -->
        <div class="mine_info">
          <div class="first_name">
            <span>{{userInfo.name?userInfo.name.substr(0,1):''}}</span>
          </div>
          <div class="name_section">
            <div class="name">
              <span>{{userInfo.name}}</span>
            </div>
            <div class="section">
              <span>{{userInfo.orgName}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="others">
        系统设置
        <div class="setting" @click="goSetting()">
          <img class="setting_icon" src="../../assets/setting@2x.png" />
          <span>设置</span>
          <img class="setting_go" src="../../assets/go@2x.png" />
        </div>
        <div class="about" @click="goAbout()">
          <img class="about_icon" src="../../assets/about@2x.png" />
          <span>关于</span>
          <img class="about_go" src="../../assets/go@2x.png" />
        </div>
      </div>
    </div>
    <navigate-bar></navigate-bar>
  </div>

</template>

<script>
  import NavigateBar from '../views/navigateBar.vue'
  import MyHeader from '../views/header.vue'
  import {
    getUserInfo
  } from '../../utils/request.js'
  import {
    Toast
  } from 'vant';
  export default {
    name: 'Mine',
    components: {
      NavigateBar,
      MyHeader
    },
    data() {
      return {
        userInfo: {}
      }
    },
    created() {
      this.queryUserInfo();
    },
    mounted() {

    },
    methods: {
      goSetting() {
        this.$router.push('Setting');
      },
      goAbout() {
        this.$router.push('About');
      },
      queryUserInfo() {
        var _this = this;
        getUserInfo()
          .then(response => {
            if (response.code == 0) {
              _this.userInfo = response.data;
            } else {
              Toast(response.message);
              if (response.code == 401) {
                _this.$router.push('/')
              }
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
</script>

<style scoped lang="less">
  .mine_div {
    height: 100%;
    background-color: #FFFFFF;

    .mine {
      background: url(../../assets/mine_bg@2x.png) no-repeat center;
      background-size: 100% 100%;
      width: 100%;
      height: 244px;

      .mine_info {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding-top: 91px;
        padding-left: 29px;
        height: 80px;

        .first_name {
          width: 80px;
          height: 80px;
          background: #009C86;
          border-radius: 40px;
          display: flex;
          align-items: center;
          justify-content: center;

          span {
            font-size: 24px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #FFFFFF;
            line-height: 80px;
          }
        }

        .name_section {
          display: flex;
          flex-direction: column;
          margin-left: 20px;

          .name {
            margin-top: 14px;

            span {
              font-size: 18px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: #FFFFFF;
              line-height: 25px;
            }
          }

          .section {
            margin-top: 10px;

            span {
              font-size: 12px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #FFFFFF;
              line-height: 17px;
            }
          }
        }

      }
    }

    .others {
      padding-top: 20px;
      padding-left: 16px;
      font-size: 18px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #3F3E3E;
      line-height: 25px;
      background: #FFFFFF;

      .setting {
        height: 60px;
        width: 100%;
        display: flex;
        background-color: #FFFFFF;
        align-items: center;

        .setting_icon {
          width: 20px;
          height: 20px;
          margin-right: 19px;
        }

        .setting_go {
          width: 10px;
          height: 14px;
          margin-left: 270px;
        }

        span {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #3F3E3E;
          line-height: 60px;
        }
      }

      .about {
        height: 60px;
        width: 100%;
        display: flex;
        background-color: #FFFFFF;
        align-items: center;

        .about_icon {
          width: 20px;
          height: 20px;
          margin-right: 19px;
        }

        .about_go {
          width: 10px;
          height: 14px;
          margin-left: 270px;
        }

        span {

          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #3F3E3E;
          line-height: 60px;
        }
      }
    }
  }
</style>
