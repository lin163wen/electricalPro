<template>
  <div style="height: 100%;">
    <!-- 'title','hasRight','back','parting','search','upload' -->
    <my-header title="退回" back="true" ref="header" backUrl='/MissionDetail'></my-header>
    <div class="mission_back">
      <div class="mission_back_text">退回节点</div>
      <select>
        <option value="1">草稿1</option>
        <option value="2">草稿2</option>
        <option value="3">草稿3</option>
      </select>

      <div class="mission_back_text">回退理由</div>
      <textarea class="mission_back_textarea"></textarea>
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
  export default {
    name: 'MissionDetail',
    components: {
      MyHeader
    },
    data() {
      return {
        value1: 0,
        textLength: 0,
        option1: [{
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
        ]
      }
    },
    methods: {}
  }
</script>

<style scoped lang="less">
  .mission_back {
    display: flex;
    flex-direction: column;
    text-align: left;
    padding-left: 50px;
    padding-top: 100px;
    .mission_back_text {
      font-size: 24px;
      font-weight: 800;
    }
  }
</style>
