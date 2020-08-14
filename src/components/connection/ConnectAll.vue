<template>
	<div>
    <!-- 'title','hasRight','back','parting','search','upload' -->
    <my-header title="全部联系人" back="true"></my-header>
    <div class="all_connections">
      <span>部门名称>部门名称</span>
    </div>
    <div class="partments">
      <div class="partment">
        <span>部门名称</span>
        <img src="../../assets/all_connections@2x.png" />
      </div>
      <div class="partment">
        <span>部门名称</span>
        <img src="../../assets/all_connections@2x.png" />
      </div>
    </div>
    
    <div class="connections">
      <div class="connection">
        <img class="user_head" src="../../assets/head@2x.png" />
        <span class="user_name">我是谁</span>
        <img class="call" src="../../assets/call@2x.png" />
      </div>
      <div class="connection">
        <img class="user_head" src="../../assets/head@2x.png" />
        <span class="user_name">我是谁</span>
        <img class="call" src="../../assets/call@2x.png" />
      </div>
    </div>
  </div>

</template>

<script>
import NavigateBar from '../views/navigateBar.vue'
import MyHeader from '../views/header.vue'
export default{
  name:'ConnectAll',
  components:{NavigateBar,MyHeader}
}
</script>

<style scoped lang="less">
  .all_connections {
    display: flex;
    align-items: center;
    height: 86px;

    span {
      font-size: 31px;
      font-family: Microsoft YaHei Regular;
      color: #666666;
      letter-spacing: 1px;
      line-height: 77px;
      height: 77px;
      margin-left: 22px;
    }
  }
  .partments{
    margin-bottom: 23px;
    .partment {
      display: flex;
      align-items: center;
      height: 90px;
      background-color: #FFFFFF;

      span {
        font-size: 30px;
        font-family: Microsoft YaHei Regular;
        color: #333333;
        line-height: 90px;
        height: 90px;
        margin-left: 27px;
      }

      img {
        width: 38px;
        margin-left: 543px;
      }
    }
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
