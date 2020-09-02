<template>
  <div class="mission_div">
    <div class="content_main" v-if="active==0">
      <my-header title="正文内容" back="true" ref="header" backUrl=''></my-header>
      <div class="content_div">
        <div class="content">
          <div class="content_title">{{missionDetail.title}}</div>
          <div class="content_info">
            <span>署名作者：{{missionDetail.signature}}</span>
            <span>{{missionDetail.lastModifyTime}}</span>
          </div>
          <div class="content_detail" v-html="missionDetail.content"></div>
        </div>
        <div class="author_div">
          <span>作者：{{authorsStr}}</span>
          <span>编辑：{{editorsStr}}</span>
        </div>
        <div class="btn_div">
          <div @click="nextStep()" class="next_btn">
            <span>下一步</span>
          </div>
        </div>
      </div>
    </div>
    <div class="basic_div" v-if="active==1">
      <my-header title="基础信息" back="true" ref="header" backUrl='emit' @goBack='lastPage()'></my-header>
      <div class="basic">
        <div class="basic_title">
          <img src="../../assets/basic_info@2x.png" />
          <span>基础信息</span>
        </div>
        <div class="basic_info">
          <div class="basic_info_item">
            <span class="basic_info_name">渠道：</span>
            <span class="basic_info_value">{{missionDetail.channelName}}</span>
          </div>
          <div class="basic_info_item">
            <span class="basic_info_name">栏目：</span>
            <span class="basic_info_value">{{missionDetail.columnName}}</span>
          </div>
          <div class="basic_info_item">
            <span class="basic_info_name">作者：</span>
            <span class="basic_info_value">
              <span class="channel_author" v-for="(item,index) in missionDetail.authors">
                {{item}}
              </span>
            </span>
          </div>
          <div class="basic_info_item">
            <span class="basic_info_name">编辑：</span>
            <span class="basic_info_value">
              <span class="channel_author" v-for="(item,index) in missionDetail.editors">
                {{item}}
              </span>
            </span>
          </div>
          <div class="basic_info_item">
            <span class="basic_info_name" style="min-width: 75px;">责任编辑：</span>
            <span class="basic_info_value" style="margin-left: 20px;">{{missionDetail.signature}}</span>
          </div>
          <div class="basic_info_item">
            <span class="basic_info_name" style="min-width: 60px;">关键词：</span>
            <span class="basic_info_value">{{missionDetail.keyword}}</span>
          </div>
          <div class="basic_info_item">
            <span class="basic_info_name">摘要：</span>
            <span class="basic_info_value">{{missionDetail.summary}}</span>
          </div>
        </div>
      </div>
      <div class="channel">
        <div class="channel_title">
          <img src="../../assets/Channel_info@2x.png" />
          <span>渠道信息</span>
        </div>
        <div class="channel_info" v-if="basicInfoType==1">
          <div class="channel_info_item">
            <span class="channel_info_name" style="min-width: 60px;">上标题：</span>
            <span class="channel_info_value">{{missionDetail.channelProperty ? missionDetail.channelProperty.headerTitle:""}}</span>
          </div>
          <div class="channel_info_item">
            <span class="channel_info_name" style="min-width: 60px;">下标题：</span>
            <span class="channel_info_value">{{missionDetail.channelProperty ? missionDetail.channelProperty.footerTitle:""}}</span>
          </div>
          <div class="channel_info_item">
            <span class="channel_info_name">图片：</span>
            <span class="channel_info_img">
              <img src=""/>
            </span>
          </div>
          <div class="channel_info_item">
            <span class="channel_info_name">视频：</span>
            <span class="channel_info_video">
              <video src=""/>
            </span>
          </div>
          <div class="channel_info_item">
            <span class="channel_info_name">附件：</span>
            <span class="channel_info_attachment">
              <img style="width: 22px;height: 20px;" src="../../assets/folder@2x.png"/>
              <span></span>
            </span>

          </div>
        </div>
      </div>
      <div class="btn_div">
        <div class="reject_btn" @click="back(missionDetail.auditSeqNum)">
          退回
        </div>
        <div class="publish_btn" @click="publish()" v-if="missionDetail.auditTopPower==1">
          发布
        </div>
        <div class="pass_btn" @click="pass()">
          审核通过
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import MyHeader from '../views/header.vue'
  import {
    MissionDetail,
    MissionPublish,
    MissionPass
  } from '../../utils/request.js'
  import {
    Toast
  } from 'vant';
  export default {
    name: 'MissionDetail',
    components: {
      MyHeader
    },
    data() {
      return {
        active: 0,
        basicInfoType: 1,
        storyId: this.$route.params.storyId,
        auditId: this.$route.params.auditId,
        missionDetail: {}

      }
    },
    created() {
      if (!this.$route.params.storyId) {
        this.storyId = localStorage.getItem('storyId');
      }
      if (!this.$route.params.auditId) {
        this.auditId = localStorage.getItem('auditId')
      }
      this.getMissionDetail();
    },
    computed: {
      editorsStr: function() {
        if (this.missionDetail && this.missionDetail.editors) {
          return this.missionDetail.editors.join(',')
        }
        return "";
      },
      authorsStr: function() {
        if (this.missionDetail && this.missionDetail.authors) {
          return this.missionDetail.authors.join(',')
        }
        return "";
      }
    },
    methods: {
      lastPage(){
        this.active=0;
      },
      publish() {
        var _this = this;
        MissionPublish({
          storyId: this.storyId,
          auditId: this.auditId
        }).then(response => {
          if (response.code == 0) {
            Toast('发布成功');
            _this.$router.push('/Mission');
          } else {
            Toast(response.message);
            if (response.code == 401) {
              _this.$router.push('/Login')
            }
          }
        }).catch(err => {
          console.log(err)
        });
      },
      pass() {
        var _this = this;
        MissionPass({
          storyId: this.storyId,
          auditId: this.auditId
        }).then(response => {
          if (response.code == 0) {
            Toast('通过成功');
            _this.$router.push('/Mission');
          } else {
            Toast(response.message);
            if (response.code == 401) {
              _this.$router.push('/Login')
            }
          }
        }).catch(err => {
          console.log(err)
        });
      },
      getMissionDetail() {
        var _this = this;
        MissionDetail({
          storyId: this.storyId,
          auditId: this.auditId
        }).then(response => {
          if (response.code == 0) {
            _this.missionDetail = response.data;
          } else {
            Toast(response.message);
            if (response.code == 401) {
              _this.$router.push('/Login')
            }
          }
        }).catch(err => {
          console.log(err);
        })
      },
      nextStep() {
        this.active = 1;
      },
      back(auditSeqNum) {
        this.$router.push({
          name: 'MissionBack',
          params: {
            storyId: this.storyId,
            auditId: this.auditId,
            auditSeqNum: this.missionDetail.auditSeqNum
          }
        })
      }

    }
  }
