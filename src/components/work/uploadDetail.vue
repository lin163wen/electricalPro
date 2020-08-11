<template>
  <div>
    <!-- 'title','hasRight','back','parting','search','upload' -->
    <my-header title="" back="true" hasRight="true" upload="true"></my-header>
    <div>
      上传详情
    </div>
  </div>

</template>

<script>
  import MyHeader from '../views/header.vue'
  export default {
    name: 'UploadDetail',
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
