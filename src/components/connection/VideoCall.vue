<template>
	<div class="call">
    <div class="call_info">
      <div class="video_call">
        <span>视频通话</span>
      </div>
      <div class="video_info">
        <span>略略略 01:09:20</span>
      </div>
    </div>
    <div class="video_self">
    </div>
    <div class="operations">
      <div class="operation audio">
        <img src="../../assets/call_audio@2x.png" />
        <span>麦克风</span>
      </div>
      <div class="operation hang_out">
        <img src="../../assets/hang_up@2x.png" />
        <span>挂断</span>
      </div>
      <div class="operation video">
        <img src="../../assets/call_video@2x.png" />
        <span>摄像头</span>
      </div>
    </div>
  </div>

</template>

<script>
import MyHeader from '../views/header.vue'
export default{
  name:'Calling',
  components:{MyHeader},
  data(){
    return{
      userInfo:{}
    }
  },
  computed:{
    firstName:function(){
      var userName = this.userInfo.name;
      return userName.substr(0,1);
    }
  },
  created() {
    console.log(this.$route.params.userInfo)
    this.userInfo = this.$route.params.userInfo;
  },
  methods:{

  }
}
</script>

<style scoped lang="less">
  .call{
    height: 100%;
    width: 100%;
    background: url(../../assets/start@2x.png) no-repeat center;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    .call_info{
      top:43px;
      display: flex;
      position: absolute;
      align-items: center;
      flex-direction: column;
      .video_call{
        margin-bottom: 15px;
        span {
          font-size: 28px;
          font-family: Microsoft YaHei Regular;
          font-weight: 400;
          color: #ffffff;
          letter-spacing: 2px;
        }
      }
      .video_info {
        span {
          font-size: 22px;
          font-family: Microsoft YaHei Regular;
          font-weight: 400;
          color: #ffffff;
          letter-spacing: 2px;
        }
      }
    }

    .video_self{
      position: absolute;
      top: 140px;
      left:499px;
      width: 239px;
      height: 293px;
      background-color: #FFFFFF;
    }

    .operations{
      position: absolute;
      bottom:214px;
      width:547px;
      display: flex;
      justify-content: space-between;
      .operation{
        width: 126px;
        height: 180px;
        text-align: center;
        img{
          width: 126px;
          height: 126px;
          margin-bottom: 19px;
        }
        span{
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
