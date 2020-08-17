<template>

	<div>
		<my-header title="素材" back="true" backUrl=""></my-header>
		<div class="material">
			<div class="material_content" @click="showPreview=!showPreview">
				<img :src="materialDetail.accessUrl" style="width: 100%;height: 100%;" v-if="common.materialType==3" />
				<video :src="materialDetail.accessUrl" style="width: 100%;height: 100%;" v-if="common.materialType==1 || common.materialType==2"></video>
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
					<li>{{materialDetail.objKey}}</li>
					<li>{{materialDetail.id}}</li>
					<li>{{materialDetail.size}}</li>
					<li>{{materialDetail.dpi}}</li>
					<li>{{materialDetail.userName}}</li>
					<li>{{materialDetail.updateTime}}</li>
					<li>{{materialDetail.source}}</li>
					<li>{{materialDetail.remark}}</li>
				</ul>
			</div>
		</div>
		<div class="preview" v-if="showPreview" @click="showPreview=!showPreview">
			<div class="preview_img">
				<img :src="materialDetail.accessUrl" />
			</div>
			<div class="preview_mask"></div>

		</div>
	</div>
</template>

<script>
	import MyHeader from '../views/header.vue'
	import { ImageDetail, VideoDetail, AudiosDetail } from '../../utils/request.js'
	import { Toast } from 'vant';
	export default {
		name: 'MaterialDetail',
		components: {
			MyHeader
		},
		data() {
			return {
				materialDetail: {},
				showPreview: false
			}
		},
		created() {
			this.queryDetail();
		},
		methods: {
			queryDetail() {
				if(!this.$route.params.id) {
					Toast('参数id非法');
					return;
				}
				var id = this.$route.params.id;
				console.log(id, this.common.materialType);
				if(this.common.materialType == 1) { //audio
					this.detail(AudiosDetail({
						id: id
					}))
				} else if(this.common.materialType == 2) { //video
					this.detail(VideoDetail({
						id: id
					}))
				} else if(this.common.materialType == 3) { //image
					this.detail(ImageDetail({
						id: id
					}))
				}
			},
			detail(queryFuc) {
				var _this = this;
				queryFuc.then(response => {
						console.log(response)
						if(response.code == 0) {
							_this.materialDetail = response.data;
						} else {
							Toast(response.message);
						}
					})
					.catch(err => {
						console.log(err);
					})
			}
		}
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
					min-width: 110px;
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
				max-width: 480px;
				li {
					//margin-bottom: 35px;
					height: 70px;
					word-wrap: break-word;
					word-break: normal;
					img {
						width: 28px;
						height: 28px;
						margin-left: 10px;
					}
				}
			}
		}
	}
	
	.preview {
		height: 100%;
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		.preview_img {
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 100%;
			height: 472px;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.preview_mask {
			background: rgba(0, 0, 0, 0.9);
			width: 100%;
			height: 100%;
		}
	}
</style>