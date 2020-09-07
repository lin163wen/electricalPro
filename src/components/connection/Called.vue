<template>
	<div class="call">
		<div class="call_member">
			<div class="first_name">
				<span>林</span>
			</div>
			<div class="name">
				<span>林霖</span>
			</div>
			<div class="section">
				<span>福建融媒体</span>
			</div>
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
			<div class="operation answer">
				<img src="../../assets/answer@2x.png" />
				<span>接听</span>
			</div>
			<div class="operation hang_up">
				<img src="../../assets/hang_up@2x.png" />
				<span>挂断</span>
			</div>
		</div>
	</div>

</template>

<script>
	import MyHeader from '../views/header.vue'
	export default {
		name: 'Called',
		components: {
			MyHeader
		}
	}
</script>

<style scoped lang="less">
	.call {
		height: 100%;
		width: 100%;
		background: rgba(62, 63, 63, 0.5);
		display: flex;
		justify-content: center;
		position: relative;
		overflow-y: auto;
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
					font-size: 35px;
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
		.operations {
			position: absolute;
			top: 647px;
			display: flex;
			flex-direction: row;
			padding-bottom: 71px;
			.answer {
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