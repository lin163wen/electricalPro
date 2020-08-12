<template>
  <div>
    <!-- 'title','hasRight','back','parting','search','upload' -->
    <my-header title="" back="true" hasRight="true" upload="true"></my-header>
    <div class="preview_content">
      <div class="preview_imgs">
        <van-swipe ref="swipe" :show-indicators="false" @change="swipeChange">
          <van-swipe-item v-for="(image, index) in images" :key="index">
            <img v-lazy="image" class="preview_img" />
          </van-swipe-item>
          <template #indicator>
            <div></div>
          </template>
        </van-swipe>
      </div>
    </div>
    <div class="small_imgs">
      <div v-for="(image, index) in images" :key="index">
        <img :src="image"  :class="getSmallImgClass(index)" @click="selectedImg(index)"/>
      </div>
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
        selectedImgIndex:0,
        selectedImgClass:'',
        images: [
          'https://img.yzcdn.cn/vant/apple-1.jpg',
          'https://img.yzcdn.cn/vant/apple-2.jpg',
          'https://img.yzcdn.cn/vant/apple-3.jpg',
          'https://img.yzcdn.cn/vant/apple-4.jpg',
        ],
      }
    },
    created() {

    },
    methods: {
      getSmallImgClass(index){
        if(this.selectedImgIndex==index){
          return 'small_img small_img_selected';
        }else{
          return 'small_img small_img_no_selected';
        }
      },
      swipeChange(index){
        this.selectedImgIndex = index;

      },
      selectedImg(index){
        this.selectedImgIndex = index;
        this.$refs.swipe.swipeTo(this.selectedImgIndex);
      }
    }
  }
</script>

<style scoped lang="less">
  .preview_content {
    height: 1200px;
    margin: 20px;
    border: solid #008000 1px;
    background-color: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    .preview_imgs{
      height: 70%;
      width: 100%;
      .preview_img {
        width: 100%;
      }
    }


  }

  .small_imgs {
    display: flex;
    height: 100px;
    margin: 20px;

    .small_img {
      height: 100px;
      margin: 5px;
    }
    .small_img_no_selected{
      border: solid #323233 1px;
    }
    .small_img_selected{
      border: solid #FF0000 2px;
    }
  }
</style>
