<template>
  <div>
    <!-- 'title','hasRight','back','parting','search','upload' -->
    <my-header title="通讯录"></my-header>
    <!-- <van-cell title="查看全部联系人">
      <template #right-icon>
        <img class="all_connections" src="../../assets/all_connections@2x.png" />
      </template>
    </van-cell> -->
    <div class="all_connections" @click="AllContector()">
      <span>查看全部联系人</span>
      <img src="../../assets/all_connections@2x.png" />
    </div>
    <div class="last_connections">
      <span>最近联系人</span>
    </div>
    <div class="connections">
      <template v-for="(item,index) in lastestConnector">
        <div class="connection" :ke="index">
          <img class="user_head" src="../../assets/head@2x.png" />
          <span class="user_name">{{item}}</span>
          <img class="call" src="../../assets/call@2x.png" />
        </div>
      </template>
    </div>

    <navigate-bar></navigate-bar>
  </div>

</template>

<script>
  import NavigateBar from '../views/navigateBar.vue'
  import MyHeader from '../views/header.vue'
  export default {
    name: 'Connection',
    components: {
      NavigateBar,
      MyHeader
    },
    data(){
      return{
        lastestConnector:localStorage.getItem('lastestConnector')
      }
    },
    methods:{
      AllContector(){
        this.$router.push('/ConnectAll')
      }
    }
  }
</script>

<style scoped lang="less">
  .all_connections {
    display: flex;
    align-items: center;
    height: 77px;
    background-color: #FFFFFF;

    span {
      font-size: 31px;
      font-family: Microsoft YaHei Regular;
      color: #666666;
      letter-spacing: 1px;
      line-height: 77px;
      height: 77px;
      margin-left: 22px;
    }

    img {
      width: 38px;
      margin-left: 449px;
    }
  }

  .last_connections {
    font-size: 31px;
    font-family: Microsoft YaHei Regular;
    font-weight: 400;
    color: #666666;
    letter-spacing: 1px;
    height: 94px;
    line-height: 94px;
    text-align: center;
  }

  .connections {
    .connection {
      height: 90px;
      display: flex;
      align-items: center;
      background-color: #FFFFFF;
      border-bottom: ;
      .user_head {
        width: 71px;
        height: 71px;
        margin-left: 22px;
      }

      .user_name {
        font-size: 30px;
        font-family: Microsoft YaHei Regular;
        font-weight: 400;
        color: #333333;
        margin-left: 22px;
      }

      .call {
        width: 70px;
        height: 70px;
        margin-left: 452px;
      }
    }
  }
</style>
