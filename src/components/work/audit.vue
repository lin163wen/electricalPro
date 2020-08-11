<template>
	<div>
    <!-- 'title','hasRight','back','parting','search','upload' -->
    <my-header title="审稿"></my-header>
    <div class="content" @click="missionDetail()">
      <img class="icon" src="../../assets/parting.png"/>
      <div class="text">
        <div class="text_title">稿件标题稿件标题稿件标题</div>
        <div class="text_lanmu">渠道-栏目</div>
        <div class="text_time">2020-02-02 22:22</div>
      </div>
      <div class="author">作者</div>
    </div>
    <div class="content">
      <img class="icon" src="../../assets/parting.png"/>
      <div class="text">
        <div class="text_title">稿件标题稿件标题稿件标题</div>
        <div class="text_lanmu">渠道-栏目</div>
        <div class="text_time">2020-02-02 22:22</div>
      </div>
      <div class="author">作者</div>
    </div>
  </div>

</template>

<script>
import NavigateBar from '../views/navigateBar.vue'
import MyHeader from '../views/header.vue'
export default{
  name:'Audit',
  components:{NavigateBar,MyHeader},
  methods:{
    missionDetail(){
      this.$router.push('/MissionDetail')
    }
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
