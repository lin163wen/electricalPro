<template>
  <div>
    <!-- 'title','hasRight','back','parting','search','upload' -->
    <div>
      <div class="mine">
        <!-- 'title','hasRight','back','parting','search','upload' -->
        <div class="header">
          <span>我的</span>
        </div>
        <div class="mine_info">
          <div class="first_name">
            <span>熊</span>
          </div>
          <div class="name">
            <span>熊大</span>
          </div>
          <div class="section">
            <span>科技财务中心部</span>
          </div>
        </div>
      </div>
      <div class="others">
        <div class="setting">
          <img class="setting_icon" src="../../assets/setting@2x.png" />
          <span>设置</span>
          <img class="setting_go" src="../../assets/go@2x.png" />
        </div>
        <div class="about">
          <img class="about_icon" src="../../assets/about@2x.png" />
          <span>关于</span>
          <img class="about_go" src="../../assets/go@2x.png" />
        </div>
      </div>
    </div>
    <navigate-bar></navigate-bar>
  </div>

</template>

<script>
  import NavigateBar from '../views/navigateBar.vue'
  import MyHeader from '../views/header.vue'
  export default {
    name: 'Mine',
    components: {
      NavigateBar,
      MyHeader
    }
  }
</script>

<style scoped lang="less">
  .mine {
    background: url(../../assets/connection_bg@2x.png) no-repeat center center;
    width: 100%;
    height: 770px;

    .header {
      height: 111px;
      display: flex;
      align-items: center;

      span {
        font-size: 42px;
        font-family: Microsoft YaHei Regular;
        color: #ffffff;
        letter-spacing: 3px;
        margin-left: 331px;
      }
    }

    .mine_info {
      margin-top: 91px;
      display: flex;
      flex-direction: column;
      align-items: center;

      .first_name {
        width: 223px;
        height: 223px;
        background: #f4f4f4;
        border: 5px solid #1f7ee5;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;

        span {
          font-size: 73px;
          font-family: Microsoft YaHei Regular;
          color: #181717;
          line-height: 11px;
          letter-spacing: 5px;
        }
      }

      .name {
        margin-top: 27px;

        span {
          font-size: 45px;
          font-family: Microsoft YaHei Regular;
          color: #ffffff;
          letter-spacing: 3px;
        }
      }

      .section {
        margin-top: 15px;

        span {
          font-size: 20px;
          font-family: Microsoft YaHei Regular;
          text-align: center;
          color: #ffffff;
          letter-spacing: 2px;
        }
      }
    }
  }

  .others {
    margin-top: 27px;

    .setting {
      height: 90px;
      width: 100%;
      display: flex;
      background-color: #FFFFFF;
      align-items: center;
      .setting_icon {
        width: 33px;
        height: 33px;
        margin-left: 23px;
        margin-right: 23px;
      }

      .setting_go {
        width: 15px;
        height: 25px;
        margin-left: 570px;
      }

      span {
        font-size: 30px;
        font-family: Microsoft YaHei Regular;
        color: #6a6a6a;
        letter-spacing: 2px;
      }
    }

    .about {
      height: 90px;
      width: 100%;
      display: flex;
      background-color: #FFFFFF;
      align-items: center;
      .about_icon {
        width: 33px;
        height: 33px;
        margin-left: 23px;
        margin-right: 23px;
      }

      .about_go {
        width: 15px;
        height: 25px;
        margin-left: 570px;
      }

      span {
        font-size: 30px;
        font-family: Microsoft YaHei Regular;
        color: #6a6a6a;
        letter-spacing: 2px;
      }
    }
  }
</style>
