<template>
  <div>
    <!-- 'title','hasRight','back','parting','search','upload' -->
    <my-header title="全部联系人" back="true" backUrl='Connection'></my-header>
    <div class="all_connections">
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

    <div class="connections">
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
        curOriganizationDeep:[]//顶部"xxx>xxx>xxx"处使用
      }
    },
    watch:{
      curOriganization: function(val,oldVal){
        this.getOrganizationMember(val.deptId);
      }
    },
    created() {
      this.getOriganizations();
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

  .partments {
    margin-bottom: 23px;

    .partment {
      display: flex;
      align-items: center;
      height: 90px;
      background-color: #FFFFFF;
      justify-content: space-between;
      span {
        font-size: 30px;
        font-family: Microsoft YaHei Regular;
        color: #333333;
        line-height: 90px;
        height: 90px;
        margin-left: 27px;
      }

      img {
        width: 27px;
        margin-right: 33px;
      }
    }
  }

  .connections {
    .connection {
      height: 90px;
      display: flex;
      align-items: center;
      background-color: #FFFFFF;
      justify-content: space-between;
      .connection_user{
        display: flex;
        align-items: center;
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
          align-self: unset;
        }
      }


      .call {
        width: 70px;
        height: 70px;
        margin-right: 24px;
      }
    }
  }
</style>
