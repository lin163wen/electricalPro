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
				<div class="content">
				  <van-list class="list" style="display: flex;flex-direction: row;flex-wrap: wrap;" v-model="loading"
				    :finished="finished" finished-text="没有更多了" @load="queryImages()">
				    <div class="list_item" v-for="(item,index) in list" @click="goDetail(item)">
				      <em class="item_mask"><span>{{item.status}}</span></em>
				      <img :src="item.accessUrl" />
				    </div>
				  </van-list>
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
			.content {
			  margin-top: 17px;
			  min-height: 1003px;
			  max-width: 100%;
			
			  .list {
			    .list_item {
			      width: 163px;
			      height: 193px;
			      margin-left: 18px;
			      margin-top: 18px;
			
			      .item_mask {
			        width: 163px;
			        height: 193px;
			        background: rgba(149, 143, 143, 0.6);
			        position: absolute;
			
			        span {
			          font-size: 24px;
			          font-family: Microsoft YaHei Regular;
			          color: #ffffff;
			          letter-spacing: 0px;
			          text-align: center;
			          display: block;
			          position: relative;
			          top: 50%;
			          transform: translateY(-50%);
			        }
			      }
			
			      img {
			        width: 163px;
			        height: 193px;
			      }
			    }
			  }
			}
		}
	}
</style>
