<template>
	<div>
		<!-- 'title','hasRight','back','parting','search','upload' -->
		<my-header title="分类" back="true" backUrl="/Material"></my-header>
		<div class="material_content">
			<van-cell title="单元格" is-link />
			<van-cell title="单元格" is-link />
			<van-cell title="单元格" is-link />
			<van-cell title="单元格" is-link />
		</div>
	</div>

</template>

<script>
	import NavigateBar from '../views/navigateBar.vue'
	import MyHeader from '../views/header.vue'
	export default {
		name: 'Parting',
		components: {
			MyHeader
		},
		data() {
			return {}
		},
		methods: {
			parting() {
				this.$router.push('/Material?headerTitle=分类1')
			}
		}
	}
</script>

<style scoped lang="less">
	.material_content {
		margin-top: 8px;
		height: 1215px;
		background: #f4f4f4 !important;
	}
</style>