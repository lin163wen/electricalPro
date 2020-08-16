<template>
	<div>
		<!-- 'title','hasRight','back','parting','search','upload' -->
		<my-header :title="partingTitle" back="true" hasRight="true" parting="true" search="true" backUrl="/Work"></my-header>
		<div class="material_content">
			<van-tabs v-model="active" color="#ffaf6f">
				<van-tab title="图片">
					<div class="picture">
						<van-list class="list" style="display: flex;flex-direction: row;flex-wrap: wrap;" 
							v-model="loading" :finished="finished" finished-text="没有更多了" @load="queryImages()">
							<div class="list_item" v-for="(item,index) in list" @click="goDetail(item)">
								<em class="item_mask"><span>{{item.status}}</span></em>
								<img :src="item.accessUrl" />
							</div>
						</van-list>
					</div>
				</van-tab>
				<van-tab title="视频">
					<div class="video">
						<van-list class="list" style="display: flex;flex-direction: row;flex-wrap: wrap;" 
							v-model="loading" :finished="finished" finished-text="没有更多了" @load="queryVideos()">
							<div class="list_item" v-for="(item,index) in list" @click="goDetail(item)">
								<em class="item_mask"><span>{{item.status}}</span></em>
								<img :src="item.accessUrl" />
							</div>
						</van-list>
					</div>
				</van-tab>
				<van-tab title="音频">
					<div class="audio">
						<van-list class="list" style="display: flex;flex-direction: row;flex-wrap: wrap;" 
							v-model="loading" :finished="finished" finished-text="没有更多了" @load="queryAudio()">
							<div class="list_item" v-for="(item,index) in list" @click="goDetail(item)">
								<em class="item_mask"><span>{{item.status}}</span></em>
								<img :src="item.accessUrl" />
							</div>
						</van-list>
					</div>
				</van-tab>
			</van-tabs>
		</div>
		<div @click="upload()" class="upload_div" v-if="curCagetory==2">
			<div class="upload_btn">
				<span>上传素材</span>
			</div>
		</div>
		<div :class="cagetoryClass" @click="changeCagetory()"></div>
	</div>

</template>

