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
					this.$router.push(this.backUrl);
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
		height: 111px;
		background: linear-gradient(#7c5dfb 0%, #41abff 100%);
		.back {
			height: 47px;
			width: 25px;
		}
		.parting_btn {
			width: 45px;
			height: 45px;
			margin-right: 21px;
			img {
				width: 45px;
				height: 45px;
			}
		}
		.search_btn {
			width: 41px;
			height: 42px;
			margin-right: 18px;
			img {
				width: 41px;
				height: 42px;
			}
		}
		.upload {
			width: 60px;
			height: 40px;
			font-size: 22px;
			margin: 0 10px;
		}
	}
</style>