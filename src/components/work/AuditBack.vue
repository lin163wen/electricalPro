<template>
	<div style="height: 100%;">
		<!-- 'title','hasRight','back','parting','search','upload' -->
		<my-header title="退回" back="true" ref="header" backUrl='AuditDetail'></my-header>
		<div class="mission_back">
			<div class="mission_back_text"><span style="color: #ff4545;">*</span>退回节点</div>
			<div class="select">
				<div class="inner">
					<div class="inputWrapper" @click.stop="showOptions = !showOptions">
						<input type="text" readonly placeholder="请选择" :value="selectedText">
						<!-- <img src="../../assets/reject_selector@2x.png" class="iconfont"/> -->
						<div class="iconfont"></div>
					</div>
					<ul class="options" v-show="showOptions">
						<li v-for="(item, index) in auditSeqNums" :key="index" :value="item.value" @click.stop="choose(item)">{{item.text}}</li>
					</ul>
				</div>
			</div>
			<div class="mission_back_text">回退理由</div>
			<textarea id='reason' class="mission_back_textarea"></textarea>
			<span class="text_length">{{textLength}}<span>/200</span></span>
		</div>
		<div class="btn_div">
			<div class="cancel_btn" @click="cancel()">
				<span>取消</span>
			</div>
			<div class="reject_btn" @click="reject()">
				<span>退回</span>
			</div>
		</div>
	</div>

</template>

<script>
	import {
		DropdownMenu,
		DropdownItem
	} from 'vant';
	import MyHeader from '../views/header.vue'
	import {
		MissionReject
	} from '../../utils/request.js'
	import {
		Toast
	} from 'vant';
	export default {
		name: 'AuditBack',
		components: {
			MyHeader
		},
		data() {
			return {
				value1: 0,
				textLength: 0,
				showOptions: false,
				selectedText: '',
				selectedValue: '',
				storyId: this.$route.params.storyId,
				auditId: this.$route.params.auditId,
				auditSeqNum: this.$route.params.auditSeqNum,
				auditSeqNums: [],
				params: {
					storyId: this.storyId,
					auditId: this.auditId
				}
			}
		},
		mounted() {
			var _this = this;
			$("#reason").on("input propertychange", function() {
				console.log(11111)
				var $this = $(this),
					_val = $this.val(),
					count = "";
				if(_val.length > 200) {
					$this.val(_val.substring(0, 200));
				}
				count = $this.val().length;
				_this.textLength = count;
			});
			let that = this
			document.addEventListener('click', function() {
				that.showOptions = false
			})
		},
		created() {
			this.auditSeqNums = this.createSeqNums();
		},
		methods: {
			createSeqNums(){
				var arr = []
				for(var i=0;i<this.auditSeqNum;i++){
					if(i==0){
						arr.push({
							value:0,
							text:'草稿'
						})
					}else{
						arr.push({
							value:i,
							text:'节点'+i
						});
					}
				}
				if(this.auditSeqNum==0){
					arr.push({
							value:0,
							text:'草稿'
						})
				}
				return arr;
			},
			cancel() {
				this.$router.push({
					name: 'AuditDetail',
					params: {
						storyId: this.storyId,
						auditId: this.auditId
					}
				})
			},
			reject() {
				var _this = this;
				console.log(this.selectedValue);
				if(this.selectedValue===''){
					Toast('请选择退回节点');
					return;
				}
				MissionReject({
					storyId: this.storyId,
					auditId: this.auditId,
					seqNum: this.selectedValue
				}).then(response => {
					if(response.code == 0) {
						Toast('回退成功');
						_this.$router.push('/Audit');
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
			choose(item) {
				this.showOptions = false
				if(item.value !== this.selected) {
					this.selectedText = item.text;
					this.selectedValue = item.value;
				}
			}
		}
	}
</script>

<style scoped lang="less">
	.ul,
	ol,
	li {
		list-style: none;
	}
	
	.mission_back {
		display: flex;
		flex-direction: column;
		text-align: left;
		padding-left: 50px;
		padding-top: 100px;
		.select {
			width: 632px;
			height: 96px;
			margin-top: 15px;
			margin-bottom: 30px;
			.inner {
				position: relative;
				margin: 0 auto;
				width: 632px;
				height: 100%;
				font-size: 26px;
				font-family: Microsoft YaHei Regular;
				font-weight: 400;
				text-align: left;
				color: #96999a;
				letter-spacing: 1px;
				.inputWrapper {
					width: 632px;
					height: 100%;
					/* background: url(../../assets/reject_selector@2x.png) right center no-repeat;
          background-size: 32px 28px; */
					>input {
						width: 602px;
						height: 100%;
						border: 2px solid #d1d1d1;
						background: #f4f4f4;
						padding-left: 29px;
						cursor: pointer;
					}
					.iconfont {
						width: 32px;
						height: 28px;
						background: url(../../assets/reject_selector@2x.png) right center no-repeat;
						background-size: 32px 28px;
						position: absolute;
						top: 34px;
						right: 28px;
					}
				}
				>.options {
					width: 632px;
					position: absolute;
					right: -4px;
					margin: 5px 0;
					background-color: #fff;
					box-shadow: 0 0 4px #ddd;
					border-radius: 3px;
					overflow: auto;
					border: 2px solid #d1d1d1;
					border-top: none;
					>li {
						font-size: 26px;
						font-family: Microsoft YaHei Regular;
						font-weight: 400;
						text-align: left;
						color: #96999a;
						padding: 20px 0px;
						cursor: pointer;
						margin-left: 29px;
						&:hover {
							background-color: #eee;
						}
					}
				}
			}
		}
		.mission_back_text {
			font-size: 30px;
			font-family: Microsoft YaHei Regular;
			font-weight: 400;
			text-align: left;
			color: #333333;
			letter-spacing: 1px;
			margin-bottom: 15px;
		}
		.mission_back_textarea {
			width: 632px;
			height: 495px;
			max-width: 632px;
			max-height: 495px;
			font-size: 32px;
			font-family: Microsoft YaHei Regular;
			background: #f4f4f4;
			border: 2px solid #d1d1d1;
		}
		.text_length {
			font-size: 25px;
			font-family: Microsoft YaHei Regular;
			font-weight: 400;
			text-align: left;
			color: #a7aaab;
			letter-spacing: 1px;
			position: absolute;
			right: 83px;
			top: 930px;
		}
	}
	
	.btn_div {
		height: 112px;
		width: 100%;
		background: #e5e5e5;
		display: flex;
		position: absolute;
		bottom: 0;
		.cancel_btn {
			margin-left: 39px;
			margin-top: 12px;
			background-image: url(../../assets/cancel_btn@2x.png);
			background-size: 100% auto;
			width: 326px;
			height: 99px;
			text-align: center;
			span {
				font-size: 33px;
				font-family: Microsoft YaHei Regular;
				color: #ffffff;
				letter-spacing: 1px;
				line-height: 85px;
				height: 85px;
			}
		}
		.reject_btn {
			margin-left: 30px;
			margin-top: 22px;
			background-image: url(../../assets/reject_btn@2x.png);
			background-size: 100% auto;
			width: 308px;
			height: 81px;
			text-align: center;
			span {
				font-size: 33px;
				font-family: Microsoft YaHei Regular;
				color: #ffffff;
				letter-spacing: 1px;
				line-height: 70px;
				height: 70px;
			}
		}
	}
</style>