<template>
  <van-nav-bar :title="title" class="header">
    1111
    <template #left v-if="back">
      <img src="../../assets/back.png" class="back" />
    </template>
    <template #right v-if='hasRight'>
        <div v-if="parting">分类</div>
        <div v-if="search">搜索</div>
        <div v-if="upload">上传</div>
    </template>
  </van-nav-bar>
</template>

<script>
  export default{
    name:'MyHeader',
    props:['title','hasRight','back','parting','search','upload'],
    created() {
      console.log(this.title);
    },
    methods:{
      onClickLeft(){
        console.log('left')
      }
    }
  }
</script>

<style scoped="scoped" lang="less">
.header{
  padding: 30px 0;
  height: 60px;
  .back{
    height: 40px;
  }
}
</style>
