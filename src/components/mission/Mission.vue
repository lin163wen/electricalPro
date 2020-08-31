<template>
	<div class="list_div" style="height: 84%;" :key="missionListNum">
		<!-- 'title','hasRight','back','parting','search','upload' -->
		<my-header title="任务"></my-header>
		<div class="mission_num" v-if="missionListNum>0">任务数量（{{missionListNum}}）</div>
		<div class="mission_list" v-if="missionListNum>0">
			<div class="mission" v-for="(item,index) in missionList">
				<div class="content" @click="missionDetail(item)">
					<img class="icon" src="../../assets/check@2x.png" />
					<div class="text">
						<div class="text_title">{{item.title}}</div>
						<div class="text_lanmu">{{item.channelName}}</div>
						<div class="text_time">{{item.updateTime}}</div>
					</div>
				</div>
				<div class="author">作者：{{item.author}}</div>
			</div>
		</div>
		<div class="no_mission" v-if="missionListNum<=0">
			<div class="no_mission_img"></div>
			<div class="no_mission_text"></div>
		</div>
		<navigate-bar></navigate-bar>
	</div>

</template>

<script>
	import NavigateBar from '../views/navigateBar.vue'
	import MyHeader from '../views/header.vue'
	import { Missions } from '../../utils/request.js'
	import { Toast } from 'vant';
	export default {
		name: 'Mission',
		components: {
			NavigateBar,
			MyHeader
		},
		data() {
			return {
				missionListNum: this.common.missionNum,
				missionList: [],
				componentKey: 0
			}
		},
		created() {
			this.queryMissions();
		},
		methods: {
			missionDetail(item) {
				localStorage.setItem('storyId', item.storyId);
				localStorage.setItem('auditId', item.auditId);
				this.$router.push({
					name: 'MissionDetail',
					params: {
						storyId: item.storyId,
						auditId: item.auditId
					}
				});
			},
			queryMissions() {
				console.log(this.missionListNum);
				var _this = this;
				Missions({}).then((response) => {
					console.log(response);
					if(response.code == 0) {
						_this.missionList = response.data.storyTaskListResponseList;
						_this.common.setMissionNum(response.data.storyTaskListResponseList.length);
						_this.missionListNum = response.data.storyTaskListResponseList.length;
						console.log(_this.missionListNum);
					} else {
						Toast(response.message);
						if(response.code == 401) {
							_this.$router.push('/Login')
						}
					}
				}).catch((response) => {
					console.log(4444);
					console.log(response);
				})

			}
		}
	}
</script>

<style scoped lang="less">
	.list_div {
		height: 100%;
		padding: 111px 0 0;
		box-sizing: border-box;
		.header {
			height: 111px;
			background: linear-gradient(#7c5dfb 0%, #41abff 100%);
		}
		.mission_num {
			font-size: 31px;
			font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
			font-weight: 400;
			text-align: left;
			color: #666666;
			letter-spacing: 1px;
			height: 77px;
			line-height: 77px;
			margin-left: 22px;
		}
		.no_mission {
			width: 460px;
			height: 327px;
			position: absolute;
			top: 207px;
			left: 146px;
			background-image: url(../../assets/no_mission@2x.png);
			background-repeat: no-repeat;
			background-size: 100% auto;
		}
		.mission_list {
			background-color: #f4f4f4;
			display: flex;
			flex-direction: column;
			padding-bottom: 1.493333rem;
			overflow: scroll;
			.mission {
				background-color: #ffffff;
				display: flex;
				flex-direction: column;
				margin-bottom: 13px;
				min-height: 280px;
				.content {
					display: flex;
					flex-wrap: nowrap;
					padding-bottom: 30px;
					padding-top: 23px;
					margin-left: 23px;
					border-bottom: solid #ededed 1px;
					.icon {
						height: 118px;
						width: 117px;
					}
					.text {
						margin: 5px 0px 0px 22px;
						text-align: left;
						font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
						font-weight: 400;
						.text_title {
							width: 520px;
							font-size: 30px;
							color: #333333;
							letter-spacing: 1px;
						}
						.text_lanmu {
							margin-top: 18px;
							font-size: 24px;
							color: #999999;
							letter-spacing: 0px;
						}
						.text_time {
							margin-top: 19px;
							font-size: 24px;
							color: #999999;
							letter-spacing: 0px;
						}
					}
				}
				.author {
					margin: 23px 23px 25px 23px;
					font-size: 26px;
					font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
					font-weight: 400;
					text-align: left;
					color: #999999;
					letter-spacing: 1px;
				}
			}
		}
	}
</style>