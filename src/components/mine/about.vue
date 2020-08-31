<template>
	<div class="about_div">
		<!-- 'title','hasRight','back','parting','search','upload' -->
		<my-header title="关于" back="true"></my-header>
	</div>

</template>

<script>
	import MyHeader from '../views/header.vue'
	export default {
		name: 'About',
		components: {
			MyHeader
		}
	}
</script>

<style>
	.about_div{
		height: 100%;
		padding: 111px 0 0;
		box-sizing: border-box;
	}
</style>