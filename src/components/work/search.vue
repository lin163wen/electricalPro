<template>
  <div>
    <!-- 'title','hasRight','back','parting','search','upload' -->
    <my-header title="搜索" back="true"></my-header>
    <div class="material_content">
      搜索
    </div>
  </div>

</template>

<script>
  import MyHeader from '../views/header.vue'
  export default {
    name: 'Search',
    components: {
      MyHeader
    },
    data() {
      return {
      }
    },
    methods: {
      parting() {
        this.$router.push('/Material?headerTitle=分类1')
      }
    }
  }
</script>

<style scoped lang="less">
</style>
