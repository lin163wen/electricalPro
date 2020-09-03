<template>
  <div class="setting_div">
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
  export default {
    name: 'Setting',
    components: {
      MyHeader
    },
    data() {
      return {
        cacheData: 0
      }
    },
    created() {
      this.getCache();
    },
    methods: {
      logout() {
        localStorage.setItem('token', '');
        this.$router.push('/');
      },
      caching(callback) {
        if (window.plus) {
          plusReady();
        } else {
          document.addEventListener('plusready', plusReady, false);
        }

        function plusReady() {
          plus.cache.calculate(function(size) {
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
      clearCaching(callback) {
        if (window.plus) {
          plusReady();
        } else {
          document.addEventListener('plusready', plusReady, false);
        }

        function plusReady() {
          plus.cache.clear(function() {
            callback();
          });
        }
      },
      getCache() {
        var _this = this;
        this.caching(function(data) {
          console.log("缓存为" + data);
          _this.cacheData = data;
        });
      },
      remove() {
        localStorage.setItem('token', '')
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
  .setting_div {
    height: 100%;
    padding: 44px 0 0;
    background-color: #FFFFFF;
    .clear_cache {
      height: 50px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      span {
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #3F3E3E;
        line-height: 50px;
      }

      .clear {
        margin-left: 26px;
      }

      .clear_go {
        width: 6px;
        height: 10px;
        margin-right: 26px;
        margin-left: 16px;
      }
    }

    .logout {
      position: fixed;
      bottom: 20px;
      width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #FFFFFF;

      .logout_btn {
        width: 341px;
        height: 40px;
        background: #4783FE;
        border-radius: 10px;
        text-align: center;

        span {
          font-size: 15px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #FFFFFF;
          line-height: 40px;
        }
      }

    }
  }
</style>
