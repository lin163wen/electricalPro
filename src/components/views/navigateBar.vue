<template>
	<van-tabbar v-model="navigateBarIndex" @change="change">
		<van-tabbar-item to='/Mission' :badge="missionNum" :key="missionNum">
			<template #icon="props">
				<img :src="navigateBarIndex==0 ? icon_mission.active : icon_mission.inactive" class="navigateBar_icon" />
			</template>
		</van-tabbar-item>
		<van-tabbar-item to="/Work">
			<template #icon="props">
				<img :src="navigateBarIndex==1 ? icon_work.active : icon_work.inactive" class="navigateBar_icon" />
			</template>
		</van-tabbar-item>
		<van-tabbar-item to="/Connection">
			<template #icon="props">
				<img :src="navigateBarIndex==2 ? icon_communication.active : icon_communication.inactive" class="navigateBar_icon" />
			</template>
		</van-tabbar-item>
		<van-tabbar-item to="/Mine">
			<template #icon="props">
				<img :src="navigateBarIndex==3 ? icon_mine.active : icon_mine.inactive" class="navigateBar_icon" />
			</template>
		</van-tabbar-item>
	</van-tabbar>
</template>

<script>
	import { NavBar } from 'vant';
	import mission_unselected from '../../assets/mission@2x.png'
	import mission_selected from '../../assets/mission_selected@2x.png'
	import work_unselected from '../../assets/work@2x.png'
	import work_selected from '../../assets/work_selected@2x.png'
	import communication_unselected from '../../assets/communication@2x.png'
	import communication_selected from '../../assets/communication_selected@2x.png'
	import mine_unselected from '../../assets/mine@2x.png'
	import mine_selected from '../../assets/mine_selected@2x.png'
	export default {
		name: "NavigateBar",
		data() {
			return {
				navigateBarIndex:this.common.navigateBarIndex,
				missionNum:this.common.missionNum,
				icon_mission: {
					active: mission_selected,
					inactive: mission_unselected,
				},
				icon_work: {
					active: work_selected,
					inactive: work_unselected,
				},
				icon_communication: {
					active: communication_selected,
					inactive: communication_unselected,
				},
				icon_mine: {
					active: mine_selected,
					inactive: mine_unselected,
				}
			}
		},

		methods: {
			change(index){
				this.navigateBarIndex = index;
				this.common.setNavigateBarIndex(index);
				console.log(this.navigateBarIndex);
			},
			addClassName: function(path) {
				this.$router.replace(path);
			},
		}
	}
</script>

<style scoped="scoped" lang="less">
	.navigateBar_icon {
		width: 58px;
		height: 80px;
	}
</style>