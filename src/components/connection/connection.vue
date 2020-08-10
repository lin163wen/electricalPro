<template>
	<div>
    <!-- 'title','hasRight','back','parting','search','upload' -->
    <my-header title="通讯录"></my-header>
    This is connection
    <navigate-bar></navigate-bar>
  </div>

</template>

<script>
import NavigateBar from '../views/navigateBar.vue'
import MyHeader from '../views/header.vue'
export default{
  name:'Connection',
  components:{NavigateBar,MyHeader}
}
</script>

<style>
</style>
