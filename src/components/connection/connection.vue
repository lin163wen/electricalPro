<template>
  <div class="list_div">
    <!-- 'title','hasRight','back','parting','search','upload' -->
    <my-header title="通讯录"></my-header>
    <!-- <van-cell title="查看全部联系人">
      <template #right-icon>
        <img class="all_connections" src="../../assets/all_connections@2x.png" />
      </template>
    </van-cell> -->
    <div class="all_connections" @click="AllContector()">
      <img class="icon" src="../../assets/mine_selected@2x.png" />
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
          <span class="user_name">{{item.name}}</span>
          <img class="call" src="../../assets/call@2x.png" @click="goConnectDetail(item)"/>
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
        lastestConnector:[]
      }
    },
    created() {
      if(localStorage.getItem('lastestConnector')){
        this.lastestConnector = JSON.parse(localStorage.getItem('lastestConnector'));
        this.lastestConnector = this.lastestConnectorUnique(this.lastestConnector);
      }
    },
    methods:{
      goConnectDetail(item){
        console.log(item);
        this.$router.push({
          name:'ConnectDetails',
          params:{
            user:item
          }
        })
      },
      lastestConnectorUnique(arr){
        for(var i=0;i<arr.length;i++){
          for(var j=i+1;j<arr.length;j++){
            if(arr[i].id ==arr[j].id){
              arr.splice(j,1);
              j--;
            }
          }
        }
        return arr;
      },
      AllContector(){
        this.$router.push('/ConnectAll')
      }
    }
  }
</script>

<style scoped lang="less">
  .list_div{
  	height: 100%;
  	padding: 44px 0 0;
    background: #EDEDED;
  	.all_connections {
    display: flex;
    align-items: center;
    height: 50px;
    background-color: #FFFFFF;
    margin-top: 10px;
    .icon{
      width: 20px;
      height: 20px;
      margin-left: 16px;
    }
    span{
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #3F3E3E;
      line-height: 22px;
      margin-left: 15px;
    }


    img {
      width: 8px;
      height: 14px;
      margin-left: 193px;
    }
  }

  .last_connections {
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #3F3E3E;
    line-height: 60px;
    margin-top: 10px;
    padding-left: 15px;
    height: 60px;
    background: #FFFFFF;
  }

  .connections {
    background-color: #FFFFFF;
    .connection {
      height: 60px;
      display: flex;
      align-items: center;
      
      border-bottom: ;
      .user_head {
        width: 40px;
        height: 40px;
        margin-left: 16px;
      }

      .user_name {
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #3F3E3E;
        line-height: 60px;
        margin-left: 20px;
      }

      .call {
        width: 26px;
        height: 26px;
        margin-left: 215px;
      }
    }
  }
  }
</style>
