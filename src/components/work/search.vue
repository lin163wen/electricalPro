<template>
	<div>
		<!-- 'title','hasRight','back','parting','search','upload' -->
		<my-header title="搜索" back="true"></my-header>
		<div class="search">
			<div class="search_btn">
				<van-search v-model="value" shape="round" background="#f4f4f4" placeholder="请输入搜索关键词" />
				<div class="search_cancel">取消</div>
			</div>
			<div class="search_result" v-if="searchResultNum>0">
				<div class="result">
					<div class="content" @click="missionDetail()">
						<img class="icon" src="../../assets/search_result@2x.png" />
						<div class="text">
							<div class="text_title">稿件标题稿件标题稿件标题稿件标题</div>
							<div class="text_time">2020-02-02 22:22</div>
						</div>
					</div>
				</div>
				<div class="result">
					<div class="content" @click="missionDetail()">
						<img class="icon" src="../../assets/search_result@2x.png" />
						<div class="text">
							<div class="text_title">稿件标题稿件标题稿件标题稿件标题稿件标题稿件标题稿件标题稿件标题稿件标题稿件标题稿件标题稿件标题稿件标题稿件标题稿件标题稿件标题稿件标题稿件标题稿件标题稿件标题稿件标题稿件标题稿件标题稿件标题稿件标题稿件标题稿件标题稿件标题稿件标题稿件标题稿件标题稿件标题稿件标题稿件标题稿件标题稿件标题</div>
							<div class="text_time">2020-02-02 22:22</div>
						</div>
					</div>
				</div>
			</div>
			<div class="search_no_data" v-if="searchResultNum<=0">
				<div class="no_data_img"></div>
				<div class="no_data_text">暂时没有搜到任务</div>
			</div>
		</div>
	</div>
</template>

<script>
	import MyHeader from '../views/header.vue'
	export default {
		name: 'Search',
		components: {
			MyHeader
		},
		data() {
			return {
				searchResultNum: 0
			}
		},
		methods: {
			parting() {
				this.$router.push('/Material?headerTitle=分类1')
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
			background-color: #f4f4f4;
			.result {
				background-color: #ffffff;
				display: flex;
				flex-direction: column;
				margin-bottom: 13px;
				min-height: 240px;
				.content {
					display: flex;
					flex-wrap: nowrap;
					padding-bottom: 30px;
					padding-top: 23px;
					margin-left: 23px;
					border-bottom: solid #ededed 1px;
					.icon {
						height: 200px;
						width: 171px;
					}
					.text {
						margin: 5px 0px 0px 22px;
						text-align: left;
						font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
						font-weight: 400;
						.text_title {
							width: 520px;
							font-size: 26px;
							color: #333333;
							min-height: 140px;
							max-width: 506px;
						}
						.text_time {
							margin-top: 19px;
							font-size: 24px;
							color: #999999;
							letter-spacing: 0px;
						}
					}
				}
			}
		}
	}
</style>
