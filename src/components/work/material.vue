<template>
	<div class="list_div">
		<!-- 'title','hasRight','back','parting','search','upload' -->
		<my-header :title="partingTitle" back="true" hasRight="true" backUrl="/Work"></my-header>
		<div>
			<my-select></my-select>
		</div>
		<div class="my_tab_div">
			<my-tab @search="search" @tabChange="tabChange"></my-tab>
		</div>
		<div class="parting">
			<van-dropdown-menu>
				<van-dropdown-item v-model="partingCode" :options="parting" @change="change()" />
			</van-dropdown-menu>
		</div>
		<div class="material_content">
			<div class="content" v-if="tabActive==1">
				<van-list class="list" v-model="loading" :finished="finished" finished-text="没有更多了" @load="queryImages()">
					<div class="list_item" v-for="(item,index) in list" @click="goDetail(item)">
						<!--<em class="item_mask"><span>{{item.status==0?"未标引":(item.status==1?"审核中":"已标引")}}</span></em>-->
						<img :src="item.accessUrl" />
						<div class="list_info">
							<div class="info_name">{{item.name}}</div>
							<div class="info_time">{{item.createTime}}</div>
						</div>
					</div>
				</van-list>
			</div>
			<div class="content" v-if="tabActive==2">
				<van-list class="list" v-model="loading" :finished="finished" finished-text="没有更多了" @load="queryVideos()">
					<div class="list_item" v-for="(item,index) in list" @click="goDetail(item)">
						<!--<em class="item_mask"><span>{{item.status==0?"未标引":(item.status==1?"审核中":"已标引")}}</span></em>-->
						<video :src="item.accessUrl" />
						<div class="list_info">
							<div class="info_name">{{item.name}}</div>
							<div class="info_time">{{item.createTime}}</div>
						</div>
					</div>
				</van-list>
			</div>
			<div class="content" v-if="tabActive==3">
				<van-list class="list" v-model="loading" :finished="finished" finished-text="没有更多了" @load="queryAudios()">
					<div class="list_item audio_img" v-for="(item,index) in list" @click="goDetail(item)">
						<!--<em class="item_mask"><span>{{item.status==0?"未标引":(item.status==1?"审核中":"已标引")}}</span></em>-->
						<audio>
							<source :src="item.accessUrl">
							</source>
						</audio>
						<div class="list_info">
							<div class="info_name">{{item.name}}</div>
							<div class="info_time">{{item.createTime}}</div>
						</div>
					</div>
				</van-list>
			</div>
		</div>
		<div class="upload_div" v-if="curCagetory==2">
			<van-uploader :before-read="getFileInfo" :after-read="uploadComplete" accept="image/*" v-if="tabActive==1">
				<div class="upload_btn">
					上传素材
				</div>
			</van-uploader>
			<van-uploader :before-read="getFileInfo" :after-read="uploadComplete" accept="video/*" v-if="tabActive==2">
				<div class="upload_btn">
					上传素材
				</div>
			</van-uploader>
			<van-uploader :before-read="getFileInfo" :after-read="uploadComplete" accept="audio/*" v-if="tabActive==3">
				<div class="upload_btn">
					上传素材
				</div>
			</van-uploader>
			<!-- <input class="upload_btn" type="file" value="上传素材"/> -->
			<!--<div class="upload_btn" @click="uploaderFile('image')" v-if="active==0">
        <span>上传素材</span>
      </div>
      <div class="upload_btn" @click="uploaderFile('video')" v-if="active==1">
        <span>上传素材</span>
      </div>
      <div class="upload_btn" @click="uploaderFile('audio')" v-if="active==2">
        <span>上传素材</span>
      </div>-->
		</div>
		<navigate-bar></navigate-bar>
	</div>

</template>

