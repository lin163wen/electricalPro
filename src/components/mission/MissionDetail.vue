<template>
	<div>
    <!-- 'title','hasRight','back','parting','search','upload' -->
    <my-header title="任务详情" back="true"></my-header>
    <van-tabs v-model="active">
      <van-tab title="标签 1">正文内容</van-tab>
      <van-tab title="标签 2">基础信息</van-tab>
    </van-tabs>
    <div v-if="active==0">
      正文内容
    </div>
    <div v-if="active==1">
      基础信息
    </div>
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
  }
}
</script>

<style scoped lang="less">
  .content{
    display: flex;
    flex-wrap: nowrap;
    padding: 50px;
    height: 120px;
    .icon{
      height: 100px;
      width: 100px;
    }
    .text{
      padding-left: 20px;
      text-align: left;
      .text_title{
        font-size: 32px;
      }
    }
    .author{
      padding-left: 30px;
      line-height: 120px;
    }
  }
</style>
