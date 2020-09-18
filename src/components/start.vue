<template>
  <div class="start_page">
    <div class="logo">
      <img src="../assets/start@2x.png" />
    </div>
    <div class="official">
      享受最便捷的办公
    </div>
    <div class="try">
      点击一下，立即体验
    </div>
    <div class="btn" @click="start()"></div>
    <!-- <div class="service">
      登陆注册即代表同意《服务条款》
    </div> -->
  </div>
</template>

<script>
  import {
    updateLocation
  } from '../utils/request.js'
  export default {
    name: 'Start',
    data() {
      return {
        autoToLogin: null,
        longitude: null,
        latitude: null
      }
    },
    created() {
      this.getLaLongtitude();
      this.hasToken();
    },
    methods: {
      hasToken() {
        var _this = this;
        var token = localStorage.getItem('token');
        console.log('Start......', token)
        if (token) {
          var navigateIndex = localStorage.getItem('navigateIndex') ? localStorage.getItem('navigateIndex') : 0;
          console.log(navigateIndex)
          this.updateLocation();
          if (navigateIndex == 0) {
            this.$router.push('Mission');
          } else if (navigateIndex == 1) {
            this.$router.push('Work');
          } else if (navigateIndex == 2) {
            this.$router.push('Connection');
          } else if (navigateIndex == 3) {
            this.$router.push('Mine');
          }

        } else {
          this.autoToLogin = setTimeout(function() {
            _this.$router.push('Login')
          }, 3000)
        }
      },
      getLaLongtitude() {
        var _this = this;
        AMap.plugin('AMap.Geolocation', function() {
          var geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,
            timeout: 10000 //超过10秒后停止定位，默认：无穷大
          })
          geolocation.getCurrentPosition();
          AMap.event.addListener(geolocation, 'complete', function onComplete(data) {
            console.log('具体的定位信息', data.position.getLng(), data.position.getLat());
            localStorage.setItem('longtitude', data.position.getLng())
            localStorage.setItem('latitude', data.position.getLat())
          });
          AMap.event.addListener(geolocation, 'error', function onError(data) {
            AMap.plugin('AMap.CitySearch', function() {
              var citySearch = new AMap.CitySearch();
              citySearch.getLocalCity(function(status, result) {
                if (status === 'complete' && result.info === 'OK') {
                  console.log(result);
                  console.log('通过ip获取当前城市：', result.bounds.northeast.lng, result.bounds.northeast.lat);
                  localStorage.setItem('longtitude', result.bounds.northeast.lng)
                  localStorage.setItem('latitude', result.bounds.northeast.lat)
                }
              })
            })
          });


        })
      },
      updateLocation() {
        updateLocation({
          clientId: 1,
          longitude: localStorage.getItem('latitude'),
          latitude: localStorage.getItem('longtitude'),
        }).then(resp => {
          console.log(resp);
        }, err => {
          console.log(err);
          _this.loginToast.clear()
        })
      },
      start() {
        clearTimeout(this.autoToLogin);
        this.$router.push('Login')
      }
    }
  }
</script>
<style scoped lang="less">
  .start_page div {
    left: 0;
    bottom: 0;
    right: 0;
    margin: 0 auto;
    position: absolute;
    text-align: center;
    width: 100%;
  }

  .start_page {
    background: #F4F7FF;
    width: 100%;
    height: 100%;
    position: relative;
    overflow-y: auto;

    .logo {
      width: 350px;
      height: 360px;
      top: 44px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .official {

      height: 28px;
      font-size: 20px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #484747;
      line-height: 28px;
      top: 438px;

    }

    .try {
      height: 21px;
      font-size: 15px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #939393;
      line-height: 21px;
      top: 477px;
    }

    .btn {
      width: 344px;
      height: 50px;
      background: url(../assets/start_btn@2x.png);
      background-size: 100% 100%;
      top: 583px;
    }

    .service {
      height: 17px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #009C86;
      line-height: 17px;
      top: 679px;
      padding-bottom: 69px;
    }
  }
</style>
