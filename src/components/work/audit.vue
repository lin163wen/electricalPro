<template>
	<div class="list_div">
		<!-- 'title','hasRight','back','parting','search','upload' -->
		<my-header title="审稿" back="true" backUrl="Work"></my-header>
		<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="queryAudits">
			<div class="content" @click="missionDetail(item)" :key="index" v-for="(item,index) in auditList">
				<img class="icon" src="../../assets/check@2x.png" />
				<div class="text">
					<div class="text_title">{{item.title}}</div>
					<div class="text_lanmu">{{item.columnName}}</div>
					<div class="text_time">{{item.lastModifyTime}}</div>
				</div>
			</div>
		</van-list>
	</div>

</template>

<script>
	import NavigateBar from '../views/navigateBar.vue'
	import MyHeader from '../views/header.vue'
	import { AuditList } from '../../utils/request.js'
	import { Toast } from 'vant';
	export default {
		name: 'Audit',
		components: {
			NavigateBar,
			MyHeader
		},
		data() {
			return {
				auditList: [],
				loading: false,
				finished: false,
				page: 1,
				rows: 10
			}
		},
		methods: {
			queryAudits() {
				var _this = this;
				AuditList({
					pageNum: _this.page,
					pageSize: _this.rows
				}).then((response) => {
					if(response.code == 0) {
						var total = response.total;
						var list = response.list;
						_this.auditList = _this.auditList.concat(list);
						console.log(_this.auditList.length, total);
						if(_this.auditList.length == total) {
							_this.finished = true;
						} else {
							_this.page++;
						}
						_this.loading = false;

					} else {
						Toast(response.message);
						if(response.code == 401) {
							_this.$router.push('/Login')
						}
					}
				}).catch((response) => {
					console.log(response);
				})

			},
			missionDetail(item) {
				localStorage.setItem('storyId',item.storyId);
				localStorage.setItem('auditId',item.auditId);
				this.$router.push('/AuditDetail')
			}
		}
	}
</script>

<style scoped lang="less">
	.list_div{
		height: 100%;
		padding: 111px 0 0;
		box-sizing: border-box;
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
	}
</style>