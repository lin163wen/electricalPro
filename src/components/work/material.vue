<template>
  <div>
    <!-- 'title','hasRight','back','parting','search','upload' -->
    <my-header :title="partingTitle" back="true" hasRight="true" parting="true" search="true" backUrl="/Work"></my-header>
    <div class="material_content">
      <van-tabs v-model="active" color="#ffaf6f">
        <van-tab title="图片">
          <div class="content">
            <van-list class="list" style="display: flex;flex-direction: row;flex-wrap: wrap;" v-model="loading"
              :finished="finished" finished-text="没有更多了" @load="queryImages()">
              <div class="list_item" v-for="(item,index) in list" @click="goDetail(item)">
                <!--<em class="item_mask"><span>{{item.status==0?"未标引":(item.status==1?"审核中":"已标引")}}</span></em>-->
                <em class="item_mask"><span>{{item.accessUrl?"上传成功":"上传失败"}}</span></em>
                <img :src="item.accessUrl" />
              </div>
            </van-list>
          </div>
        </van-tab>
        <van-tab title="视频">
          <div class="content">
            <van-list class="list" style="display: flex;flex-direction: row;flex-wrap: wrap;" v-model="loading"
              :finished="finished" finished-text="没有更多了" @load="queryVideos()">
              <div class="list_item" v-for="(item,index) in list" @click="goDetail(item)">
                <!--<em class="item_mask"><span>{{item.status==0?"未标引":(item.status==1?"审核中":"已标引")}}</span></em>-->
                <em class="item_mask"><span>{{item.accessUrl?"上传成功":"上传失败"}}</span></em>
                <img :src="item.accessUrl" />
              </div>
            </van-list>
          </div>
        </van-tab>
        <van-tab title="音频">
          <div class="content">
            <van-list class="list" style="display: flex;flex-direction: row;flex-wrap: wrap;" v-model="loading"
              :finished="finished" finished-text="没有更多了" @load="queryAudios()">
              <div class="list_item" v-for="(item,index) in list" @click="goDetail(item)">
                <!--<em class="item_mask"><span>{{item.status==0?"未标引":(item.status==1?"审核中":"已标引")}}</span></em>-->
                <em class="item_mask"><span>{{item.accessUrl?"上传成功":"上传失败"}}</span></em>
                <img :src="item.accessUrl" />
              </div>
            </van-list>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <div class="upload_div" v-if="curCagetory==2">
    	<van-uploader :before-read="getFileInfo" :after-read="uploadComplete" accept="image/*" v-if="active==0">
        <div class="upload_btn">
          <span>上传素材</span>
        </div>
      </van-uploader>
      <van-uploader :before-read="getFileInfo" :after-read="uploadComplete" accept="video/*" v-if="active==1">
        <div class="upload_btn">
          <span>上传素材</span>
        </div>
      </van-uploader>
      <van-uploader :before-read="getFileInfo" :after-read="uploadComplete" accept="audio/*" v-if="active==2">
        <div class="upload_btn">
          <span>上传素材</span>
        </div>
      </van-uploader>
      <!-- <input class="upload_btn" type="file" value="上传素材"/> -->
      <!-- <div class="upload_btn">
        <span>上传素材</span>
      </div> -->
    </div>
    <div :class="cagetoryClass" @click="changeCagetory()"></div>
  </div>

</template>

