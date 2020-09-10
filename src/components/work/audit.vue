<template>
	<div class="list_div">
		<!-- 'title','hasRight','back','parting','search','upload' -->
		<my-header title="审稿" back="true" backUrl="Work"></my-header>
    <div class="audit_num" v-if="auditNum>0 && showFresh" @click="refresh()">有{{auditNum}}条任务，点击刷新</div>
    <div class="order">
      <div class="order_text" @click="order()">
        时间
        <img src="../../assets/order@2x.png" v-if="!timeOrder">
        <img src="../../assets/order_reverse@2x.png" v-if="timeOrder">
      </div>
    </div>
		<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="queryAudits" class="list">
			<div class="content" @click="missionDetail(item)" :key="index" v-for="(item,index) in auditList">
				<div class="icon">
				  审
				</div>
				<div class="text">
					<div class="text_title">{{item.title}}</div>
					<div class="text_lanmu">{{item.channelName}}</div>
				  <div class="text_author_time">
				    <div class="text_author">作者：{{item.author}}</div>
				    <div class="text_time">{{item.lastModifyTime}}</div>
				  </div>
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
				rows: 10,
        auditNum:0,
        showFresh:true,
        timeOrder:false,
			}
		},
    created() {
      var _this = this;
      setTimeout(function(){
        _this.showFresh = false;
      },5000)
    },
		methods: {
      order(){
        this.timeOrder = !this.timeOrder;
        if(this.timeOrder){
          this.auditList = this.auditList.sort(function(a,b){
            var time = new Date(a.lastModifyTime.replace(/\-/g,'/')).getTime()-new Date(b.lastModifyTime.replace(/\-/g,'/')).getTime();
            return time;
          })
        }else{
          this.auditList = this.auditList.sort(function(a,b){
            var time = new Date(b.lastModifyTime.replace(/\-/g,'/')).getTime()-new Date(a.lastModifyTime.replace(/\-/g,'/')).getTime();
            return time;
          })
        }

        console.log(this.auditList[0]);
      },
      resetData(){
        this.auditList=[];
        this.loading=false;
        this.finished=false;
        this.auditNum=0;
        this.showFresh = true;
        console.log(this.auditList.length);
      },
      refresh(){
        this.resetData();
      },
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
            _this.auditNum +=list.length;
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
				this.$router.push('/MissionDetail')
			}
		}
	}
</script>

<style scoped lang="less">
	.list_div{
		height: 100%;
    .audit_num {
      width: 375px;
      height: 40px;
      background: rgba(0, 156, 134, 0.9);
    	font-size: 12px;
    	font-family: PingFangSC-Regular, PingFang SC;
    	font-weight: 400;
    	color: #FFFFFF;
    	line-height: 40px;
      text-align: center;
      position: fixed;
      top:44px;
    }
    .order{
      margin-top: 44px;
      width: 100%;
      height: 40px;
      background:#FFFFFF;
      position: relative;


      .order_text{
        line-height: 40px;
        float: right;
        position: relative;
        margin-right: 15px;
        img{
          height: 16px;
          transform: translateY(4px);
        }
      }

    }
		.list{
      background:#FFFFFF;
      .content {
      	display: flex;
      	flex-wrap: nowrap;
      	padding-bottom: 10px;
      	padding-top: 10px;
      	margin-left: 16px;
      	.icon {
      		width: 60px;
      		height: 60px;
      		background: #009C86;
      		border-radius: 30px;
          text-align: center;
          font-size: 24px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #FFFFFF;
          line-height: 60px;
      	}
      	.text {
          margin-left: 34px;
          max-width: 250px;
          width: 250px;
          overflow: hidden;
          .text_title{
            font-size: 14px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #3F3E3E;
            line-height: 20px;
            margin-bottom: 5px;
          }
          .text_lanmu{
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #838383;
            line-height: 20px;
            margin-bottom: 6px;
          }
          .text_author_time{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            .text_author{
              font-size: 12px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #009C86;
              line-height: 17px;
            }
            .text_time {
              font-size: 12px;
              font-family: DIN-Regular, DIN;
              font-weight: 400;
              color: #BABABA;
              line-height: 15px;
            }
          }

      	}
      }
    }
	}
</style>
