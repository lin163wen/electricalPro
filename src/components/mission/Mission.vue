<template>
	<div class="list_div" :key="missionListNum">
		<!-- 'title','hasRight','back','parting','search','upload' -->
		<my-header title="任务"></my-header>
		<div class="mission_num" v-if="missionListNum>0" @click="refresh()">有{{missionListNum}}条任务，点击刷新</div>
		<div class="mission_list" v-if="missionListNum>0">
			<div class="mission" v-for="(item,index) in missionList">
				<div class="content" @click="missionDetail(item)">
          <div class="icon">
            审
          </div>
					<div class="text">
						<div class="text_title">{{item.title}}</div>
						<div class="text_lanmu">{{item.channelName}}</div>
            <div class="text_author_time">
              <div class="text_author">作者：{{item.author}}</div>
              <div class="text_time">{{item.updateTime}}</div>
            </div>

					</div>
				</div>

			</div>
		</div>
		<div class="no_mission" v-if="missionListNum<=0">
			<div class="no_mission_img">
        <img src="../../assets/no_mission@2x.png" />
      </div>
			<div class="no_mission_text">暂时没有待办任务<br/><br/>喝口茶休息下吧~</div>
		</div>
		<navigate-bar></navigate-bar>
	</div>

</template>

<script>
	import NavigateBar from '../views/navigateBar.vue'
	import MyHeader from '../views/header.vue'
	import { Missions } from '../../utils/request.js'
	import { Toast } from 'vant';
	export default {
		name: 'Mission',
		components: {
			NavigateBar,
			MyHeader
		},
		data() {
			return {
				missionListNum: this.common.missionNum,
				missionList: [],
				componentKey: 0,
        missionListLoading:null
			}
		},
		created() {
			this.queryMissions();
		},
		methods: {
			missionDetail(item) {
				localStorage.setItem('storyId', item.storyId);
				localStorage.setItem('auditId', item.auditId);
				this.$router.push({
					name: 'MissionDetail',
					params: {
						storyId: item.storyId,
						auditId: item.auditId
					}
				});
			},
      refresh(){
        this.queryMissions();
      },
			queryMissions() {
				var _this = this;
        this.missionListLoading = Toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true,
        });
				Missions({}).then((response) => {
					console.log(response);
					if(response.code == 0) {
            _this.missionList = [];
						_this.missionList = response.data.storyTaskListResponseList;
						_this.common.setMissionNum(response.data.storyTaskListResponseList.length);
						_this.missionListNum = response.data.storyTaskListResponseList.length;
						console.log(_this.missionListNum);
					} else {
						Toast(response.message);
						if(response.code == 401) {
							_this.$router.push('/Login')
						}
					}
          _this.missionListLoading.clear();
				}).catch((response) => {
					console.log(response);
          _this.missionListLoading.clear();
				})

			}
		}
	}
</script>

<style scoped lang="less">
	.list_div {
		height: 100%;
    background: #999999;
		.mission_num {
      width: 375px;
      height: 40px;
      background: rgba(62, 126, 255, 0.86);
			font-size: 12px;
			font-family: PingFangSC-Regular, PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			line-height: 40px;
      text-align: center;
      position: fixed;
      top:44px;
		}
		.no_mission {
			background:#FFFFFF;
      height: 100%;
      div{
        position: absolute;
        bottom:0;right: 0;left: 0;
        margin: 0 auto;
        width: 110px;
      }
      .no_mission_img{
        top:251px;
        width: 110px;
        img{
          width: 110px;
          height: 150px;
        }
      }
      .no_mission_text{
        width: 120px;
        top:433px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #BABABA;
        line-height: 15px;
      }

		}
		.mission_list {
      padding-top: 44px;
      padding-bottom: 78px;
			background-color: #F0F0F0;
			display: flex;
			flex-direction: column;
			overflow: scroll;
      height: 100%;
			.mission {
				background-color: #ffffff;
				display: flex;
				flex-direction: column;
				margin-bottom: 3px;
				.content {
					display: flex;
					flex-wrap: nowrap;
					padding-bottom: 10px;
					padding-top: 10px;
					margin-left: 16px;
					.icon {
						width: 60px;
						height: 60px;
						background: #4783FE;
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
                color: #3E7EFF;
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
	}
</style>
