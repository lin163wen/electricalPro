<template>
	<div style="height: 100%;">
    <!-- 'title','hasRight','back','parting','search','upload' -->
    <my-header title="任务详情" back="true" ref="header" backUrl='/Mission'></my-header>
    <van-tabs v-model="active" color="#FFF">
      <van-tab title="正文内容">
        <div class="content">
          <div class="zw">
            正文内容
          </div>
          <div class="btn_div">
            <div @click="nextStep()">下一步</div>
          </div>
        </div>
      </van-tab>
      <van-tab title="基础信息">
        <div class="content">
          <div class="jc">
            基础信息
          </div>
          <div class="btn_div">
            <div>发布</div>
            <div>审核通过</div>
            <div @click="back()">退回</div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>

</template>

<script>
import MyHeader from '../views/header.vue'
export default{
  name:'MissionDetail',
  components:{MyHeader},
  data(){
    return{
      active:0
    }
  },
  methods:{
    nextStep(){
      this.active=1;
    },
    back(){
      this.$router.push('/MissionBack')
    }
  }
}
</script>

<style scoped lang="less">
  .content{
    display: flex;
    flex-direction: row;
    padding-top: 50px;
    .zw{

    }
    .btn_div{
      display: flex;
      position: absolute;
      bottom: 30px;
    }
  }
</style>
