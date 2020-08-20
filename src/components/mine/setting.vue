<template>
	<div>
    <!-- 'title','hasRight','back','parting','search','upload' -->
    <my-header title="设置" back="true"></my-header>
    <div class="clear_cache">
      <span class="clear">清除缓存</span>
      <div>
        <span class="num" @click="remove()">{{cacheData}}</span>
        <img class="clear_go" src="../../assets/go@2x.png" />
      </div>
    </div>
    <div class="logout">
      <div class="logout_btn" @click="logout()">
        <span class="logout_text">退出登录</span>
      </div>

    </div>
  </div>

</template>

<script>
import MyHeader from '../views/header.vue'
import {
		Toast
	} from 'vant';
export default{
  name:'Setting',
  components:{MyHeader},
  data(){
    return{
      cacheData:0
    }
  },
  created() {
    this.getCache();
  },
  methods:{
    logout(){
      localStorage.setItem('token','');
      this.$router.push('/');
    },
    caching(callback){
    	if (window.plus) {
    		plusReady();
    	}else {
    		document.addEventListener('plusready', plusReady, false);
    	}
      function plusReady(){
      		plus.cache.calculate( function ( size ) {
            var fileSizeString = "0B";
      			if (size == 0) {
      				fileSizeString = "0B";
      			} else if (size < 1024) {
      				fileSizeString = size + "B";
      			} else if (size < 1048576) {
      				fileSizeString = (size / 1024).toFixed(2) + "KB";
      			} else if (size < 1073741824) {
      				fileSizeString = (size / 1048576).toFixed(2) + "MB";
      			} else {
      				fileSizeString = (size / 1073741824).toFixed(2) + "GB";
      			}

      			callback(fileSizeString);
      		});
      	}
    },
    clearCaching(callback){
    	if (window.plus) {
    		plusReady();
    	}else {
    		document.addEventListener('plusready', plusReady, false);
    	}
      function plusReady(){
      		plus.cache.clear(function () {
      			callback();
      		});
      	}
    },
    getCache(){
      var _this = this;
    	this.caching(function(data){
    		console.log("缓存为"+data);
        _this.cacheData = data;
    	});
    },
    remove(){
      localStorage.setItem('token','')
      /* var _this = this;
    	this.clearCaching(function(){
    		Toast("缓存清除成功！");
        _this.getCache();
    	}); */
    }

  }
}
</script>

<style scoped lang="less">
  .clear_cache{
    height: 79px;
    width: 100%;
    background-color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span{
      font-size: 36px;
      font-family: Microsoft YaHei Regular;
      color: #888b8d;
      letter-spacing: 1px;
    }
    .clear{
      margin-left: 26px;
    }
    .clear_go{
      width: 15px;
      height: 25px;
      margin-right: 26px;
      margin-left: 16px;
    }
  }
  .logout{
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 112px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #e5e5e5;
    .logout_btn{
      background: url(../../assets/logo_out@2x.png) no-repeat center;
      background-size: 100% 100%;
      width: 539px;
      height: 99px;
      text-align: center;
      span{
        font-size: 36px;
        font-family: Microsoft YaHei Regular;
        color: #ffffff;
        letter-spacing: 1px;
        line-height: 99px;
      }
    }

  }
</style>
