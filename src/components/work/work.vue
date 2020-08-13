<template>
	<div>
		<!-- 'title','hasRight','back','parting','search','upload' -->
		<my-header title="工作"></my-header>
		<div class="work">
			<div class="material" @click="material()"><span>素材</span></div>
			<div class="audit" @click="audit()"><span>审稿</span></div>
		</div>
		<navigate-bar></navigate-bar>
	</div>

</template>

<script>
	import NavigateBar from '../views/navigateBar.vue'
	import MyHeader from '../views/header.vue'
	export default {
		name: 'Work',
		components: {
			NavigateBar,
			MyHeader
		},
		methods: {
			material() {
				this.$router.push('/Material')
			},
			audit() {
				this.$router.push('/Audit')
			}
		}
	}
</script>

<style scoped lang="less">
	.work {
		padding-top: 243px;
		padding-left: 26px;
		.material {
			width: 700px;
			height: 248px;
			background: url(../../assets/material@2x.png) no-repeat center center;
			background-size: 100% 100%;
			margin-bottom: 67px;
			text-align: center;
			span {
				font-size: 40px;
				font-family: Microsoft YaHei Regular;
				font-weight: 400;
				color: #ffffff;
				letter-spacing: 3px;
				line-height: 248px;
			}
		}
		.audit {
			width: 700px;
			height: 248px;
			background: url(../../assets/audit@2x.png) no-repeat center center;
			background-size: 100% 100%;
			text-align: center;
			span {
				font-size: 40px;
				font-family: Microsoft YaHei Regular;
				font-weight: 400;
				color: #ffffff;
				letter-spacing: 3px;
				line-height: 248px;
			}
		}
	}
</style>