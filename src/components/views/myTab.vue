<template>
  <div class="tab">
    <div @click="tabChange(1)" :class="getActiveClass(1)">
      图片
      <span class="tab_active" v-if="active==1"></span>
    </div>
    <div @click="tabChange(2)" :class="getActiveClass(2)">
      视频
      <span class="tab_active" v-if="active==2"></span>
    </div>
    <div @click="tabChange(3)" :class="getActiveClass(3)">
      音频
      <span class="tab_active" v-if="active==3"></span>
    </div>
    <div class="search">
      <img src="../../assets/search_btn@2x.png" @click="onSearch()"/>
      <input v-model="value"/>
    </div>
  </div>
</template>

<script>
  export default{
    name:'MyTab',
    data(){
      return{
        value:'',
        active:1,
      }
    },
    methods:{
      getActiveClass(active){
		if(this.active==active){
			return 'active';
		}
      },
      tabChange(active){
        this.active=active;
        this.$emit('tabChange',this.active);
      },
      onSearch(){
        this.$emit('search',this.value);
      }
    }
  }
</script>

<style scoped lang="less">

  .tab{
    height: 40px;
    padding: 5px 5px;
    display: flex;
    flex-direction: row;
    background: #FFFFFF;
    
    div{
      width: 32px;
      min-width: 32px;
      margin-right: 20px;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #3F3E3E;
      line-height: 30px;
      vertical-align: middle;
      text-align: center;
      position: relative;
    }
    .active{
    		color: #4783FE;
    }
    .tab_active{
      width: 22px;
      height: 3px;
      background: #4783FE;
      border-radius: 2px;
      display: block;
      position: absolute;
      bottom: 0;right: 0;left: 0;
      margin: 0 auto;
    }
    .search{
      height: 30px;
      background: #F0F0F0;
      border-radius: 15px;
      display: flex;
      flex-direction: row;
      overflow: hidden;
      align-items: center;
      flex-grow: 1;
      img{
        width: 17px;
        height: 17px;
        margin-left: 20px;
      }
      input{
        margin-left: 8px;
        border: none;
        background: #F0F0F0;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #CCCCCC;
        line-height: 20px;
        width: auto;
      }
    }
  }
</style>
