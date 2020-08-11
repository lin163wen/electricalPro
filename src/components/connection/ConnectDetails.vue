<template>
	<div>
    <!-- 'title','hasRight','back','parting','search','upload' -->
    <my-header title="联系人" back="true"></my-header>
    connectDetail
  </div>

</template>

<script>
import NavigateBar from '../views/navigateBar.vue'
import MyHeader from '../views/header.vue'
export default{
  name:'ConnectDetails',
  components:{MyHeader}
}
</script>

<style>
</style>
