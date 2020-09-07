<template>
	<div class="call">
		<div class="call_info">
			<div class="video_call">
				<span>王五</span>
			</div>
			<div class="video_info">
				<span>略略略 01:09:20</span>
			</div>
		</div>
		<div class="video_self">
		</div>
		<div class="operations">
			<div class="operation audio">
				<img src="../../assets/close_audio@2x.png" />
				<span>麦克风</span>
			</div>
			<div class="operation hang_out">
				<img src="../../assets/hang_out2@2x.png" />
				<span>挂断</span>
			</div>
			<div class="operation video">
				<img src="../../assets/close_video@2x.png" />
				<span>摄像头</span>
			</div>
		</div>
	</div>

</template>

<script>
	import MyHeader from '../views/header.vue'
	export default {
		name: 'VideoClose',
		components: {
			MyHeader
		},
		data() {
			return {
				userInfo: {}
			}
		},
		computed: {
			firstName: function() {
				var userName = this.userInfo.name;
				return userName.substr(0, 1);
			}
		},
		created() {
			console.log(this.$route.params.userInfo)
			this.userInfo = this.$route.params.userInfo;
		},
		methods: {

		}
	}
</script>

<style scoped lang="less">
	.call {
		height: 100%;
		width: 100%;
		background: rgba(63, 62, 62, 0.5);
		display: flex;
		justify-content: center;
		position: relative;
		overflow-y: auto;
		.call_info {
			top: 526px;
			display: flex;
			position: absolute;
			align-items: center;
			flex-direction: column;
			.video_call {
				margin-bottom: 8px;
				span {
					font-size: 24px;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #F5F5F5;
					line-height: 33px;
				}
			}
			.video_info {
				span {
					font-size: 14px;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #F5F5F5;
					line-height: 20px;
				}
			}
		}
		.video_self {
			position: absolute;
			top: 88px;
			right: 14px;
			width: 110px;
			height: 140px;
			background-color: #FFFFFF;
		}
		.operations {
			position: absolute;
			top: 619px;
			width: 295px;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			padding-bottom: 71px;
			.operation {
				text-align: center;
				span {
					font-size: 16px;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #F5F5F5;
					line-height: 22px;
				}
			}
			.audio {
				width: 60px;
				padding-top: 15px;
				img {
					width: 60px;
					margin-bottom: 23px;
				}
			}
			.hang_out {
				width: 90px;
				img {
					width: 90px;
					margin-bottom: 10px;
				}
			}
			.video {
				width: 60px;
				padding-top: 15px;
				img {
					width: 60px;
					margin-bottom: 23px;
				}
			}
		}
	}
</style>