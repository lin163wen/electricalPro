<template>
	<div>
		<!-- 'title','hasRight','back','parting','search','upload' -->
		<my-header title="分类" back="true" backUrl="/Material"></my-header>
		<div class="material_content">
			<van-cell :title="item.value" :code="item.code" v-for="(item,index) in partings" :key="index" @click="goPartingMaterial(item)" />
		</div>
	</div>

</template>

<script>
	import NavigateBar from '../views/navigateBar.vue'
	import MyHeader from '../views/header.vue'
	import {getParting} from '../../utils/request.js'
	import { Toast } from 'vant';
	export default {
		name: 'Parting',
		components: {
			MyHeader
		},
		data() {
			return {
				partings:[]
			}
		},
		created(){
			this.parting();
		},
		methods: {
			parting() {
				var _this = this;
				getParting({materialType:this.common.materialType})
				.then(response =>{
					if(response.code==0){
						_this.partings = response.list
					}else{
						Toast(response.message);
					}
				}).catch(err =>{
					console.log(err);
				});
				//this.$router.push('/Material?headerTitle=分类1')
			},
			goPartingMaterial(item){
				this.common.setParting(item.value,item.code);
				this.$router.push('Material')
			}
		}
	}
</script>

<style scoped lang="less">
	.material_content {
		margin-top: 8px;
		height: 1215px;
		background: #f4f4f4 !important;
	}
</style>