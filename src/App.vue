<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
    width: 100%;
  }
/* 底部导航样式 */
  .van-tabbar-item {
    font-size: 32px !important;
  }
  .van-tabbar {
    height: 100px !important;
  }
/* 底部导航样式‘任务’右上角任务数样式 */
  .van-info{
    padding: 0 7.5px !important;
    font-size: 24px !important;
    right: unset !important;
  }
/*头部title样式*/
  .van-nav-bar__title{
    font-size: 30px !important;
  }
/*任务详情Tab样式*/
  .van-tab{
    font-size: 32px !important;
    color:#ccc
  }
  .van-tabs{
    height: 93% !important;
  }
  .van-tab--active{
    color: #323233 !important;
  }
</style>
