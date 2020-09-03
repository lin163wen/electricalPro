<template>

	<div>
		<my-header title="素材" back="true" backUrl=""></my-header>
		<div class="material">
			<div class="material_content">
				<img :src="materialDetail.accessUrl" style="width: 100%;height: 100%;" v-if="common.materialType==3"  @click="showPreview=!showPreview"/>
				<video :src="materialDetail.accessUrl" controls="controls" style="width: 100%;height: 100%;" v-if="common.materialType==1 || common.materialType==2"></video>
			</div>
      <div class="material_info">
        <div class="material_item">
          <div class="basic_name">标题</div>
          <div class="basic_value">{{materialDetail.objKey}}</div>
        </div>
        <div class="material_item">
          <div class="basic_name">ID</div>
          <div class="basic_value">{{materialDetail.id}}</div>
        </div>
        <div class="material_item">
          <div class="basic_name">大小</div>
          <div class="basic_value">{{materialDetail.size}}</div>
        </div>
        <div class="material_item">
          <div class="basic_name">尺寸</div>
          <div class="basic_value">{{materialDetail.dpi}}</div>
        </div>
        <div class="material_item">
          <div class="basic_name">上传人</div>
          <div class="basic_value">{{materialDetail.userName}}</div>
        </div>
        <div class="material_item">
          <div class="basic_name">上传时间</div>
          <div class="basic_value">{{materialDetail.updateTime}}</div>
        </div>
        <div class="material_item">
          <div class="basic_name">来源</div>
          <div class="basic_value">{{materialDetail.source}}</div>
        </div>
        <div class="material_item">
          <div class="basic_name">描述</div>
          <div class="basic_value">{{materialDetail.remark}}</div>
        </div>
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
              if(response.code=401){
                _this.$router.push('/')
              }
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
		margin-top: 63px;
		margin-left: 16px;
		.material_content {
			width: 343px;
      height: 200px;
			background: #FFFFFF;
			video {
				width: 100%;
				height: 100%;
			}
		}
		.material_info {
      display: flex;
      flex-direction: column;
      margin-top: 45px;
      .material_item{
        display: flex;
        flex-direction: row;
        margin-bottom: 20px;
        .basic_name {
        	font-size: 15px;
        	font-family: PingFangSC-Regular, PingFang SC;
        	font-weight: 400;
        	color: #939393;
        	line-height: 28px;
        	min-width: 60px;
        }
        .basic_value {
        	margin-left: 40px;
        	font-size: 12px;
        	font-family: Microsoft YaHei Bold;
        	font-weight: 400;
        	color: #333333;
        	letter-spacing: 1px;
        	max-width: 200px;
          line-height: 28px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
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
