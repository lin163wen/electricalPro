<template>
	<div style="height: 100%;">
    <!-- 'title','hasRight','back','parting','search','upload' -->
    <my-header title="稿件详情" back="true" ref="header" backUrl='/Mission'></my-header>
    <van-tabs v-model="active" color="#ffaf6f">
      <van-tab title="正文内容">
        <div class="content_div">
          <div class="content">
            <div class="content_title">新闻标题</div>
            <div class="content_info">
              <span>署名作者</span>
              <span style="margin-left: 72px;">2020-02-02 22:22</span>
            </div>
            <div class="content_detail">内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容</div>
          </div>
          <div class="author_div">
            <span>署名作者</span>
            <span>作者:名字名字</span>
            <span>编辑:名字名字</span>
          </div>
          <div class="btn_div">
            <div @click="nextStep()" class="next_btn">
              <span>下一步</span>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="基础信息" color="#ffaf6f">
        <div class="basic_div">
          <div class="basic">
              <div class="basic_title">
                <span>基础信息</span>
              </div>
              <div class="basic_info">
                <ul class="basic_name">
                  <li>渠道</li>
                  <li>栏目</li>
                  <li>作者</li>
                  <li>编辑</li>
                  <li>责任编辑</li>
                  <li>关键词</li>
                  <li>再要</li>
                </ul>
                <ul class="basic_value">
                  <li>渠道名称</li>
                  <li>名称</li>
                  <li>钱嘉琛<img src="../../assets/basic_icon@2x.png" /> 钱嘉诚<img src="../../assets/basic_icon@2x.png" /></li>
                  <li>钱嘉琛<img src="../../assets/basic_icon@2x.png" /> 钱嘉诚<img src="../../assets/basic_icon@2x.png" /></li>
                  <li>阿巴阿巴</li>
                  <li>暴富、发财、富婆</li>
                  <li></li>
                </ul>
              </div>

              <div class="channel_title">
                <span>渠道信息</span>
              </div>
              <div class="basic_info" v-if="basicInfoType==1">
                <ul class="basic_name">
                  <li>上标题</li>
                  <li>下标题</li>
                </ul>
                <ul class="basic_value">
                  <li>我是上标题</li>
                  <li>我是下标题</li>
                </ul>
              </div>
              <div class="basic_info" v-if="basicInfoType==2">
                <ul class="basic_name">
                  <li>附件<img src="../../assets/accessory@2x.png" /></li>
                </ul>
                <ul class="basic_value">
                  <li>附件名称</li>
                </ul>
              </div>
              <div class="basic_info" v-if="basicInfoType==3">
                <ul class="basic_name">
                  <li>视频</li>
                </ul>
                <ul class="basic_value">
                  <li><video/></li>
                </ul>
              </div>
          </div>

          <div class="btn_div">
            <div class="publish_btn">
              <span>发布</span>
            </div>
            <div class="pass_btn">
              <span>审核通过</span>
            </div>
            <div class="reject_btn" @click="back()">
              <span>退回</span>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>

</template>

<script>
import MyHeader from '../views/header.vue'
export default{
  name:'MissionDetail',
  components:{MyHeader},
  data(){
    return{
      active:1,
      basicInfoType:2
    }
  },
  methods:{
    nextStep(){
      this.active=1;
    },
    back(){
      this.$router.push('/MissionBack')
    }
  }
}
</script>

