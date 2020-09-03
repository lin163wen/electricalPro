<template>
  <div class="about_div">
    <!-- 'title','hasRight','back','parting','search','upload' -->
    <my-header title="关于" back="true"></my-header>
    <div class="about">
      <span>清除缓存</span>
    </div>
  </div>

</template>

<script>
  import MyHeader from '../views/header.vue'
  export default {
    name: 'About',
    components: {
      MyHeader
    }
  }
</script>

<style scoped lang="less">
  .about_div {
    height: 100%;
    padding: 44px 0 0;
    background-color: #FFFFFF;
    .about {
      height: 50px;
      width: 100%;
      span {
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #3F3E3E;
        line-height: 50px;
      }
    }
  }
</style>
