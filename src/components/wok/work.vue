<template>
	<div>
    <!-- 'title','hasRight','back','parting','search','upload' -->
    <my-header title="工作"></my-header>
    <div>素材</div>
    <div>审稿</div>
    <navigate-bar></navigate-bar>
  </div>

</template>

<script>
import NavigateBar from '../views/navigateBar.vue'
import MyHeader from '../views/header.vue'
export default{
  name:'Work',
  components:{NavigateBar,MyHeader}
}
</script>

<style>
</style>
