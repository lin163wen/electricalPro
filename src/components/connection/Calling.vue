<template>
  <div class="call">
    <div class="call_member">
      <div class="first_name">
        <span>{{firstName}}</span>
      </div>
      <div class="name">
        <span>{{userInfo.name}}</span>
      </div>
      <div class="section">
        <span>{{userInfo.orgName}}</span>
      </div>
    </div>
    <div class="call_status">
      <span>对方手机可能不在身边建议稍后尝试...</span>
    </div>
    <div class="operations">
      <!-- <div class="audio">
        <span>麦克风</span>
      </div>
      <div class="hang_out">
        <span>挂断</span>
      </div>
      <div class="video">
        <span>摄像头</span>
      </div> -->
      <div class="operation hang_up" @click="hangUp()">
        <img src="../../assets/hang_up@2x.png" />
        <span>挂断</span>
      </div>
    </div>
  </div>

</template>

<script>
  import MyHeader from '../views/header.vue'
  export default {
    name: 'Calling',
    components: {
      MyHeader
    },
    data() {
      return {
        userInfo: {}
      }
    },
    computed: {
      firstName: function() {
        var userName = this.userInfo.name;
        return userName.substr(0, 1);
      }
    },
    created() {
      console.log(this.$route.params.userInfo)
      this.userInfo = this.$route.params.userInfo;
    },
    methods: {
      hangUp() {
        this.$router.push({
          name: 'ConnectDetails',
          params: {
            user: this.userInfo
          }

        })
      }
    }
  }
</script>

<style scoped lang="less">
  .call {
    height: 100%;
    width: 100%;
    background: url(../../assets/start@2x.png) no-repeat center;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;

    .call_member {
      top: 117px;
      display: flex;
      position: absolute;
      align-items: center;
      flex-direction: column;

      .first_name {
        width: 223px;
        height: 223px;
        background: #f4f4f4;
        border: 5px solid #1f7ee5;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;

        span {
          font-size: 73px;
          font-family: Microsoft YaHei Regular;
          color: #181717;
          line-height: 11px;
          letter-spacing: 5px;
        }
      }

      .name {
        margin-top: 27px;

        span {
          font-size: 45px;
          font-family: Microsoft YaHei Regular;
          color: #ffffff;
          letter-spacing: 3px;
        }
      }

      .section {
        margin-top: 15px;

        span {
          font-size: 20px;
          font-family: Microsoft YaHei Regular;
          text-align: center;
          color: #ffffff;
          letter-spacing: 2px;
        }
      }
    }

    .call_status {
      position: absolute;
      top: 683px;
      width: 457px;
      height: 94px;
      text-align: center;

      span {
        font-size: 40px;
        font-family: Microsoft YaHei Regular;
        font-weight: 400;
        color: #ffffff;
        letter-spacing: 3px;
      }
    }

    .operations {
      position: absolute;
      bottom: 214px;
      width: 487px;
      display: flex;
      justify-content: center;

      .operation {
        width: 126px;
        height: 180px;
        text-align: center;

        img {
          width: 126px;
          height: 126px;
          margin-bottom: 19px;
        }

        span {
          font-size: 36px;
          font-family: Microsoft YaHei Regular;
          font-weight: 400;
          color: #ffffff;
          letter-spacing: 3px;
        }
      }
    }
  }
</style>
