<template>
	<div class="detail_div">
		<!-- 'title','hasRight','back','parting','search','upload' -->
		<my-header title="稿件详情" back="true" ref="header" backUrl='/Audit'></my-header>
		<van-tabs v-model="active" color="#ffaf6f">
			<van-tab title="正文内容">
				<div class="content_div">
					<div class="content">
						<div class="content_title">{{missionDetail.title}}</div>
						<div class="content_info">
							<span>{{missionDetail.signature}}</span>
							<span style="margin-left: 72px;">{{missionDetail.lastModifyTime}}</span>
						</div>
						<div class="content_detail" v-html="missionDetail.content"></div>
					</div>
					<div class="author_div">
						<span>{{missionDetail.signature}}</span>
						<span>作者:{{authorsStr}}</span>
						<span>编辑:{{editorsStr}}</span>
					</div>
					<div class="btn_div">
						<div @click="nextStep()" class="next_btn">
							<span>下一步</span>
						</div>
					</div>
				</div>
			</van-tab>
			<van-tab title="基础信息" color="#ffaf6f">
				<div class="basic_div">
					<div class="basic">
						<div class="basic_title">
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
								<li>再要</li>
							</ul>
							<ul class="basic_value">
								<li>{{missionDetail.channelName}}</li>
								<li>{{missionDetail.columnName}}</li>
								<li>
									<template v-for="(item,index) in missionDetail.authors">
										{{item}}<img src="../../assets/basic_icon@2x.png" />
									</template>
								</li>
								<li>
									<template v-for="(item,index) in missionDetail.editors">
										{{item}}<img src="../../assets/basic_icon@2x.png" />
									</template>
								</li>
								<li>{{missionDetail.signature}}</li>
								<li>{{missionDetail.keyword}}</li>
								<li>{{missionDetail.summary}}</li>
							</ul>
						</div>

						<div class="channel_title">
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
			</van-tab>
		</van-tabs>
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
		name: 'AuditDetail',
		components: {
			MyHeader
		},
		data() {
			return {
				active: 0,
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
						_this.$router.push('/Audit');
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
						_this.$router.push('/Audit');
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
					name: 'AuditBack',
					params: {
						storyId: this.storyId,
						auditId: this.auditId,
						auditSeqNum:this.missionDetail.auditSeqNum
					}
				})
			}

		}
	}
</script>

