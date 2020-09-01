<template>
	<div class="mission_div">
		<div class="content_main" v-if="active==0">
			<my-header title="正文内容" back="true" ref="header" backUrl='/Mission'></my-header>
			<div class="content_div">
				<div class="content">
					<div class="content_title">{{missionDetail.title}}</div>
					<div class="content_info">
						<span>署名作者：{{missionDetail.signature}}</span>
						<span>{{missionDetail.lastModifyTime}}</span>
					</div>
					<div class="content_detail" v-html="missionDetail.content"></div>
				</div>
				<div class="author_div">
					<span>作者：{{authorsStr}}</span>
					<span>编辑：{{editorsStr}}</span>
				</div>
				<div class="btn_div">
					<div @click="nextStep()" class="next_btn">
						<span>下一步</span>
					</div>
				</div>
			</div>
		</div>
		<div class="basic_div" v-if="active==1">
			<my-header title="基础信息" back="true" ref="header" backUrl='/Mission'></my-header>
			<div class="basic">
				<div class="basic_title">
					<img src="../../assets/basic_info@2x.png" />
					<span>基础信息</span>
				</div>
				<div class="basic_info">
					<ul class="basic_name">
						<li>渠道</li>
						<li>栏目</li>
						<li>作者</li>
						<li>编辑</li>
						<li>责任编辑</li>
						<li>关键词</li>
						<li>摘要</li>
					</ul>
					<ul class="basic_value">
						<li>{{missionDetail.channelName}}</li>
						<li>{{missionDetail.columnName}}</li>
						<li class="channel_authors">
							<div class="channel_author" v-for="(item,index) in missionDetail.authors">
								{{item}}
							</div>
						</li>
						<li class="channel_authors">
							<div class="channel_author" v-for="(item,index) in missionDetail.editors">
								{{item}}
							</div>
						</li>
						<li>{{missionDetail.signature}}</li>
						<li>{{missionDetail.keyword}}</li>
						<li>{{missionDetail.summary}}</li>
					</ul>
				</div>
				<div class="channel">
					<div class="channel_title">
						<img src="../../assets/Channel_info@2x.png" />
						<span>渠道信息</span>
					</div>
					<div class="channel_info" v-if="basicInfoType==1">
						<ul class="basic_name">
							<li>上标题</li>
							<li>下标题</li>
						</ul>
						<ul class="basic_value">
							<li>{{missionDetail.channelProperty ? missionDetail.channelProperty.headerTitle:""}}</li>
							<li>{{missionDetail.channelProperty ? missionDetail.channelProperty.footerTitle:""}}</li>
						</ul>
					</div>
					<div class="channel_info" v-if="basicInfoType==2">
						<ul class="basic_name">
							<li>附件<img src="../../assets/accessory@2x.png" /></li>
						</ul>
						<ul class="basic_value">
							<li>附件名称</li>
						</ul>
					</div>
					<div class="channel_info" v-if="basicInfoType==3">
						<ul class="basic_name">
							<li>视频</li>
						</ul>
						<ul class="basic_value">
							<li>
								<video />
							</li>
						</ul>
					</div>
				</div>
			</div>

			<div class="btn_div" v-if="missionDetail.auditTopPower==1">
				<div class="publish_btn" @click="publish()">
					<span>发布</span>
				</div>
				<div class="pass_btn" @click="pass()">
					<span>审核通过</span>
				</div>
				<div class="reject_btn" @click="back(missionDetail.auditSeqNum)">
					<span>退回</span>
				</div>
			</div>
			<div class="btn_div2" v-if="missionDetail.auditTopPower==0">
				<div class="pass_btn2" @click="pass()">
					<span>审核通过</span>
				</div>
				<div class="reject_btn2" @click="back(missionDetail.auditSeqNum)">
					<span>退回</span>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
	import MyHeader from '../views/header.vue'
	import {
		MissionDetail,
		MissionPublish,
		MissionPass
	} from '../../utils/request.js'
	import {
		Toast
	} from 'vant';
	export default {
		name: 'MissionDetail',
		components: {
			MyHeader
		},
		data() {
			return {
				active: 1,
				basicInfoType: 1,
				storyId: this.$route.params.storyId,
				auditId: this.$route.params.auditId,
				missionDetail: {}

			}
		},
		created() {
			if(!this.$route.params.storyId) {
				this.storyId = localStorage.getItem('storyId');
			}
			if(!this.$route.params.auditId) {
				this.auditId = localStorage.getItem('auditId')
			}
			this.getMissionDetail();
		},
		computed: {
			editorsStr: function() {
				if(this.missionDetail && this.missionDetail.editors) {
					return this.missionDetail.editors.join(',')
				}
				return "";
			},
			authorsStr: function() {
				if(this.missionDetail && this.missionDetail.authors) {
					return this.missionDetail.authors.join(',')
				}
				return "";
			}
		},
		methods: {
			publish() {
				var _this = this;
				MissionPublish({
					storyId: this.storyId,
					auditId: this.auditId
				}).then(response => {
					if(response.code == 0) {
						Toast('发布成功');
						_this.$router.push('/Mission');
					} else {
						Toast(response.message);
						if(response.code == 401) {
							_this.$router.push('/Login')
						}
					}
				}).catch(err => {
					console.log(err)
				});
			},
			pass() {
				var _this = this;
				MissionPass({
					storyId: this.storyId,
					auditId: this.auditId
				}).then(response => {
					if(response.code == 0) {
						Toast('通过成功');
						_this.$router.push('/Mission');
					} else {
						Toast(response.message);
						if(response.code == 401) {
							_this.$router.push('/Login')
						}
					}
				}).catch(err => {
					console.log(err)
				});
			},
			getMissionDetail() {
				var _this = this;
				MissionDetail({
					storyId: this.storyId,
					auditId: this.auditId
				}).then(response => {
					if(response.code == 0) {
						_this.missionDetail = response.data;
					} else {
						Toast(response.message);
						if(response.code == 401) {
							_this.$router.push('/Login')
						}
					}
				}).catch(err => {
					console.log(err);
				})
			},
			nextStep() {
				this.active = 1;
			},
			back(auditSeqNum) {
				this.$router.push({
					name: 'MissionBack',
					params: {
						storyId: this.storyId,
						auditId: this.auditId,
						auditSeqNum: this.missionDetail.auditSeqNum
					}
				})
			}

		}
	}
