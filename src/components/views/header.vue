<template>
  <van-nav-bar :title="title" class="header">
    <template #left v-if="back">
      <img src="../../assets/back@2x.png" class="back" @click="goBack()"/>
    </template>
    <template #right v-if='hasRight'>
        <div v-if="parting">
          <img src="" class="back" @click="goParting()"/>
        </div>
        <div v-if="search">
          <img src="" class="back" @click="goSearch()"/>
        </div>
        <div v-if="upload" class="upload">上传</div>
    </template>
  </van-nav-bar>
</template>

<script>
  export default{
    name:'MyHeader',
    props:['title','hasRight','back','parting','search','upload','backUrl'],
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    created() {
      console.log(this.backUrl);
    },
    methods:{
      goBack(){
        if(this.backUrl){
          this.$router.push(this.backUrl);
        }else{
          this.$router.back();
        }

      },
      onClickLeft(){
        console.log('left')
      }
    }
  }
</script>

<style scoped="scoped" lang="less">
.header{
  height: 111px;
  background: linear-gradient(#7c5dfb 0%, #41abff 100%);
  .back{
    height: 47px;
    width: 25px;
  }
  .upload{
    width: 60px;
    height: 40px;
    font-size: 22px;
    margin: 0 10px;
  }
  div{
    width: 40px;
    height: 40px;
    font-size: 22px;
    margin: 0 10px;
  }
}
</style>