</script>

<style scoped lang="less">
  @deep: ~'>>>';

  .mission_div {
    height: 100%;
    padding-top: 44px;

    .content_main {
      background: #FFFFFF;
      height: 100%;

      .content_div {
        height: 100%;

        .content {
          display: flex;
          flex-direction: column;
          padding-top: 22px;
          padding-left: 17px;
          max-width: 341px;
          width: 341px;

          .content_title {
            font-size: 16px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #3F3E3E;
            line-height: 25px;
          }

          .content_info {
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #BABABA;
            line-height: 20px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin-top: 19px;

            span {
              display: block;
            }
          }

          .content_detail {
            margin-top: 35px;
            font-size: 28px;
            font-family: Microsoft YaHei Regular;
            font-weight: 400;
            text-align: left;
            color: #666666;
            letter-spacing: 0px;

            @{deep} img {
              max-width: 100% !important;
              width: 100% !important;
            }

            @{deep} video {
              max-width: 100% !important;
              width: 100% !important;
            }

            @{deep} audio {
              max-width: 100% !important;
              width: 100% !important;
            }
          }
        }

        .author_div {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #BABABA;
          line-height: 20px;
          margin: 20px 17px 0px 17px;
          text-align: right;

          span {
            display: block;
            margin-bottom: 5px;
          }
        }

        .btn_div {
          width: 341px;
          height: 40px;
          background: #4783FE;
          border-radius: 10px;
          font-size: 15px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #FFFFFF;
          line-height: 40px;
          text-align: center;
          margin: 20px auto 23px;
        }
      }
    }

    .basic_div {
      .basic {
        padding-left: 14px;
        padding-top: 20px;
        background: #FFFFFF;
        width: 100%;
        min-height: 307px;

        .basic_title {
          height: 24px;
          margin-bottom: 19px;

          img {
            width: 24px;
            height: 24px;
            vertical-align: middle;
          }

          span {
            font-size: 18px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #3F3E3E;
            line-height: 24px;
            vertical-align: middle;
          }
        }

        .basic_info {
          display: flex;
          flex-direction: column;
          .basic_info_item{
            margin-bottom: 10px;
            display: flex;
            flex-direction: row;
            max-width: 273px;
            .basic_info_name{
              font-size: 15px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #939393;
              line-height: 28px;
              min-width: 45px;
            }
            .basic_info_value{
              font-size: 15px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #3F3E3E;
              line-height: 28px;
              margin-left: 50px;
              .channel_author{
                height: 28px;
                background: #4783FE;
                border-radius: 14px;
                padding: 4px 10px;

                font-size: 15px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #FFFFFF;
              }
            }
          }

        }
      }

      .channel {
        width: 100%;
        min-height: 371px;
        height: 371px;
        background: #FFFFFF;
        margin-top: 10px;
        padding-left: 14px;
        .channel_title {
          padding-bottom: 44px;
          padding-top: 20px;
          img {
            width: 20px;
            height: 20px;
            vertical-align: middle;
          }

          span {
            font-size: 18px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #3F3E3E;
            line-height: 25px;
            vertical-align: middle;
          }
        }

        .channel_info {

          .channel_info_item{
            margin-bottom: 10px;
            display: flex;
            flex-direction: row;
            max-width: 273px;
            .channel_info_name{
              font-size: 15px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #939393;
              line-height: 21px;
              min-width: 45px;
            }
            .channel_info_value{
              font-size: 15px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #3F3E3E;
              line-height: 21px;
              margin-left: 40px;
            }
            .channel_info_img{
              margin-left: 55px;
              img{
                width: 60px;
                height: 60px;
              }
            }
            .channel_info_video{
              margin-left: 55px;
              video{
                width: 60px;
                height: 60px;
              }
            }
            .channel_info_attachment{
              margin-left: 55px;
            }
          }
        }
      }

      .btn_div{
        background: #FFFFFF;
        margin-top: 10px;
        display: flex;
        flex-direction: row;

        div{
          height: 40px;
          border-radius: 10px;
          flex-grow: 1;
          font-size: 15px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #FFFFFF;
          line-height: 40px;
          margin: 20px 14px;
          text-align: center;
          justify-content: space-between;
        }
        .reject_btn{
          background: #E9021E;
        }
        .publish_btn{
          background: #72be1d;
        }
        .pass_btn{
          background: #4783FE;
        }
      }
    }
  }
</style>
