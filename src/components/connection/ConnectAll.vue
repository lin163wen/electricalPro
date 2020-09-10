<template>
  <div class="all_div">
    <!-- 'title','hasRight','back','parting','search','upload' -->
    <my-header title="全部联系人" back="true" backUrl='Connection'></my-header>
    <div class="all_connections">
      <span v-if="index!=0">联系人></span>
      <template v-for="(item,index) in curOriganizationDeep">
        <span v-if="index!=0">></span>
        <span :value="item.deptId" @click="returnLastDept(item)">{{item.deptName}}</span>
      </template>
    </div>
    <div class="partments">
      <template v-for="(item,index) in curOriganization.subOrgList">
        <div class="partment" @click="subOrgList(item)">
          <span>{{item.deptName}}</span>
          <img src="../../assets/all_connections@2x.png" />
        </div>
      </template>
    </div>

    <div class="connections" v-if="members.length>0">
        <div class="text">
          联系人
        </div>
        <template v-for="(item,index) in members">
          <div class="connection" @click="ConnectDetail(item)">
            <div class="connection_user">
              <img class="user_head" src="../../assets/head@2x.png" />
              <span class="user_name">{{item.name}}</span>
            </div>
            <img class="call" src="../../assets/call@2x.png" @click="Call()"/>
          </div>
        </template>
    </div>

    <div class="last_connections_text">
      <span>最近联系人</span>
    </div>
    <div class="last_connections">
      <template v-for="(item,index) in lastestConnector">
        <div class="connection" :ke="index">
          <img class="user_head" src="../../assets/head@2x.png" />
          <span class="user_name">{{item.name}}</span>
          <img class="call" src="../../assets/call@2x.png" @click="ConnectDetail(item)"/>
        </div>
      </template>
    </div>
  </div>

</template>

<script>
  import NavigateBar from '../views/navigateBar.vue'
  import MyHeader from '../views/header.vue'
  import {
    Organizations,
    OrganizationMember
  } from '../../utils/request.js'
  import { Toast } from 'vant';
  export default {
    name: 'ConnectAll',
    components: {
      NavigateBar,
      MyHeader
    },
    data() {
      return {
        origanizations: [],//所有部门
        members: [],//存放当前部分人员列表
        curOriganization:{},//存放当前部门
        curOriganizationDeep:[],//顶部"xxx>xxx>xxx"处使用
        lastestConnector:[]
      }
    },
    watch:{
      curOriganization: function(val,oldVal){
        this.getOrganizationMember(val.deptId);
      }
    },
    created() {
      this.getOriganizations();
      if(localStorage.getItem('lastestConnector')){
        this.lastestConnector = JSON.parse(localStorage.getItem('lastestConnector'));
        this.lastestConnector = this.lastestConnectorUnique(this.lastestConnector);
      }
    },
    methods: {
      ConnectDetail(item){
        console.log(item);
        this.$router.push({
          name:'ConnectDetails',
          params:{
            user:item
          }
        })
      },
      returnLastDept(item){
        this.curOriganization = item;
        //删除deep数组item后面的其他元素
        var index = this.curOriganizationDeep.findIndex(text => text.deptId === item.deptId);
        this.curOriganizationDeep = this.curOriganizationDeep.slice(0,index+1)

      },
      subOrgList(item){
        this.curOriganization = item;
        this.curOriganizationDeep.push(item)
      },
      getOriganizations() {
        var _this = this;
        Organizations({}).then((response) => {
          console.log(response);
          if (response.code == 0) {
            _this.origanizations = response.list;
            if(_this.origanizations.length>0){
              _this.curOriganization = _this.origanizations[0]
              _this.curOriganizationDeep.push(_this.curOriganization)
              _this.getOrganizationMember(this.curOriganization.deptId);
            }
          }else{
						Toast(response.message);
            if(response.code==401){
              _this.$router.push('/Login')
            }
					}
        },(err) => {
          console.log(err)
        })
      },
      getOrganizationMember(orgId) {
        var _this = this;
        OrganizationMember({
          orgId: orgId
        }).then(response => {
          if (response.code == 0) {
            _this.members = response.list;
          }else{
						Toast(response.message);
            if(response.code==401){
              _this.$router.push('/Login')
            }
					}
        }).catch(err => {
          console.log(err);
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .all_div{
  	height: 100%;
  	padding: 44px 0 0;
  	box-sizing: border-box;
  	.all_connections {
    display: flex;
    align-items: center;
    height: 50px;
    background: #FFFFFF;
    margin: 10px 0px;
    padding-left: 17px;
    span {
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #009C86;
      line-height: 22px;
    }
  }

  .partments {
    margin-bottom: 10px;
    background-color: #FFFFFF;
    .partment {
      display: flex;
      align-items: center;
      height: 62px;
      margin-left: 16px;
      justify-content: space-between;
      border-bottom: solid #F0F0F0 1px;
      width: 343px;
      span {
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #3F3E3E;
        line-height: 22px;
      }

      img {
        width:8px;
        height: 14px;
        margin-right: 16px;
      }
    }
  }

  .connections {
    background: #FFFFFF;
    .text{
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #3F3E3E;
      line-height: 22px;
      padding-left: 15px;
      padding-top: 19px;
    }
    .connection {
      height: 60px;
      display: flex;
      align-items: center;
      background-color: #FFFFFF;
      justify-content: space-between;
      .connection_user{
        display: flex;
        align-items: center;
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
          line-height: 40px;
          align-self: unset;
          margin-left: 20px;
        }
      }


      .call {
        width: 26px;
        height: 26px;
        margin-right: 16px;
      }
    }

  }

  .last_connections_text {
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

  .last_connections {
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
