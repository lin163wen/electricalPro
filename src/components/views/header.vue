<template>
	<van-nav-bar :title="title" class="header">
		<template #left v-if="back">
			<img src="../../assets/back@2x.png" class="back" @click="goBack()" />
		</template>
		<template #right v-if='hasRight'>
			<div class="parting_btn" v-if="parting">
				<img src="../../assets/parting_btn@2x.png" @click="goParting()" />
			</div>
			<div class="search_btn" v-if="search">
				<img src="../../assets/search_btn@2x.png" @click="goSearch()" />
			</div>
			<div v-if="upload" class="upload">上传</div>
		</template>
	</van-nav-bar>
</template>

<script>
	export default {
		name: 'MyHeader',
		props: ['title', 'hasRight', 'back', 'parting', 'search', 'upload', 'backUrl','backParams'],
		data() {
			return {
				msg: 'Welcome to Your Vue.js App'
			}
		},
		created() {
			console.log(this.backUrl);
		},
		methods: {
			goBack() {
				if(this.backUrl) {
          if(this.backUrl=='emit'){
            console.log('emit....');
            this.$emit('goBack');
          }else{
            this.$router.push(this.backUrl);
          }
				} else {
					this.$router.back();
				}

			},
			goParting(){
				this.$router.push('/Parting')
			},
			goSearch(){
				this.$router.push('/Search')
			},
			onClickLeft() {
				console.log('left')
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	.header {
		height: 44px;
		background: #FFFFFF;
    position: fixed;
    width: 100%;
    top:0px;
		.back {
			height: 14px;
			width: 18px;
		}
	}
</style>
