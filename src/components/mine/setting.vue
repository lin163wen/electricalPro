<template>
	<div>
    <!-- 'title','hasRight','back','parting','search','upload' -->
    <my-header title="设置" back="true"></my-header>
    <div class="clear_cache">
      <span class="clear">清除缓存</span>
      <span class="num">999MB</span>
      <img class="clear_go" src="../../assets/go@2x.png" />
    </div>
  </div>

</template>

<script>
import MyHeader from '../views/header.vue'
export default{
  name:'Setting',
  components:{MyHeader}
}
</script>

<style scoped lang="less">
  .clear_cache{
    height: 79px;
    width: 100%;
    background-color: #FFFFFF;
    display: flex;
    align-items: center;
    span{
      font-size: 36px;
      font-family: Microsoft YaHei Regular;
      color: #888b8d;
      letter-spacing: 1px;
    }
    .clear{
      margin-left: 26px;
    }
    .num{
      margin-left: 400px;
    }
    .clear_go{
      width: 15px;
      height: 25px;
      margin-left: 16px;
    }
  }
</style>
