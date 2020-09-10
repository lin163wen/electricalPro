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
      <img class="search_img" src="../../assets/search_btn@2x.png"/>
      <input v-model="value" @input="onSearch()"/>
      <img class="clear_img" src="../../assets/clear@2x.png" v-if="hasValue" @click="clear()" />
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
        hasValue:false,
      }
    },
    watch:{
      value:function(val,oldVal){
        if(val && val!=''){
          this.hasValue=true;
        }else{
          this.hasValue=false;
        }
      }
    },
    methods:{
      clear(){
        this.value='';
        this.$emit('search',this.value);
      },
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
      width: 36px;
      min-width: 32px;
      margin-right: 20px;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #009C86;
      line-height: 30px;
      vertical-align: middle;
      text-align: center;
      position: relative;
    }
    .active{
    		color: #009C86;
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
      .clear_img{
        width: 15px;
        height: 15px;
      }
      .search_img{
        width: 17px;
        height: 17px;
        margin-left: 20px;
      }
      input{
        width: 80px;
        margin-left: 15px;
        border: none;
        background: #F0F0F0;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #CCCCCC;
        line-height: 20px;
      }
    }
  }
</style>
