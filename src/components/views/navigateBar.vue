<template>
  <van-tabbar v-model="active">
    <van-tabbar-item to='/Mission' badge="3">
      <span>任务</span>
    </van-tabbar-item>
    <van-tabbar-item to="/Work">工作</van-tabbar-item>
    <van-tabbar-item to="/Connection">通讯录</van-tabbar-item>
    <van-tabbar-item to="/Mine">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
  import { NavBar } from 'vant';
  export default {
    name: "NavigateBar",
    props: ['tabName'],
    data() {
      return {
        active:0,
        missionNum:0,
        num: true
      }
    },

    methods: {
      addClassName: function(path) {
        this.$router.replace(path);
      },
    }
  }
</script>

<style scoped="scoped" lang="less">
</style>
