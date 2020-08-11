<template>
  <div>
    <!-- 'title','hasRight','back','parting','search','upload' -->
    <my-header :title="headerTitle" back="true" hasRight="true" parting="true" search="true" backUrl="/Work"></my-header>
    <div class="material_content">
      <van-tabs v-model="active" color="#FFF">
        <van-tab title="图片">
            <div class="picture">
              <van-grid :border="false" :column-num="4">
                <van-grid-item>
                  <van-image src="https://img.yzcdn.cn/vant/apple-1.jpg" @click="materialDetail()"/>
                </van-grid-item>
                <van-grid-item>
                  <van-image src="https://img.yzcdn.cn/vant/apple-2.jpg" />
                </van-grid-item>
                <van-grid-item>
                  <van-image src="https://img.yzcdn.cn/vant/apple-3.jpg" />
                </van-grid-item>
                <van-grid-item>
                  <van-image src="https://img.yzcdn.cn/vant/apple-3.jpg" />
                </van-grid-item>
                <van-grid-item>
                  <van-image src="https://img.yzcdn.cn/vant/apple-3.jpg" />
                </van-grid-item>
                <van-grid-item>
                  <van-image src="https://img.yzcdn.cn/vant/apple-3.jpg" />
                </van-grid-item>
              </van-grid>
            </div>
        </van-tab>
        <van-tab title="视频">
            <div class="video">
            </div>
        </van-tab>
        <van-tab title="音频">
            <div class="audio">
            </div>
        </van-tab>
      </van-tabs>
    </div>
    <div @click="upload()">上传素材</div>
  </div>

</template>

<script>
  import MyHeader from '../views/header.vue'
  export default {
    name: 'Material',
    components: {
      MyHeader
    },
    data() {
      return {
        active:0,
        headerTitle: ''
      }
    },
    created() {
      var titlePre = this.$route.query.headerTitle;
      if(titlePre){
        this.headerTitle = titlePre+this.headerTitle;
      }else{
        this.headerTitle='素材'
      }

    },
    methods: {
      materialDetail(){
        console.log(11111);
        this.$router.push('/MaterialDetail');
      },
      upload(){
        this.$router.push('/Upload')
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
