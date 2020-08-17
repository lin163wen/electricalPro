<template>
	<div>
		<!-- 'title','hasRight','back','parting','search','upload' -->
		<my-header title="搜索" back="true"></my-header>
		<div class="search">
			<div class="search_btn">
				<van-search v-model="keyWord" shape="round" background="#f4f4f4" placeholder="请输入搜索关键词" @search="searchMaterial" />
				<div class="search_cancel" @click="cancel()">取消</div>
			</div>
			<div class="search_result" v-if="list.length>0">
				<div class="content">
					<van-list class="list" style="display: flex;flex-direction: row;flex-wrap: wrap;" v-model="loading" :finished="finished" finished-text="没有更多了" @load="queryImages">
						<div class="list_item" v-for="(item,index) in list" @click="goDetail(item)">
							<em class="item_mask"><span>{{item.status==0?"未标引":(item.status==1?"审核中":"已标引")}}</span></em>
							<img :src="item.accessUrl" />
						</div>
					</van-list>
				</div>
			</div>
			<div class="search_no_data" v-if="list.length<=0">
				<div class="no_data_img"></div>
				<div class="no_data_text">暂时没有搜到任务</div>
			</div>
		</div>
	</div>
</template>

<script>
	import MyHeader from '../views/header.vue'
	import {
		OfficialImages,
		PrivateImages,
		PublicImages,
		OfficialVideos,
		PrivateVideos,
		PublicVideos,
		OfficialAudios,
		PrivateAudios,
		PublicAudios
	} from '../../utils/request.js'
	export default {
		name: 'Search',
		components: {
			MyHeader
		},
		data() {
			return {
				searchResultNum: 0,
				keyWord: '',
				loading: false,
				finished: false,
				list: [],
				pageNum: 1,
				pageSize: 100
			}
		},
		methods: {
			goDetail(item) {
				this.$router.push({
					name: 'MaterialDetail',
					params: {
						id: item.id
					}
				})
			},
			searchMaterial(val) {
				this.queryImages();
			},
			queryImages() {
				var params = {
					pageNum: this.pageNum,
					pageSize: this.pageSize,
					categoryId: '',
					keyword: this.keyWord,
					list: []
				}
				//0成品，1公共，2个人
				if(this.common.materialType == 3) { //image
					if(this.common.curCagetory == 0) {
						this.queryMaterial(OfficialImages(params))
					} else if(this.common.curCagetory == 1) {
						this.queryMaterial(PublicImages(params))
					} else if(this.common.curCagetory == 2) {
						this.queryMaterial(PrivateImages(params))
					}
				} else if(this.common.materialType == 2) { //2video
					if(this.common.curCagetory == 0) {
						this.queryMaterial(OfficialVideos(params))
					} else if(this.common.curCagetory == 1) {
						this.queryMaterial(PublicVideos(params))
					} else if(this.common.curCagetory == 2) {
						this.queryMaterial(PrivateVideos(params))
					}
				} else if(this.common.materialType == 1) { //1audio
					if(this.common.curCagetory == 0) {
						this.queryMaterial(OfficialAudios(params))
					} else if(this.common.curCagetory == 1) {
						this.queryMaterial(PublicAudios(params))
					} else if(this.common.curCagetory == 2) {
						this.queryMaterial(PrivateAudios(params))
					}
				}
				//this.$router.push('/Material?headerTitle=分类1')
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
			cancel() {
				this.keyWord = '';
			}
		}
	}
</script>

<style scoped lang="less">
	.van-cell {
		padding-left: 10px !important;
	}
	
	.search {
		display: flex;
		justify-content: center;
		flex-direction: column;
		.search_no_data {
			width: 513px;
			height: 392px;
			position: absolute;
			top: 469px;
			background-image: url(../../assets/search_no_data@2x.png);
			background-repeat: no-repeat;
			background-size: 100% auto;
			display: flex;
			justify-content: center;
			position: fixed;
			left: 50%;	
			transform: translateX(-50%);
			.no_data_text {
				font-size: 44px;
				font-family: Microsoft YaHei Regular;
				font-weight: 400;
				text-align: left;
				color: #979797;
				position: absolute;
				bottom: 0;
			}
		}
		.search_btn {
			background-color: #f4f4f4;
			display: flex;
			flex-direction: row;
			.search_cancel {
				margin-left: 10px;
				font-size: 30px;
				font-family: Microsoft YaHei Regular;
				color: #585858;
				letter-spacing: 2px;
				line-height: 80px;
			}
		}
		.search_result {
			.content {
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
		}
	}
</style>