<template>
  <div>
    <div class="connector">
      <!-- 'title','hasRight','back','parting','search','upload' -->
      <div class="header">
        <img src="../../assets/back@2x.png" class="back" @click="goBack()" />
        <span>联系人</span>
      </div>
      <div class="connector_info">
        <div class="connector_first_name">
          <span>{{firstName}}</span>
        </div>
        <div class="connector_name">
          <span>{{userInfo.name}}</span>
        </div>
        <div class="connector_info_details">
          <div class="phone">
            <span>电话</span>
            <br />
            <span>{{userInfo.phone}}</span>
          </div>
          <div class="separator">
          </div>
          <div class="section">
            <span>部门</span>
            <br />
            <span>{{userInfo.orgName}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="call_div">
    		<div class="call_btn" @click="call()"></div>
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
    data(){
      return{
        userInfo:null,
      }
    },
    created() {
      console.log(this.$route.params.user)
      this.userInfo = this.$route.params.user;
    },
    computed:{
      firstName:function(){
        var userName = this.userInfo.name;
        return userName.substr(0,1);
      }
    },
    methods:{
      goBack(){
        this.$router.push('ConnectAll');
      },
      call(){
        //localStorage.setItem('lastestConnector','')
        //设置最近联系人
        var lastestConnector = localStorage.getItem('lastestConnector');

        if(!lastestConnector){
          console.log(11111);
          lastestConnector = new Array();
        }else{
          lastestConnector = JSON.parse(lastestConnector)
        }
        console.log(lastestConnector)
        console.log(typeof lastestConnector)
        lastestConnector.push(this.userInfo);
        localStorage.setItem('lastestConnector',JSON.stringify(lastestConnector))
        this.$router.push({
          name:'Calling',
          params:{
            userInfo:this.userInfo
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .connector {
    background: url(../../assets/connection_bg@2x.png) no-repeat center center;
    width: 100%;
    height: 770px;

    .header {
      height: 111px;
      display: flex;
      align-items: center;

      img {
        height: 47px;
        width: 25px;
        margin-left: 16px;
      }

      span {
        font-size: 42px;
        font-family: Microsoft YaHei Regular;
        color: #ffffff;
        letter-spacing: 3px;
        margin-left: 268px;
      }
    }

    .connector_info {
      margin-top: 91px;
      display: flex;
      flex-direction: column;
      align-items: center;

      .connector_first_name {
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

      .connector_name {
        margin-top: 27px;

        span {
          font-size: 45px;
          font-family: Microsoft YaHei Regular;
          color: #ffffff;
          letter-spacing: 3px;
        }
      }

      .connector_info_details {
        margin-top: 60px;
        display: flex;

        .phone {
          width: 160px;
          height: 48px;
          font-size: 20px;
          font-family: Microsoft YaHei Regular;
          font-weight: 400;
          text-align: left;
          color: #ffffff;
          letter-spacing: 2px;
        }

        .separator {
          width: 3px;
          height: 51px;
          background: #f4f4f4;
          margin-left: 27px;
        }

        .section {
          width: 160px;
          height: 48px;
          font-size: 20px;
          font-family: Microsoft YaHei Regular;
          font-weight: 400;
          text-align: left;
          color: #ffffff;
          letter-spacing: 2px;
          margin-left: 52px;
        }
      }

    }
  }
  .call_div{
  	width: 100%;
  	position: fixed;
  	bottom: 0px;
  	.call_btn{
    width: 534px;
    height: 112px;
    background: url(../../assets/call_btn@2x.png) no-repeat center center;
    background-size: 100% 100%;
    margin-top: 411px;
    margin-left: 108px;
  }
  }
  
</style>