<script>
	import MyHeader from '../views/header.vue'
	import MyTab from '../views/myTab.vue'
	import NavigateBar from '../views/navigateBar.vue'
	import MySelect from '../views/select.vue'
	import {
		Uploader
	} from 'vant';
	import {
		domain,
		OfficialImages,
		PrivateImages,
		PublicImages,
		OfficialVideos,
		PrivateVideos,
		PublicVideos,
		OfficialAudios,
		PrivateAudios,
		PublicAudios,
		ImageUpload,
		VideoUpload,
		AudioUpload,
		getParting
	} from '../../utils/request.js'
	import {
		Toast
	} from 'vant';
	export default {
		name: 'Material',
		components: {
			MyHeader,
			MyTab,
			NavigateBar,
			MySelect
		},
		data() {
			return {
				pageSize: 20,
				partingTitle: this.common.parting.value ? this.common.parting.value : '素材',
				partingCode: this.common.parting.code ? this.common.parting.code : '',
				curCagetory: 2,
				list: [],
				loading: false,
				finished: false,
				pageNum: 1,
				loginToast: null,
				tabActive: 1,
				keyWord: '',
				parting: [{
					text: '全部',
					value: ''
				}]
			}
		},
		watch: {
			loading: function(val, oldVal) {
				console.log("loading change.....", val, oldVal);
			},
			tabActive: function(val, oldVal) {

				this.curCagetory = 2; //默认显示个人
				this.initQueryParams();
				this.common.setParting('', ''); //清空分类
				this.partingTitle = '素材'
				this.partingCode = '';
				this.keyWord = '';
				this.finished = false;
				this.loading = true;
				this.list = [];
				this.pageNum = 1;
				this.parting = [{
					text: '全部',
					value: ''
				}];
				if(val == 1) { //image
					this.common.setMaterialType(3);
					if(this.loading) {
						this.queryImages();
					}
				} else if(val == 2) { //video
					this.common.setMaterialType(2);
					if(this.loading) {
						this.queryVideos();
					}
				} else if(val == 3) { //audio
					this.common.setMaterialType(1);
					if(this.loading) {
						this.queryAudios();
					}
				}
				this.getParting();
			}
		},
		created() {
			//this.setActived();
			this.getParting();
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
			reQuery() {
				this.finished = false;
				this.loading = true;
				this.list = [];
				this.pageNum = 1;
				if(this.tabActive == 1) { //image
					if(this.loading) {
						this.queryImages();
					}
				} else if(this.tabActive == 2) { //video
					if(this.loading) {
						this.queryVideos();
					}
				} else if(this.tabActive == 3) { //audio
					if(this.loading) {
						this.queryAudios();
					}
				}
			},
			change() {
				this.keyWord = '';
				this.parting.forEach(item => {
					if(item.value == this.partingCode) {
						this.partingTitle = item.text + '素材';
					}
				})
				this.reQuery();
			},
			getParting() {
				var _this = this;
				getParting({
						materialType: this.common.materialType
					})
					.then(response => {
						if(response.code == 0) {
							_this.pushToParting(response.list)
						} else {
							Toast(response.message);
							if(response.code == 401) {
								_this.$router.push('/')
							}
						}
					}).catch(err => {
						console.log(err);
					});
			},
			pushToParting(result) {
				result.forEach(item => {
					this.parting.push({
						text: item.value,
						value: item.code
					})
				})

			},
			search(params) {
				this.keyWord = params;
				this.reQuery();
			},
			tabChange(params) {
				this.tabActive = params;
				console.log("tabChange.....", params);
			},
			getFileInfo(file, detail) {
				//TODO
				return true;
			},
			uploadComplete(file) {
				var _this = this;
				var size = file.file.size;
				file.file.duration
				const data = new FormData();
				data.append("file", file.file);
				let config = {
					headers: {
						'Content-Type': 'multipart/form-data',
						'token': localStorage.getItem('token')
					}
				}; //添加请求头
				this.$http.post(domain + '/api/asset/common/oss/push-url', data, config)
					.then(response => {
						if(response.data.code == 0) {
							_this.initQueryParams()
							if(_this.tabActive == 1) {
								var params = this.getImgParamsFromOssPush(response.data.data, size);
								ImageUpload(params)
									.then(response => {
										if(response.code == 0) {
											Toast('上传成功');
											_this.queryImages();
										} else {
											Toast(response.message);
											if(response.code == 401) {
												_this.$router.push('/')
											}
										}
									})
									.catch(err => {
										console.log(err);
									})
							} else if(_this.tabActive == 2) {
								var params = this.getAudioParamsFromOssPush(response.data.data, size);
								VideoUpload(params)
									.then(response => {
										if(response.code == 0) {
											Toast('上传成功');
											_this.queryVideos();
										} else {
											Toast(response.message);
											if(response.code == 401) {
												_this.$router.push('/')
											}
										}
									})
									.catch(err => {
										console.log(err);
									})
							} else if(this.tabActive == 3) {
								var params = this.getAudioParamsFromOssPush(response.data.data, size);
								AudioUpload(params)
									.then(response => {
										if(response.code == 0) {
											Toast('上传成功');
											_this.queryAudios();
										} else {
											Toast(response.message);
											if(response.code == 401) {
												_this.$router.push('/')
											}
										}
									})
									.catch(err => {
										console.log(err);
									})
							}
						} else {
							Toast(response.data.message);
							if(response.data.code = 401) {
								_this.$router.push('/')
							}
						}
						console.log(response);
					}).catch(err => {
						console.log(err);
					});
			},
			getImgParamsFromOssPush(data, size) {
				console.log(data);
				var dataArr = data.split("/");
				var image = dataArr[dataArr.length - 1]
				return {
					objKey: image,
					name: image,
					dpi: '',
					size: size,
					extension: image.split(".")[1],
					source: 0,
					medialYear: new Date().getFullYear()
				}
			},
			getAudioParamsFromOssPush(data, size) {
				console.log(data);
				var dataArr = data.split("/");
				var image = dataArr[dataArr.length - 1]
				return {
					objKey: image,
					name: image,
					length: '30',
					size: size,
					extension: image.split(".")[1],
					source: 0,
					medialYear: new Date().getFullYear()
				}
			},
			initQueryParams() {
				this.pageNum = 1;
				this.loading = false;
				this.finished = false;
				this.list = [];
			},
			queryImages() {
				if(this.curCagetory == 0) {
					this.queryMaterial(OfficialImages({
						pageNum: this.pageNum,
						pageSize: this.pageSize,
						categoryId: this.partingCode,
						keyword: this.keyWord
					}));
				} else if(this.curCagetory == 1) {
					this.queryMaterial(PublicImages({
						pageNum: this.pageNum,
						pageSize: this.pageSize,
						categoryId: this.partingCode,
						keyword: this.keyWord
					}));
				} else if(this.curCagetory == 2) {
					this.queryMaterial(PrivateImages({
						pageNum: this.pageNum,
						pageSize: this.pageSize,
						categoryId: this.partingCode,
						keyword: this.keyWord
					}));
				}
			},
			queryVideos() {
				if(this.curCagetory == 0) {
					this.queryMaterial(OfficialVideos({
						pageNum: this.pageNum,
						pageSize: this.pageSize,
						categoryId: this.partingCode,
						keyword: this.keyWord
					}));
				} else if(this.curCagetory == 1) {
					this.queryMaterial(PublicVideos({
						pageNum: this.pageNum,
						pageSize: this.pageSize,
						categoryId: this.partingCode,
						keyword: this.keyWord
					}));
				} else if(this.curCagetory == 2) {
					this.queryMaterial(PrivateVideos({
						pageNum: this.pageNum,
						pageSize: this.pageSize,
						categoryId: this.partingCode,
						keyword: this.keyWord
					}));
				}
			},
			queryAudios() {
				if(this.curCagetory == 0) {
					this.queryMaterial(OfficialAudios({
						pageNum: this.pageNum,
						pageSize: this.pageSize,
						categoryId: this.partingCode,
						keyword: this.keyWord
					}));
				} else if(this.curCagetory == 1) {
					this.queryMaterial(PublicAudios({
						pageNum: this.pageNum,
						pageSize: this.pageSize,
						categoryId: this.partingCode,
						keyword: this.keyWord
					}));
				} else if(this.curCagetory == 2) {
					this.queryMaterial(PrivateAudios({
						pageNum: this.pageNum,
						pageSize: this.pageSize,
						categoryId: this.partingCode,
						keyword: this.keyWord
					}));
				}
			},
			goDetail(item) {
				this.$router.push({
					name: 'MaterialDetail',
					params: {
						id: item.id
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
							if(response.code = 401) {
								_this.$router.push("/");
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
	.list_div {
		height: 100%;
		padding: 44px 0 0;
		background: #FFFFFF;
		.my_tab_div {
			padding-left: 10px;
			top: 44px;
			position: fixed;
			width: 100%;
			background: #FFFFFF;
			height: 40px;
		}
		.parting {
			position: fixed;
			padding-left: 10px;
			top: 83px;
			width: 100%;
			background: #FFFFFF;
		}
		.material_content {
			background: #FFFFFF;
			padding-top: 90px;
			padding-bottom: 150px;
			width: 100%;
			.content {
				margin-top: 17px;
				width: 100%;
				.list {
					width: 100%;
					display: flex;
					flex-direction: column;
					.list_item {
						margin-left: 18px;
						margin-top: 18px;
						display: flex;
						flex-direction: row;
						overflow: hidden;
						video {
							width: 50px;
							height: 50px;
						}
						audio {
							width: 50px;
							height: 50px;
						}
						img {
							width: 50px;
							height: 50px;
						}
						.list_info {
							margin-left: 20px;
							.info_name {
								font-size: 14px;
								font-family: PingFangSC-Medium, PingFang SC;
								font-weight: 500;
								color: #3F3E3E;
								line-height: 20px;
								width: 250px;
								white-space: nowrap;
								overflow: hidden;
								text-overflow: ellipsis;
							}
							.info_time {
								font-size: 12px;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #939393;
								line-height: 17px;
								margin-top: 12px;
							}
						}
					}
				}
			}
		}
		.upload_div {
			width: 100%;
			height: 60px;
			position: fixed;
			bottom: 75px;
			background: #FFFFFF;
			padding-left: 18px;
			padding-top: 10px;
			.upload_btn {
				width: 341px;
				height: 40px;
				background: #4783FE;
				border-radius: 10px;
				font-size: 15px;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				line-height: 40px;
				text-align: center;
			}
		}
	}
</style>