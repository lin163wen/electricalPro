<template>
	<div>
    <!-- 'title','hasRight','back','parting','search','upload' -->
    <my-header title="全部联系人" back="true"></my-header>
    All connection
  </div>

</template>

<script>
import NavigateBar from '../views/navigateBar.vue'
import MyHeader from '../views/header.vue'
export default{
  name:'ConnectAll',
  components:{NavigateBar,MyHeader}
}
</script>

<style>
</style>
