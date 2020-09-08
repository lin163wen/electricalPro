<template>
  <div class="work_div">
    <!-- 'title','hasRight','back','parting','search','upload' -->
    <my-header title="工作"></my-header>
    <div class="text1">
      请选择要开始的工作
    </div>
    <div class="text2">
      点击选择要开始的工作
    </div>
    <div class="work">
      <div class="material" @click="material()"></div>
      <div class="audit" @click="audit()"></div>
    </div>
    <navigate-bar></navigate-bar>
  </div>

</template>

<script>
  import NavigateBar from '../views/navigateBar.vue'
  import MyHeader from '../views/header.vue'
  export default {
    name: 'Work',
    components: {
      NavigateBar,
      MyHeader
    },
    methods: {
      material() {
        this.$router.push('/Material')
      },
      audit() {
        this.$router.push('/Audit')
      }
    }
  }
</script>

<style scoped lang="less">
  .work_div {
    background: #FFFFFF;
    height: 100%;
    position: relative;
    overflow-y: auto;
    overflow-x: hidden;
    .text1 {
      padding-top: 108px;
      padding-left: 16px;
      font-size: 22px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #3F3E3E;
      line-height: 30px;
    }

    .text2 {
      padding-top: 5px;
      padding-left: 16px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #939393;
      line-height: 17px;
    }

    .work {
      padding-top: 80px;
      padding-left: 16px;
      padding-bottom: 200px;
      div {
        width: 343px;
        height: 110px;
      }

      .material {
        background: url(../../assets/material@2x.png) no-repeat center center;
        background-size: 100% 100%;
        text-align: center;
      }

      .audit {
        margin-top: 51px;
        background: url(../../assets/audit@2x.png) no-repeat center center;
        background-size: 100% 100%;
        text-align: center;
      }
    }
  }
</style>
