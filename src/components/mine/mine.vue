<template>
	<div>
    <!-- 'title','hasRight','back','parting','search','upload' -->
    <my-header title="任务"></my-header>
    This is mine
    <navigate-bar></navigate-bar>
  </div>

</template>

<script>
import NavigateBar from '../views/navigateBar.vue'
import MyHeader from '../views/header.vue'
export default{
  name:'Mine',
  components:{NavigateBar,MyHeader}
}
</script>

<style>
</style>
