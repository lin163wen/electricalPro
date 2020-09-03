<template>
  <div>
    <div class="connector">
      <!-- 'title','hasRight','back','parting','search','upload' -->
      <div class="header">
        <img src="../../assets/back@2x.png" class="back" @click="goBack()" />
      </div>
      <div class="connector_info">
        <div class="connector_first_name">
          <span>{{firstName}}</span>
        </div>
        <div class="connector_name">
          <span>{{userInfo.name}}</span>
        </div>
        <div class="connector_info_details">
          <span>{{userInfo.orgName}}</span>
        </div>
      </div>
    </div>
    <div class="partment">
      部门
      <div class="partment_text">{{userInfo.orgName}}</div>
    </div>
    <div class="phone">
      联系方式
      <div class="phone_text">{{userInfo.phone}}</div>
    </div>
    <div class="call_div">
      <div class="call_btn" @click="call()">拨打电话</div>
    </div>
  </div>

</template>

<script>
  import NavigateBar from '../views/navigateBar.vue'
  import MyHeader from '../views/header.vue'
  export default {
    name: 'ConnectDetails',
    components: {
      MyHeader
    },
    data() {
      return {
        userInfo: null,
      }
    },
    created() {
      console.log(this.$route.params.user)
      this.userInfo = this.$route.params.user;
    },
    computed: {
      firstName: function() {
        var userName = this.userInfo.name;
        return userName.substr(0, 1);
      }
    },
    methods: {
      goBack() {
        this.$router.push('ConnectAll');
      },
      call() {
        //localStorage.setItem('lastestConnector','')
        //设置最近联系人
        var lastestConnector = localStorage.getItem('lastestConnector');

        if (!lastestConnector) {
          console.log(11111);
          lastestConnector = new Array();
        } else {
          lastestConnector = JSON.parse(lastestConnector)
        }
        console.log(lastestConnector)
        console.log(typeof lastestConnector)
        lastestConnector.push(this.userInfo);
        localStorage.setItem('lastestConnector', JSON.stringify(lastestConnector))
        this.$router.push({
          name: 'Calling',
          params: {
            userInfo: this.userInfo
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .connector {
    height: 304px;
    width: 100%;
    background: linear-gradient(225deg, #407CFE 0%, #6EAFFF 100%);

    .header {
      height: 44px;
      display: flex;
      align-items: center;

      img {
        height: 15px;
        width: 18px;
        margin-left: 18px;
      }
    }

    .connector_info {
      margin-top: 44px;
      display: flex;
      flex-direction: column;
      align-items: center;

      .connector_first_name {
        width: 80px;
        height: 80px;
        background: #4783FE;
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

      .connector_name {
        margin-top: 20px;

        span {
          font-size: 25px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #FFFFFF;
          line-height: 36px;
        }
      }

      .connector_info_details {
        margin-top: 10px;
        display: flex;

        span {
          font-size: 14px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #FFFFFF;
          line-height: 20px;
        }
      }

    }
  }

  .partment {
    height: 70px;
    width: 100%;
    background: #FFFFFF;
    padding-left: 16px;
    padding-top: 10px;
    font-size: 13px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #939393;
    line-height: 18px;

    .partment_text {
      margin-top: 10px;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #3F3E3E;
      line-height: 22px;
    }
  }

  .phone {
    height: 70px;
    width: 100%;
    background: #FFFFFF;
    padding-left: 16px;
    padding-top: 10px;
    font-size: 13px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #939393;
    line-height: 18px;

    .phone_text {
      margin-top: 10px;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #3F3E3E;
      line-height: 22px;
    }
  }

  .call_div {
    width: 100%;
    margin-top: 222px;
    display: flex;
    justify-content: center;
    .call_btn {
      width: 341px;
      height: 40px;
      background: #4783FE;
      border-radius: 10px;
      text-align: center;
      font-size: 15px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #FFFFFF;
      line-height: 40px;
    }
  }
</style>
