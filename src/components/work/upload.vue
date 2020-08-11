<template>
  <div>
    <!-- 'title','hasRight','back','parting','search','upload' -->
    <my-header title="分类v" back="true" hasRight="true" upload="true"></my-header>
    <div class="material_content">
        <van-grid :border="false" :column-num="4">
          <van-grid-item>
            <div @click="uploadDetail()">
              分类1
            </div>
          </van-grid-item>
          <van-grid-item>
            <div>
              分类2
            </div>
          </van-grid-item>
          <van-grid-item>
            <div>
              分类3
            </div>
          </van-grid-item>
          <van-grid-item>
            <div>
              分类4
            </div>
          </van-grid-item>
          <van-grid-item>
            <div>
              分类5
            </div>
          </van-grid-item>
          <van-grid-item>
            <div>
              分类6
            </div>
          </van-grid-item>
        </van-grid>
    </div>
    <div @click="preview()">
      预览
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
      uploadDetail() {
        this.$router.push('/UploadDetail')
      },
      preview(){
        this.$router.push('/Preview')
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
