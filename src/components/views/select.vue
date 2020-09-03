<template>
	<div class="select">
		<div class="inner">
			<div class="inputWrapper" @click.stop="showOptions = !showOptions">
				<div class="input" contenteditable="true">{{selectedText}}</div>
				<!-- <img src="../../assets/reject_selector@2x.png" class="iconfont"/> -->
				<div class="iconfont"></div>
			</div>
			<ul class="options" v-show="showOptions">
				<li v-for="(item, index) in list" :key="index" :value="item.value" @click.stop="choose(item)">{{item.text}}</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'MySelect',
		data() {
			return {
				showOptions: false,
				list: [{
					text: '个人1',
					value: '1'
				}, {
					text: '个人2',
					value: '1'
				}, {
					text: '个人3',
					value: '1'
				}],
				selectedText: '个人1',
				selectedValue: '1'
			}
		},
		mounted() {
			let that = this
			document.addEventListener('click', function() {
				that.showOptions = false
			})
		},
		methods: {
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
	.select {
		position: fixed;
		top: 0;left: 0;
		.inner {
			.inputWrapper {
				display: flex;
				flex-direction: row;
				.input {
					font-size: 16px;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #3F3E3E;
					line-height: 22px;
					width: auto;
				}
				.iconfont {
					width: 0px;
					height: 8px;
					border: 8px solid;
					border-color: #4783FE transparent transparent transparent;
					transform: translateY(30%);
					margin-left: 10px;
				}
			}
			.options {
				background: #FFFFFF;
				box-shadow: 0px 2px 24px 0px rgba(0, 0, 0, 0.12);
				border-radius: 0px 10px 10px 10px;
				li {
					font-size: 14px;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: #4783FE;
					line-height: 20px;
				}
			}
		}
	}
</style>