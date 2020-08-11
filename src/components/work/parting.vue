<template>
  <div>
    <!-- 'title','hasRight','back','parting','search','upload' -->
    <my-header title="分类" backUrl="/Material"></my-header>
    <div class="material_content">
      <van-grid :border="false" :column-num="4">
        <van-grid-item>
          <div @click="parting()">
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
  </div>

</template>

<script>
  import NavigateBar from '../views/navigateBar.vue'
  import MyHeader from '../views/header.vue'
  export default {
    name: 'Parting',
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
  .work div {
    width: 40%;
    margin: 30px;
    display: inline-block;
  }
</style>