<style scoped lang="less">
	@deep: ~'>>>';
	.detail_div{
		height: 100%;
		padding: 111px 0 0;
		box-sizing: border-box;
		.content_div {
		.content {
			display: flex;
			flex-direction: column;
			margin-top: 12px;
			padding-left: 31px;
			min-height: 700px;
			max-width: 690px;
			.content_title {
				font-size: 30px;
				font-family: Microsoft YaHei Regular;
				font-weight: 400;
				text-align: left;
				color: #333333;
				letter-spacing: 1px;
			}
			.content_info {
				margin-top: 35px;
				font-size: 24px;
				font-family: Microsoft YaHei Regular;
				font-weight: 400;
				text-align: left;
				color: #999999;
				letter-spacing: 0px;
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
			/* .btn_div{
        display: flex;
        position: absolute;
        bottom: 30px;
      } */
		}
		.author_div {
			height: 287px;
			font-size: 24px;
			font-family: Microsoft YaHei Regular;
			font-weight: 400;
			text-align: left;
			color: #999999;
			letter-spacing: 0px;
			background-color: #f4f4f4;
			padding-top: 47px;
			span {
				display: block;
				margin-bottom: 27px;
				margin-left: 31px;
			}
		}
		.btn_div {
			position: fixed;
			bottom: 0px;
			background-color: #e5e5e5;
			padding-top: 12px;
			width: 100%;
			.next_btn {
				margin-left: 106px;
				width: 539px;
				height: 99px;
				background-image: url(../../assets/next_btn@2x.png);
				background-size: 100% auto;
				font-size: 36px;
				font-family: Microsoft YaHei Regular;
				font-weight: 400;
				color: #ffffff;
				letter-spacing: 1px;
				text-align: center;
				span {
					line-height: 83px;
				}
			}
		}
	}
	
	.basic_div {
		height: 1003px;
		.basic {
			margin-top: 12px;
			padding-left: 21px;
			padding-top: 2px;
			.basic_title {
				height: 65px;
				line-height: 65px;
				font-size: 30px;
				font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
				font-weight: 400;
				text-align: left;
				color: #333333;
				letter-spacing: 1px;
				background-image: url(../../assets/basic_title@2x.png);
				background-size: auto 100%;
				background-repeat: no-repeat;
				span {
					margin-left: 43px;
				}
			}
			.basic_info {
				display: flex;
				flex-direction: row;
				margin-left: 46px;
				margin-top: 35px;
				min-height: 434px;
				.basic_name {
					font-size: 26px;
					font-family: Microsoft YaHei Bold-Bold;
					font-weight: 700;
					color: #333333;
					letter-spacing: 1px;
					li {
						margin-bottom: 25px;
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
					font-size: 26px;
					font-family: Microsoft YaHei Bold;
					font-weight: 400;
					color: #333333;
					letter-spacing: 1px;
					li {
						min-height: 37px;
						margin-bottom: 25px;
						img {
							width: 28px;
							height: 28px;
							margin-left: 10px;
						}
					}
				}
			}
			.channel_title {
				margin-top: 145px;
				height: 65px;
				line-height: 65px;
				font-size: 30px;
				font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
				font-weight: 400;
				text-align: left;
				color: #333333;
				letter-spacing: 1px;
				background-image: url(../../assets/basic_title@2x.png);
				background-size: auto 100%;
				background-repeat: no-repeat;
				span {
					margin-left: 43px;
				}
			}
			.channel_info {
				display: flex;
				flex-direction: row;
				margin-left: 46px;
				margin-top: 35px;
				min-height: 124px;
				.basic_name {
					font-size: 26px;
					font-family: Microsoft YaHei Bold-Bold;
					font-weight: 700;
					color: #333333;
					letter-spacing: 1px;
					li {
						margin-bottom: 25px;
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
					font-size: 26px;
					font-family: Microsoft YaHei Bold;
					font-weight: 400;
					color: #333333;
					letter-spacing: 1px;
					li {
						margin-bottom: 25px;
						img {
							width: 28px;
							height: 28px;
							margin-left: 10px;
						}
					}
				}
			}
		}
		.btn_div {
			position: fixed;
			bottom: 0px;
			background-color: #e5e5e5;
			padding-top: 12px;
			font-size: 33px;
			font-family: Microsoft YaHei Regular;
			font-weight: 400;
			color: #ffffff;
			letter-spacing: 1px;
			display: flex;
			margin-top: 127px;
			.publish_btn {
				margin-left: 20px;
				margin-top: 8px;
				background-image: url(../../assets/publish@2x.png);
				background-size: 100% auto;
				width: 189px;
				height: 81px;
				text-align: center;
				span {
					line-height: 68px;
				}
			}
			.pass_btn {
				background-image: url(../../assets/pass@2x.png);
				background-size: 100% auto;
				width: 326px;
				height: 99px;
				text-align: center;
				span {
					line-height: 83px;
				}
			}
			.reject_btn {
				margin-top: 8px;
				background-image: url(../../assets/reject@2x.png);
				background-size: 100% auto;
				width: 189px;
				height: 81px;
				text-align: center;
				span {
					line-height: 68px;
				}
			}
		}
		.btn_div2 {
			position: fixed;
			bottom: 0px;
			background-color: #e5e5e5;
			padding-top: 12px;
			font-size: 33px;
			font-family: Microsoft YaHei Regular;
			font-weight: 400;
			color: #ffffff;
			letter-spacing: 1px;
			display: flex;
			margin-top: 127px;
			.pass_btn2 {
				background-image: url(../../assets/pass2@2x.png);
				background-size: 100% auto;
				width: 539px;
				height: 99px;
				text-align: center;
				span {
					line-height: 83px;
				}
			}
			.reject_btn2 {
				margin-top: 8px;
				background-image: url(../../assets/reject@2x.png);
				background-size: 100% auto;
				width: 189px;
				height: 81px;
				text-align: center;
				span {
					line-height: 68px;
				}
			}
		}
	}
	}
</style>