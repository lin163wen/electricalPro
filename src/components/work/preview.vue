<template>
  <div>
    <!-- 'title','hasRight','back','parting','search','upload' -->
    <my-header title="" back="true" hasRight="true" upload="true"></my-header>
    <div class="material_content">
      预览
    </div>
  </div>

</template>

<script>
  import MyHeader from '../views/header.vue'
  export default {
    name: 'Preview',
    components: {
      MyHeader
    },
    data() {
      return {
      }
    },
    methods: {
    }
  }
</script>

<style scoped lang="less">
</style>