<script>
  import MyHeader from '../views/header.vue'
  import {
    Uploader
  } from 'vant';
  import {
    OfficialImages,
    PrivateImages,
    PublicImages,
    OfficialVideos,
    PrivateVideos,
    PublicVideos,
    OfficialAudios,
    PrivateAudios,
    PublicAudios,
    ImageUpload,VideoUpload,AudioUpload
  } from '../../utils/request.js'
  import {
    Toast
  } from 'vant';
  export default {
    name: 'Material',
    components: {
      MyHeader
    },
    data() {
      return {
        active: this.common.materialType==3?0:(this.common.materialType==2?1:2),
        pageSize: 40,
        partingTitle: this.common.parting.value ? this.common.parting.value : '素材',
        partingCode: this.common.parting.code ? this.common.parting.code : '',
        curCagetory: 2,
        list: [],
        loading: false,
        finished: false,
        pageNum: 1,
      }
    },
    watch: {
      active: function(val, oldVal) {
        this.curCagetory = 2; //默认显示个人
        this.initQueryParams();
        this.common.setParting('', ''); //清空分类
        this.partingTitle = '素材'
        this.partingCode = '';
        this.finished=false;
        this.loading=true;
        this.list=[];
        this.pageNum=1;
        
        if (val == 0) { //image
          this.common.setMaterialType(3);
          if(this.loading){
          	this.queryImages();
          }
          //this.queryImages();
        } else if (val == 1) { //video
          this.common.setMaterialType(2);
          if(this.loading){
          	this.queryVideos();
          }
          //this.queryVideos();
        } else if (val == 2) { //audio
          this.common.setMaterialType(1);
          if(this.loading){
          	this.queryAudios();
          }
          //this.queryAudios();
        }
      }
    },
    created() {
      //this.setActived();
    },
    computed: {
      cagetoryClass: function() {
        if (this.curCagetory == 0) {
          return 'cagetory official';
        } else if (this.curCagetory == 1) {
          return 'cagetory public';
        } else if (this.curCagetory == 2) {
          return 'cagetory private';
        }
      }
    },
    methods: {
//  	  setActived(){
//  	  	console.log('setActived',this.common.materialType);
//  	  	if(this.common.materialType==3){
//  	  		this.active=0
//  	  	}else if(this.common.materialType==2){
//  	  		this.active=1
//  	  	}else if(this.common.materialType==1){
//  	  		this.active=2
//  	  	}
//  	  },
      getFileInfo(file, detail) {
        //TODO
        return true;
      },
      uploadComplete(file) {
        var _this = this;
        var size = file.file.size;

        const data = new FormData();
        data.append("file", file.file);
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            'token':localStorage.getItem('token')
          }
        }; //添加请求头
        this.$http.post('/api/asset/common/oss/push-url', data, config)
          .then(response => {
            if(response.data.code==0){
                _this.initQueryParams()
                var params = this.getParamsFromOssPush(response.data.data,size);
                if(_this.active==0){
                  ImageUpload(params)
                  .then(response =>{
                    if(response.code==0){
                      Toast('上传成功');
                      _this.queryImages();
                    }else{
                      Toast(response.message);
                    }
                  })
                  .catch(err =>{
                    console.log(err);
                  })
                }else if(_this.active==1){
                  VideoUpload(params)
                  .then(response =>{
                    if(response.code==0){
                      Toast('上传成功');
                      _this.queryVideos();
                    }else{
                      Toast(response.message);
                    }
                  })
                  .catch(err =>{
                    console.log(err);
                  })
                }else if(this.active==2){
                  AudioUpload(params)
                  .then(response =>{
                    if(response.code==0){
                      Toast('上传成功');
                      _this.queryAudios();
                    }else{
                      Toast(response.message);
                    }
                  })
                  .catch(err =>{
                    console.log(err);
                  })
                }
            }else{
              Toast(response.data.message);
            }
            console.log(response);
          }).catch(err => {
            console.log(err);
          });
      },
      getParamsFromOssPush(data,size){
        console.log(data);
        var dataArr =data.split("/");
        var image = dataArr[dataArr.length-1]
        return {
          objKey:image,
          name:image,
          dpi:'',
          size:size,
          extension:image.split(".")[1],
          source:0,
          medialYear:new Date().getFullYear()
        }
      },
      initQueryParams() {
        this.pageNum = 1;
        this.loading = false;
        this.finished = false;
        this.list = [];
      },
      queryImages() {
        if (this.curCagetory == 0) {
          this.queryMaterial(OfficialImages({
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            categoryId: this.partingCode
          }));
        } else if (this.curCagetory == 1) {
          this.queryMaterial(PublicImages({
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            categoryId: this.partingCode
          }));
        } else if (this.curCagetory == 2) {
          this.queryMaterial(PrivateImages({
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            categoryId: this.partingCode
          }));
        }
      },
      queryVideos() {
        if (this.curCagetory == 0) {
          this.queryMaterial(OfficialVideos({
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            categoryId: this.partingCode
          }));
        } else if (this.curCagetory == 1) {
          this.queryMaterial(PublicVideos({
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            categoryId: this.partingCode
          }));
        } else if (this.curCagetory == 2) {
          this.queryMaterial(PrivateVideos({
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            categoryId: this.partingCode
          }));
        }
      },
      queryAudios() {
        if (this.curCagetory == 0) {
          this.queryMaterial(OfficialAudios({
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            categoryId: this.partingCode
          }));
        } else if (this.curCagetory == 1) {
          this.queryMaterial(PublicAudios({
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            categoryId: this.partingCode
          }));
        } else if (this.curCagetory == 2) {
          this.queryMaterial(PrivateAudios({
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            categoryId: this.partingCode
          }));
        }
      },
      goDetail(item) {
        this.$router.push({
          name: 'MaterialDetail',
          params: {
            id: item.id
          }
        })
      },
      queryMaterial(queryFuc) {
        var _this = this;
        queryFuc.then(response => {
            if (response.code == 0) {
              _this.list = _this.list.concat(response.list);
              if (_this.list.length == response.total) {
                _this.finished = true;
              } else {
                _this.pageNum++;
              }
              _this.loading = false
            } else {
              Toast(response.message);
            }
          })
          .catch(err => {
            console.log(err);
          })
      },
      changeCagetory() {
        this.curCagetory = (this.curCagetory + 1) % 3;
        this.common.setCagetory(this.curCagetory);
        this.initQueryParams();
      }
    }
  }
</script>

<style scoped lang="less">
  .material_content {
    height: 1110px;
    max-height: 1110px;
    overflow-y: scroll;

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
            background: rgba(0, 0, 0, 0.6);
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

  .upload_div {
    width: 100%;
    height: 112px;
    position: fixed;
    bottom: 0;
    background: #e5e5e5;

    .upload_btn {
      width: 539px;
      height: 99px;
      margin-top: 12px;
      margin-left: 106px;
      background: url(../../assets/upload_btn@2x.png) no-repeat;
      background-size: 100% 100%;
      text-align: center;

      span {
        font-size: 33px;
        font-family: Microsoft YaHei Regular;
        color: #ffffff;
        line-height: 99px;
        letter-spacing: 1px;
      }
    }
  }

  .cagetory {
    width: 108px;
    height: 108px;
    position: fixed;
    bottom: 105px;
    right: 13px;
  }

  .official {
    background: url(../../assets/official@2x.png) no-repeat;
    background-size: 100% 100%;
  }

  .public {
    background: url(../../assets/public@2x.png) no-repeat;
    background-size: 100% 100%;
  }

  .private {
    background: url(../../assets/private@2x.png) no-repeat;
    background-size: 100% 100%;
  }
</style>
