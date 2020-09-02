<template>
  <div class="reject_div">
    <!-- 'title','hasRight','back','parting','search','upload' -->
    <my-header title="退回" back="true" ref="header" backUrl='MissionDetail'></my-header>
    <div class="mission_back">
      <div class="mission_back_text"><span style="color: #ff4545;">*</span>退回节点</div>
      <div class="select">
        <div class="inner">
          <div class="inputWrapper" @click.stop="showOptions = !showOptions">
            <input type="text" readonly placeholder="请选择" :value="selectedText">
            <!-- <img src="../../assets/reject_selector@2x.png" class="iconfont"/> -->
            <div class="iconfont"></div>
          </div>
          <ul class="options" v-show="showOptions">
            <li v-for="(item, index) in auditSeqNums" :key="index" :value="item.value" @click.stop="choose(item)">{{item.text}}</li>
          </ul>
        </div>
      </div>
      <div class="mission_back_text">回退理由</div>
      <textarea id='reason' class="mission_back_textarea"></textarea>
      <div class="text_length">{{textLength}}<span>/200</span></div>
    </div>
    <div class="btn_div">
      <div class="cancel_btn" @click="cancel()">
        取消
      </div>
      <div class="reject_btn" @click="reject()">
        退回
      </div>
    </div>
  </div>

</template>

<script>
  import {
    DropdownMenu,
    DropdownItem
  } from 'vant';
  import MyHeader from '../views/header.vue'
  import {
    MissionReject
  } from '../../utils/request.js'
  import {
    Toast
  } from 'vant';
  export default {
    name: 'MissionBack',
    components: {
      MyHeader
    },
    data() {
      return {
        value1: 0,
        textLength: 0,
        showOptions: false,
        selectedText: '',
        selectedValue: '',
        storyId: this.$route.params.storyId,
        auditId: this.$route.params.auditId,
        auditSeqNum: this.$route.params.auditSeqNum,
        auditSeqNums: [],
        params: {
          storyId: this.storyId,
          auditId: this.auditId
        }
      }
    },
    mounted() {
      var _this = this;
      $("#reason").on("input propertychange", function() {
        console.log(11111)
        var $this = $(this),
          _val = $this.val(),
          count = "";
        if (_val.length > 200) {
          $this.val(_val.substring(0, 200));
        }
        count = $this.val().length;
        _this.textLength = count;
      });
      let that = this
      document.addEventListener('click', function() {
        that.showOptions = false
      })
    },
    created() {
      this.auditSeqNums = this.createSeqNums();
    },
    methods: {
      createSeqNums() {
        var arr = []
        for (var i = 0; i < this.auditSeqNum; i++) {
          if (i == 0) {
            arr.push({
              value: 0,
              text: '草稿'
            })
          } else {
            arr.push({
              value: i,
              text: '节点' + i
            });
          }
        }
        if (this.auditSeqNum == 0) {
          arr.push({
            value: 0,
            text: '草稿'
          })
        }
        return arr;
      },
      cancel() {
        this.$router.push({
          name: 'MissionDetail',
          params: {
            storyId: this.storyId,
            auditId: this.auditId
          }
        })
      },
      reject() {
        var _this = this;
        console.log(this.selectedValue);
        if (this.selectedValue === '') {
          Toast('请选择退回节点');
          return;
        }
        MissionReject({
          storyId: this.storyId,
          auditId: this.auditId,
          seqNum: this.selectedValue
        }).then(response => {
          if (response.code == 0) {
            Toast('回退成功');
            _this.$router.push('/Mission');
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
      choose(item) {
        this.showOptions = false
        if (item.value !== this.selected) {
          this.selectedText = item.text;
          this.selectedValue = item.value;
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .ul,
  ol,
  li {
    list-style: none;
  }

  .reject_div {
    padding: 44px 0 0;
    background: #FFFFFF;
    height: 100%;
    .mission_back {
      display: flex;
      flex-direction: column;
      text-align: left;
      padding-left: 14px;
      padding-top: 50px;

      .select {
        width: 330px;
        height: 48px;
        margin-top: 15px;
        margin-bottom: 30px;

        .inner {
          position: relative;
          margin: 0 auto;
          width: 330px;
          height: 100%;
          font-size: 13px;
          font-family: Microsoft YaHei Regular;
          font-weight: 400;
          text-align: left;
          color: #96999a;
          letter-spacing: 1px;

          .inputWrapper {
            width: 330px;
            height: 100%;

            /* background: url(../../assets/reject_selector@2x.png) right center no-repeat;
          background-size: 32px 28px; */
            >input {
              width: 330px;
              height: 100%;
              border: 2px solid #d1d1d1;
              background: #f4f4f4;
              padding-left: 29px;
              cursor: pointer;
            }

            .iconfont {
              width: 16px;
              height: 14px;
              background: url(../../assets/reject_selector@2x.png) right center no-repeat;
              background-size: 16px 14px;
              position: absolute;
              top: 19px;
              right: 10px;
            }
          }

          >.options {
            width: 330px;
            position: absolute;
            background-color: #fff;
            box-shadow: 0 0 4px #ddd;
            border-radius: 3px;
            overflow: auto;
            border: 2px solid #d1d1d1;
            border-top: none;

            >li {
              font-size: 13px;
              font-family: Microsoft YaHei Regular;
              font-weight: 400;
              text-align: left;
              color: #96999a;
              padding: 20px 0px;
              cursor: pointer;
              margin-left: 29px;

              &:hover {
                background-color: #eee;
              }
            }
          }
        }
      }

      .mission_back_text {
        font-size: 15px;
        font-family: Microsoft YaHei Regular;
        font-weight: 400;
        text-align: left;
        color: #333333;
        letter-spacing: 1px;
        margin-bottom: 15px;
      }

      .mission_back_textarea {
        width: 330px;
        height: 250px;
        max-width: 332px;
        max-height: 250px;
        font-size: 16px;
        font-family: Microsoft YaHei Regular;
        background: #f4f4f4;
        border: 2px solid #d1d1d1;
      }

      .text_length {
        text-align: right;
        width: 334px;
        font-size: 12px;
        font-family: Microsoft YaHei Regular;
        font-weight: 400;
        color: #a7aaab;
        letter-spacing: 1px;
      }
    }

    .btn_div {
      background: #FFFFFF;
      margin-top: 10px;
      display: flex;
      flex-direction: row;
      position: absolute;
      bottom: 0;
      width: 100%;
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

      .cancel_btn {
        background: #4783FE;
      }

      .reject_btn {
        background: #E9021E;
      }
    }
  }
</style>
