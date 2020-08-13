<template>
	<div style="height: 84%;">
		<!-- 'title','hasRight','back','parting','search','upload' -->
		<my-header title="任务"></my-header>
		<div class="mission_num" v-if="missionNum>0">任务数量（{{missionNum}}）</div>
		<div class="mission_list" v-if="missionNum>0">
			<div class="mission">
				<div class="content" @click="missionDetail()">
					<img class="icon" src="../../assets/check@2x.png" />
					<div class="text">
						<div class="text_title">稿件标题稿件标题稿件标题稿件标题</div>
						<div class="text_lanmu">渠道-栏目</div>
						<div class="text_time">2020-02-02 22:22</div>
					</div>
				</div>
				<div class="author">作者：伊娃懦夫 白瞎等</div>
			</div>
			<div class="mission">
				<div class="content" @click="missionDetail()">
					<img class="icon" src="../../assets/check@2x.png" />
					<div class="text">
						<div class="text_title">稿件标题稿件标题稿件标题稿件标题标题稿件稿件标题稿件标题稿件标题稿件标题标题稿件稿件标题稿件标题稿件标题稿件标题标题稿件</div>
						<div class="text_lanmu">渠道-栏目</div>
						<div class="text_time">2020-02-02 22:22</div>
					</div>
				</div>
				<div class="author">作者：张霞 无需等</div>
			</div>
		</div>
		<div class="no_mission" v-if="missionNum<=0">
			<div class="no_mission_img"></div>
			<div class="no_mission_text"></div>
		</div>
		<navigate-bar></navigate-bar>
	</div>

</template>

<script>
	import NavigateBar from '../views/navigateBar.vue'
	import MyHeader from '../views/header.vue'
	export default {
		name: 'Mission',
		components: {
			NavigateBar,
			MyHeader
		},
		data(){
			return{
				missionNum:5
			}
		},
		methods: {
			missionDetail() {
				this.$router.push('/MissionDetail')
			}
		}
	}
</script>

<style scoped lang="less">
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
	.no_mission{
		width: 460px;
		height: 327px;
		position: absolute;
		top:207px;
		left:146px;
		background-image: url(../../assets/no_mission@2x.png);
		background-repeat: no-repeat;
		background-size: 100% auto;
	}
	
	.mission_list {
		background-color: #f4f4f4;
		display: flex;
		flex-direction: column;
		height: 100%;
		.mission {
			background-color: #ffffff;
			display: flex;
			flex-direction: column;
			margin-bottom: 13px;
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
						width:520px;
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
</style>