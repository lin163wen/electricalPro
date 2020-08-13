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
    width: 100%;
    position: relative;
    overflow-x: hidden;
    height: 100%;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    background-attachment: local;
    overflow-y: auto;
    -moz-user-select: none;
    /*火狐*/
    -webkit-user-select: none;
    /*webkit浏览器*/
    -ms-user-select: none;
    /*IE10*/
    -khtml-user-select: none;
    /*早期浏览器*/
    user-select: none;
  }

  /* 底部导航样式 */
  .van-tabbar-item {
    font-size: 32px !important;
  }

  .van-tabbar {
    height: 112px !important;
  }

  /* 底部导航样式‘任务’右上角任务数样式 */
  .van-info {
    padding: 0 7.5px !important;
    font-size: 24px !important;
    right: unset !important;
  }

  /*头部title样式*/
  .van-nav-bar__title {
    height: 43px !important;
    font-size: 42px !important;
    font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular !important;
    font-weight: 400 !important;
    color: #ffffff !important;
    line-height: 43px !important;
    letter-spacing: 3px !important;
  }

  /*任务详情Tab样式*/
  .van-tab {
    font-size: 32px !important;
    font-size: 36px !important;
    font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular !important;
    font-weight: 400 !important;
    text-align: left !important;
    color: #86898b !important;
    letter-spacing: 1px !important;
  }
  .van-tabs__wrap{
    height: 66px !important;
  }

  /* .van-tabs {
    height: 1223px !important;
  }
  .van-tabs__content{
    height: 1157px !important;
  } */

  .van-tab--active {
    color: #888b8d !important;
  }

  .van-grid-item__icon {
    font-size: 32px !important;
  }

  .van-grid-item__text {
    font-size: 32px !important;
  }


  .van-grid {
    margin-top: 50px !important;
  }

  .van-grid-item__content--center {
    border: solid #2C3E50 1px;
  }

  /* .van-swipe{
    width: 100% !important;
  }
  .van-swipe-item{
    width: 100% !important;
  } */
</style>