<script>
	import MyHeader from '../views/header.vue'
	import { OfficialImages, PrivateImages, PublicImages,
		OfficialVideos, PrivateVideos, PublicVideos,
		OfficialAudios, PrivateAudios, PublicAudios } from '../../utils/request.js'
	import { Toast } from 'vant';
	export default {
		name: 'Material',
		components: {
			MyHeader
		},
		data() {
			return {
				active: 0,
				pageSize: 20,
				partingTitle: this.common.parting.value ? this.common.parting.value : '素材',
				partingCode: this.common.parting.code ? this.common.parting.code : 0,
				curCagetory: 2,
				list: [],
				loading: false,
				finished: false,
				pageNum: 1,
			}
		},
		watch: {
			active: function(val, oldVal) {
				this.curCagetory = 2; //默认显示个人
				this.initQueryParams();
				this.common.setParting('','');//清空分类
				this.partingTitle = '素材'
				this.partingCode = 0;
				if(val == 0) { //image
					this.common.setMaterialType(3);
					//this.queryImages();
				} else if(val == 1) { //video
					this.common.setMaterialType(2);
				} else if(val == 2) {//audio
					this.common.setMaterialType(1);
				}
			}
		},
		created() {

		},
		computed: {
			cagetoryClass: function() {
				if(this.curCagetory == 0) {
					return 'cagetory official';
				} else if(this.curCagetory == 1) {
					return 'cagetory public';
				} else if(this.curCagetory == 2) {
					return 'cagetory private';
				}
			}
		},
		methods: {
			initQueryParams() {
				this.pageNum = 1;
				this.loading = false;
				this.finished = false;
				this.list = [];
			},
			queryImages() {
				console.log(this.curCagetory);
				if(this.curCagetory == 0) {
					this.queryMaterial(OfficialImages({
						pageNum: this.pageNum,
						pageSize: this.pageSize,
						categoryId: this.partingCode
					}));
				} else if(this.curCagetory == 1) {
					this.queryMaterial(PublicImages({
						pageNum: this.pageNum,
						pageSize: this.pageSize,
						categoryId: this.partingCode
					}));
				} else if(this.curCagetory == 2) {
					this.queryMaterial(PrivateImages({
						pageNum: this.pageNum,
						pageSize: this.pageSize,
						categoryId: this.partingCode
					}));
				}
			},
			queryVideos() {
				console.log(this.curCagetory);
				if(this.curCagetory == 0) {
					this.queryMaterial(OfficialVideos({
						pageNum: this.pageNum,
						pageSize: this.pageSize,
						categoryId: this.partingCode
					}));
				} else if(this.curCagetory == 1) {
					this.queryMaterial(PublicVideos({
						pageNum: this.pageNum,
						pageSize: this.pageSize,
						categoryId: this.partingCode
					}));
				} else if(this.curCagetory == 2) {
					this.queryMaterial(PrivateVideos({
						pageNum: this.pageNum,
						pageSize: this.pageSize,
						categoryId: this.partingCode
					}));
				}
			},
			queryAudio() {
				console.log(this.curCagetory);
				if(this.curCagetory == 0) {
					this.queryMaterial(OfficialAudios({
						pageNum: this.pageNum,
						pageSize: this.pageSize,
						categoryId: this.partingCode
					}));
				} else if(this.curCagetory == 1) {
					this.queryMaterial(PublicAudios({
						pageNum: this.pageNum,
						pageSize: this.pageSize,
						categoryId: this.partingCode
					}));
				} else if(this.curCagetory == 2) {
					this.queryMaterial(PrivateAudios({
						pageNum: this.pageNum,
						pageSize: this.pageSize,
						categoryId: this.partingCode
					}));
				}
			},
			goDetail(item) {
				this.$route.push({
					name: 'MaterialDetail',
					params: {
						item: item
					}
				})
			},
			queryMaterial(queryFuc) {
				var _this = this;
				queryFuc.then(response => {
						if(response.code == 0) {
							_this.list = _this.list.concat(response.list);
							if(_this.list.length == response.total) {
								_this.finished = true;
							} else {
								_this.pageNum++;
							}
							_this.loading = false
						} else {
							Toast(response.message);
						}
					})
					.catch(err => {
						console.log(err);
					})
			},
			changeCagetory() {
				this.curCagetory = (this.curCagetory + 1) % 3;
				this.initQueryParams();
			},
			materialDetail() {
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
		min-height: 1003px;
		max-width: 100%;
		.list {
			.list_item {
				width: 163px;
				height: 193px;
				margin-left: 18px;
				margin-top: 18px;
				.item_mask {
					width: 163px;
					height: 193px;
					background: rgba(149, 143, 143, 0.6);
					position: absolute;
					span {
						font-size: 24px;
						font-family: Microsoft YaHei Regular;
						color: #ffffff;
						letter-spacing: 0px;
						text-align: center;
						display: block;
						position: relative;
						top: 50%;
						transform: translateY(-50%);
					}
				}
				img {
					width: 163px;
					height: 193px;
				}
			}
		}
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
			text-align: center;
			span {
				font-size: 33px;
				font-family: Microsoft YaHei Regular;
				color: #ffffff;
				line-height: 99px;
				letter-spacing: 1px;
			}
		}
	}
	
	.cagetory {
		width: 108px;
		height: 108px;
		position: fixed;
		bottom: 105px;
		right: 13px;
	}
	
	.official {
		background: url(../../assets/official@2x.png) no-repeat;
		background-size: 100% 100%;
	}
	
	.public {
		background: url(../../assets/public@2x.png) no-repeat;
		background-size: 100% 100%;
	}
	
	.private {
		background: url(../../assets/private@2x.png) no-repeat;
		background-size: 100% 100%;
	}
</style>