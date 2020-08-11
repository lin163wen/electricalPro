<template>
  <div>
    <!-- 'title','hasRight','back','parting','search','upload' -->
    <my-header title="工作"></my-header>
    <div class="work">
      <div @click="material()">素材</div>
      <div @click="audit()">审稿</div>
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
  .work div {
    width: 40%;
    margin: 30px;
    display: inline-block;
  }
</style>