<style scoped lang="less">
  .content_div{

    .content{
      display: flex;
      flex-direction: column;
      margin-top: 12px;
      padding-left: 31px;
      min-height: 700px;
      max-width: 690px;
      .content_title{
        font-size: 30px;
        font-family: Microsoft YaHei Regular;
        font-weight: 400;
        text-align: left;
        color: #333333;
        letter-spacing: 1px;
      }
      .content_info{
        margin-top: 35px;
        font-size: 24px;
        font-family: Microsoft YaHei Regular;
        font-weight: 400;
        text-align: left;
        color: #999999;
        letter-spacing: 0px;
      }
      .content_detail{
        margin-top: 35px;
        font-size: 28px;
        font-family: Microsoft YaHei Regular;
        font-weight: 400;
        text-align: left;
        color: #666666;
        letter-spacing: 0px;
      }
      /* .btn_div{
        display: flex;
        position: absolute;
        bottom: 30px;
      } */
    }
    .author_div{
      height: 287px;
      font-size: 24px;
      font-family: Microsoft YaHei Regular;
      font-weight: 400;
      text-align: left;
      color: #999999;
      letter-spacing: 0px;
      background-color: #f4f4f4;
      padding-top: 47px;
      span{
        display: block;
        margin-bottom: 27px;
        margin-left: 31px;
      }
    }
    .btn_div{
      background-color: #e5e5e5;
      padding-top:12px ;
      .next_btn{
        margin-left: 106px;
        width: 539px;
        height: 99px;
        background-image: url(../../assets/next_btn@2x.png);
        background-size: 100% auto;
        font-size: 36px;
        font-family: Microsoft YaHei Regular;
        font-weight: 400;
        color: #ffffff;
        letter-spacing: 1px;
        text-align: center;
        span{
          line-height: 83px;
        }
      }
    }
  }
  .basic_div{
    height: 1003px;
    .basic{
      margin-top: 12px;
      padding-left: 21px;
      padding-top: 2px;
      .basic_title{
        height: 65px;
        line-height: 65px;
        font-size: 30px;
        font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
        font-weight: 400;
        text-align: left;
        color: #333333;
        letter-spacing: 1px;
        background-image: url(../../assets/basic_title@2x.png);
        background-size: auto 100%;
        background-repeat: no-repeat;
        span{
          margin-left: 43px;
        }
      }
      .basic_info{
        display: flex;
        flex-direction: row;
        margin-left: 46px;
        margin-top: 35px;
        .basic_name{
          font-size: 26px;
          font-family: Microsoft YaHei Bold-Bold;
          font-weight: 700;
          color: #333333;
          letter-spacing: 1px;
          li{
            margin-bottom: 25px;
            text-align: right;
            img{
              width: 36px;
              height: 36px;
              margin-left: 15px;
            }
          }
        }
        .basic_value{
          margin-left: 80px;
          font-size: 26px;
          font-family: Microsoft YaHei Bold;
          font-weight: 400;
          color: #333333;
          letter-spacing: 1px;
          li{
            margin-bottom: 25px;
            img{
              width: 28px;
              height: 28px;
              margin-left: 10px;
            }
          }
        }
      }
      .channel_title{
        margin-top: 145px;
        height: 65px;
        line-height: 65px;
        font-size: 30px;
        font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
        font-weight: 400;
        text-align: left;
        color: #333333;
        letter-spacing: 1px;
        background-image: url(../../assets/basic_title@2x.png);
        background-size: auto 100%;
        background-repeat: no-repeat;
        span{
          margin-left: 43px;
        }
      }
    }
    .btn_div{
      background-color: #e5e5e5;
      padding-top:12px ;
      font-size: 33px;
      font-family: Microsoft YaHei Regular;
      font-weight: 400;
      color: #ffffff;
      letter-spacing: 1px;
      display: flex;
      margin-top: 147px;
      .publish_btn{
        margin-left: 20px;
        margin-top: 8px;
        background-image: url(../../assets/publish@2x.png);
        background-size: 100% auto;
        width: 189px;
        height: 81px;
        text-align: center;
        span{
          line-height: 68px;
        }
      }
      .pass_btn{
        background-image: url(../../assets/pass@2x.png);
        background-size: 100% auto;
        width: 326px;
        height: 99px;
        text-align: center;
        span{
          line-height: 83px;
        }
      }
      .reject_btn{
        margin-top: 8px;
        background-image: url(../../assets/reject@2x.png);
        background-size: 100% auto;
        width: 189px;
        height: 81px;
        text-align: center;
        span{
          line-height: 68px;
        }
      }
    }
  }
</style>
