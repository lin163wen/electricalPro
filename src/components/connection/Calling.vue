<template>
	<div class="call">
		<div class="call_member">
			<div class="first_name">
				<span>{{firstName}}</span>
			</div>
			<div class="name">
				<span>{{userInfo.name}}</span>
			</div>
			<div class="section">
				<span>{{userInfo.orgName}}</span>
			</div>
		</div>
		<div class="call_status">
			<span>对方手机可能不在身边建议稍后尝试...</span>
		</div>
		<div class="operations">
			<!-- <div class="audio">
        <span>麦克风</span>
      </div>
      <div class="hang_out">
        <span>挂断</span>
      </div>
      <div class="video">
        <span>摄像头</span>
      </div> -->
			<div class="operation hang_up" @click="hangUp()">
				<img src="../../assets/hang_up@2x.png" />
				<span>挂断</span>
			</div>
			<div class="operation switch" @click="hangUp()">
				<img src="../../assets/switch@2x.png" />
				<span>转到语音</span>
			</div>
		</div>
	</div>

</template>

<script>
	import MyHeader from '../views/header.vue'
	export default {
		name: 'Calling',
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
			hangUp() {
				this.$router.push({
					name: 'ConnectDetails',
					params: {
						user: this.userInfo
					}

				})
			}
		}
	}
</script>

<style scoped lang="less">
	.call {
		height: 100%;
		width: 100%;
		background: rgba(63,62,62,0.5);
		display: flex;
		position: relative;
		overflow-y: auto;
		justify-content: center;
		.call_member {
			top: 88px;
			display: flex;
			position: absolute;
			align-items: center;
			flex-direction: column;
			.first_name {
				width: 110px;
				height: 110px;
				background: #f4f4f4;
				border: 3px solid #1f7ee5;
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
				span {
					font-size: 36px;
					font-family: Microsoft YaHei Regular;
					color: #181717;
					line-height: 11px;
					letter-spacing: 5px;
				}
			}
			.name {
				margin-top: 30px;
				span {
					font-size: 21px;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #F5F5F5;
					line-height: 29px;
				}
			}
			.section {
				margin-top: 10px;
				span {
					font-size: 18px;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #F5F5F5;
					line-height: 25px;
				}
			}
		}
		.call_status {
			margin-top: 541px;
			span {
				font-size: 16px;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #F5F5F5;
				line-height: 22px;
			}
		}
		.operations {
			position: absolute;
			top: 647px;
			display: flex;
			flex-direction: row;
			justify-content: center;
			padding-bottom: 71px;
			.hang_up {
				margin-right: 115px;
			}
			.operation {
				width: 64px;
				text-align: center;
				img {
					width: 60px;
					height: 60px;
					margin-bottom: 25px;
				}
				span {
					font-size: 16px;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #F5F5F5;
					line-height: 22px;
				}
			}
		}
	}
</style>