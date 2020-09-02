<template>
    <select class="cs-select">
      <option value="" disabled selected>Choose your option</option>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
      <option value="3">Option 3</option>
    </select>
</template>

<script>
  export default {
    name: 'MySelector'
  }
</script>

<style scoped lang="less">
  .cs-select {
    background: transparent;
    font-size: 15px;
    display: inline-block;
    vertical-align: middle;
    position: relative;
    text-align: left;
    z-index: 100;
    width: 100%;
    user-select: none;

  }

  div.cs-select {}
</style>
