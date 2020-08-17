
export default {
	navigateBarIndex:0,
	setNavigateBarIndex(index){
		this.navigateBarIndex = index;
	},
	
	missionNum:0,
	setMissionNum(num){
		this.missionNum = num;
	},
	materialType:3,//3Image,2video,1audio
	setMaterialType(type){
		this.materialType = type;
	},
	parting:{
		value:'',
		code:''
	},
	setParting(value,code){
		this.parting.value=value;
		this.parting.code=code;
	},
  curCagetory:2,//0成品，1公共，2个人
  setCagetory(cagetory){
    this.curCagetory = cagetory
  },
	about:require('@/assets/about@2x.png')
}
