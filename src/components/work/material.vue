<template>
	<div>
		<!-- 'title','hasRight','back','parting','search','upload' -->
		<my-header :title="headerTitle" back="true" hasRight="true" parting="true" search="true" backUrl="/Work"></my-header>
		<div class="material_content">
			<van-tabs v-model="active" color="#ffaf6f">
				<van-tab title="图片">
					<div class="picture">
						<van-uploader v-model="imagesList" :after-read="afterRead" />
					</div>
				</van-tab>
				<van-tab title="视频">
					<div class="video">
					</div>
				</van-tab>
				<van-tab title="音频">
					<div class="audio">
					</div>
				</van-tab>
			</van-tabs>
		</div>
		<div @click="upload()" class="upload_div">
			<div class="upload_btn">
				<span>上传素材</span>
			</div>
		</div>
	</div>

</template>

<script>
	import MyHeader from '../views/header.vue'
	export default {
		name: 'Material',
		components: {
			MyHeader
		},
		data() {
			return {
				active: 0,
				headerTitle: '',
				imagesList: [{
						url: 'https://img.yzcdn.cn/vant/leaf.jpg',
						status: 'uploading',
						message: '上传中...',
					},
					{
						url: 'https://img.yzcdn.cn/vant/tree.jpg',
						status: 'failed',
						message: '上传失败',
					},
				]
			}
		},
		created() {
			var titlePre = this.$route.query.headerTitle;
			if(titlePre) {
				this.headerTitle = titlePre + this.headerTitle;
			} else {
				this.headerTitle = '素材'
			}

		},
		methods: {
			materialDetail() {
				console.log(11111);
				this.$router.push('/MaterialDetail');
			},
			upload() {
				this.$router.push('/Upload')
			}
		}
	}
</script>

<style scoped lang="less">
	.picture {
		margin-top: 17px;
		margin-left: 16px;
		min-height: 1003px;
	}
	
	.upload_div {
		width: 100%;
		height: 112px;
		position: absolute;
		bottom: 0;
		background: #e5e5e5;
		.upload_btn {
			width: 539px;
			height: 99px;
			margin-top: 12px;
			margin-left: 106px;
			background: url(../../assets/upload_btn@2x.png) no-repeat;
			background-size: 100% 100%;
			text-align:center;
			span {
				font-size: 33px;
				font-family: Microsoft YaHei Regular;
				color: #ffffff;
				line-height: 99px;
				letter-spacing: 1px;
			}
		}
	}
</style>