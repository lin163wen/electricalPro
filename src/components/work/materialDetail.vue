<template>

	<div>
		<my-header title="素材" back="true" backUrl=""></my-header>
		<div class="material">
			<div class="material_content">
				<video></video>
			</div>
			<div class="material_info">
				<ul class="basic_name">
					<li>标题</li>
					<li>ID</li>
					<li>大小</li>
					<li>尺寸</li>
					<li>上传人</li>
					<li>上传时间</li>
					<li>来源</li>
					<li>描述</li>
				</ul>
				<ul class="basic_value">
					<li>稿件标题稿件标题稿件标题稿件标题稿件标题稿件标题</li>
					<li>名称</li>
					<li>xxxx</li>
					<li>xxxxx</li>
					<li>xxxxx</li>
					<li></li>
					<li></li>
					<li></li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import MyHeader from '../views/header.vue'
	export default {
		name: 'MaterialDetail',
		components: {
			MyHeader
		},
		data() {
			return {}
		},
		methods: {}
	}
</script>

<style scoped lang="less">
	.material {
		margin-top: 19px;
		margin-left: 14px;
		.material_content {
			width: 722px;
			height: 472px;
			background: #b4c4d5;
			video {
				width: 100%;
				height: 100%;
			}
		}
		.material_info {
			display: flex;
			flex-direction: row;
			margin-left: 46px;
			margin-top: 45px;
			min-height: 701px;
			max-width: 633px;
			.basic_name {
				font-size: 26px;
				font-family: Microsoft YaHei Bold-Bold;
				font-weight: 700;
				color: #333333;
				letter-spacing: 1px;
				li {
					margin-bottom: 35px;
					text-align: right;
					img {
						width: 36px;
						height: 36px;
						margin-left: 15px;
					}
				}
			}
			.basic_value {
				margin-left: 80px;
				font-size: 25px;
				font-family: Microsoft YaHei Bold;
				font-weight: 400;
				color: #333333;
				letter-spacing: 1px;
				li {
					margin-bottom: 35px;
					img {
						width: 28px;
						height: 28px;
						margin-left: 10px;
					}
				}
			}
		}
	}
</style>