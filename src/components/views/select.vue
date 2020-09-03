<template>
	<div class="select">
		<div class="inner">
			<div class="inputWrapper" @click.stop="showOptions = !showOptions">
				<div class="input">{{text}}</div>
				<!-- <img src="../../assets/reject_selector@2x.png" class="iconfont"/> -->
				<div class="iconfont" v-if="!showOptions"></div>
        <div class="iconfont_selected" v-if="showOptions"></div>
			</div>
			<ul class="options" v-show="showOptions">
				<li v-for="(item, index) in list" :class="getActive(item.value)" :key="index" :value="item.value" @click.stop="choose(item)">{{item.text}}</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'MySelect',
    props:['selectedText','selectedValue'],
		data() {
			return {
				showOptions: false,
				list: [{
					text: '个人',
					value: '2'
				}, {
					text: '共享',
					value: '1'
				}, {
					text: '成品',
					value: '0'
				}],
        text:'个人',
        value:'2'
			}
		},
    watch:{
      selectedValue:function(val,oldVal){
        this.list.forEach(item => {
          if(item.value==val){
            this.text=item.text;
            this.value = val;
          }
        })
      }
    },
		mounted() {
			let that = this
			document.addEventListener('click', function() {
				that.showOptions = false
			})
		},
		methods: {
      getActive(val){
        if(val==this.value){
          return 'li_active';
        }else{
          return 'li_inactive';
        }
      },
			choose(item) {
				this.showOptions = false
				if(item.value !== this.selected) {
					this.text = item.text;
					this.value = item.value;
				}
        this.$emit("select",this.value)
			}
		}
	}
</script>

<style scoped lang="less">
	.select {
		position: absolute;
		top: 0;left: 0;
		.inner {
			.inputWrapper {
				display: flex;
				flex-direction: row;
				.input {
					width: auto;
					font-size: 14px;
					font-family: PingFangSC-Medium, PingFang SC;
					font-weight: 500;
					color: #4783FE;
					line-height: 20px;
				}
				.iconfont {
					width: 0px;
					height: 10px;
					border: 5px solid;
					//border-color: #4783FE transparent transparent transparent;
          border-color: transparent transparent #4783FE transparent;
					//transform: translateY(-0);
					margin-left: 10px;
				}
        .iconfont_selected{
          width: 0px;
          height: 10px;
          border: 5px solid;
          //border-color: #4783FE transparent transparent transparent;
          border-color: #4783FE transparent transparent transparent;
          transform: translateY(5px);
          margin-left: 10px;
        }
			}
			.options {
				background: #FFFFFF;
				box-shadow: 0px 2px 24px 0px rgba(0, 0, 0, 0.12);
				border-radius: 0px 10px 10px 10px;
        li{
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          line-height: 20px;
          width: 55px;
          padding: 0px 8px 20px 8px;
        }
				.li_active {
					color: #4783FE;
				}
        .li_inactive{
          color: #939393;
        }
        li:nth-child(1) {
          padding-top: 10px;
        }
        li:last-child{
          padding-bottom: 10px;
        }
			}
		}
	}
</style>