</script>

<style scoped lang="less">
	@deep: ~'>>>';
	.mission_div {
		height: 100%;
		padding-top: 44px;
		background: #FFFFFF;
		.content_main {
			height: 100%;
			.content_div {
				height: 100%;
				.content {
					display: flex;
					flex-direction: column;
					margin-top: 22px;
					padding-left: 17px;
					max-width: 341px;
					width: 341px;
					.content_title {
						font-size: 16px;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #3F3E3E;
						line-height: 25px;
					}
					.content_info {
						font-size: 14px;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #BABABA;
						line-height: 20px;
						display: flex;
						flex-direction: row;
						justify-content: space-between;
						margin-top: 19px;
						span {
							display: block;
						}
					}
					.content_detail {
						margin-top: 35px;
						font-size: 28px;
						font-family: Microsoft YaHei Regular;
						font-weight: 400;
						text-align: left;
						color: #666666;
						letter-spacing: 0px;
						@{deep} img {
							max-width: 100% !important;
							width: 100% !important;
						}
						@{deep} video {
							max-width: 100% !important;
							width: 100% !important;
						}
						@{deep} audio {
							max-width: 100% !important;
							width: 100% !important;
						}
					}
				}
				.author_div {
					font-size: 14px;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #BABABA;
					line-height: 20px;
					margin: 20px 17px 0px 17px;
					text-align: right;
					span {
						display: block;
						margin-bottom: 5px;
					}
				}
				.btn_div {
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
					margin: 20px auto 23px;
				}
			}
		}
		.basic_div {
			margin-top: 20px;
			.basic {
				padding-left: 14px;
				background: #FFFFFF;
				width: 100%;
				min-height: 307px;
				height: 307px;
				.basic_title {
					height: 24px;
					margin-bottom: 19px;
					img {
						width: 24px;
						height: 24px;
						vertical-align: middle;
					}
					span {
						font-size: 18px;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: #3F3E3E;
						line-height: 24px;
						vertical-align: middle;
					}
				}
				.basic_info {
					display: flex;
					flex-direction: row;
					.basic_name {
						font-size: 15px;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #939393;
						line-height: 21px;
						li {
							margin-bottom: 10px;
						}
					}
					.basic_value {
						font-size: 15px;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						color: #3F3E3E;
						line-height: 21px;
						margin-left: 34px;
						li {
							margin-bottom: 10px;
							height: 21px;
							margin-right: 25px;
						}
						.channel_authors {
							display: flex;
							flex-direction: row;
							height: 28px;
							.channel_author {
								width: 60px;
								background: #4783FE;
								border-radius: 14px;
								font-size: 15px;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								color: #FFFFFF;
								line-height: 28px;
								text-align: center;
							}
						}
					}
				}
			}
		}
	}
</style>