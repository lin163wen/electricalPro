<template>
  <div style="height: 100%;">
    <!-- 'title','hasRight','back','parting','search','upload' -->
    <my-header title="退回" back="true" ref="header" backUrl='/MissionDetail'></my-header>
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
            <li v-for="(item, index) in options" :key="index" @click.stop="choose(item)">{{item.text}}</li>
          </ul>
        </div>
      </div>
      <div class="mission_back_text">回退理由</div>
      <textarea id='reason' class="mission_back_textarea"></textarea>
      <span class="text_length">{{textLength}}<span>/200</span></span>
    </div>
  </div>

</template>

<script>
  import {
    DropdownMenu,
    DropdownItem
  } from 'vant';
  import MyHeader from '../views/header.vue'
  import MySelector from '../views/selector.vue'
  export default {
    name: 'MissionDetail',
    components: {
      MyHeader,
      MySelector
    },
    data() {
      return {
        value1: 0,
        textLength: 0,
        options: [{
            text: '草稿1',
            value: 0
          },
          {
            text: '草稿2',
            value: 1
          },
          {
            text: '草稿3',
            value: 2
          },
        ],
        showOptions: false,
        selectedText: '',
        selectedValue: '',
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
    created() {},
    methods: {
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

  .mission_back {
    display: flex;
    flex-direction: column;
    text-align: left;
    padding-left: 50px;
    padding-top: 100px;

    .select {
      width: 632px;
      height: 96px;
      margin-top: 15px;
      margin-bottom: 30px;
      .inner {
        position: relative;
        margin: 0 auto;
        width: 632px;
        height: 100%;
        font-size: 26px;
        font-family: Microsoft YaHei Regular;
        font-weight: 400;
        text-align: left;
        color: #96999a;
        letter-spacing: 1px;

        .inputWrapper {
          width: 632px;
          height: 100%;
          /* background: url(../../assets/reject_selector@2x.png) right center no-repeat;
          background-size: 32px 28px; */
          >input {
            width: 595px;
            height: 100%;
            border: 2px solid #d1d1d1;
            background: #f4f4f4;
            padding-left: 29px;
            border: none;
            cursor: pointer;
          }

          .iconfont {
            width: 32px;
            height: 28px;
            background: url(../../assets/reject_selector@2x.png) right center no-repeat;
            background-size: 32px 28px;
            position: absolute;
            top:34px;
            right:28px;
          }
        }

        >.options {
          width: 623px;
          position: absolute;
          right: 10px;
          padding: 10px 0;
          background-color: #fff;
          box-shadow: 0 0 4px #ddd;
          border-radius: 3px;
          overflow: auto;

          >li {
            font-size: 26px;
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
      font-size: 30px;
      font-family: Microsoft YaHei Regular;
      font-weight: 400;
      text-align: left;
      color: #333333;
      letter-spacing: 1px;
      margin-bottom: 15px;
    }

    .mission_back_textarea {
      width: 632px;
      height: 459px;
      max-width: 632px;
      max-height: 459px;
      font-size: 32px;
      font-family: Microsoft YaHei Regular;
    }
    .text_length{
      font-size: 25px;
      font-family: Microsoft YaHei Regular;
      font-weight: 400;
      text-align: left;
      color: #a7aaab;
      letter-spacing: 1px;
      position: absolute;
      right: 83px;
      top:880px;
    }
  }
</style>
