<template>
  <div class="list_div">
    <!-- 'title','hasRight','back','parting','search','upload' -->
    <my-header :title="partingTitle" back="true" hasRight="true" backUrl="/Work"></my-header>
    <div class="select_div" v-show="!showPreview">
      <my-select @select="select" :selectedValue="curCagetory"></my-select>
    </div>
    <div class="my_tab_div">
      <my-tab @search="search" @tabChange="tabChange"></my-tab>
    </div>
    <div class="parting">
      <van-dropdown-menu>
        <van-dropdown-item v-model="partingCode" :options="parting" @change="change()" />
      </van-dropdown-menu>
    </div>
    <div class="material_content">
      <!-- 图片 -->
      <div class="content" v-if="tabActive==1">
        <!-- 个人 -->
        <van-list class="list_private" v-model="loading" :finished="finished" finished-text="没有更多了" @load="queryImages()"
          v-if="curCagetory==2" :offset="10">
          <div class="list_item" v-for="(item,index) in list" @click="goDetailPrivate(item)">
            <div class="item_preview">
              <img :src="item.accessUrl" @error="imgError(item)" />
            </div>
            <div class="list_info">
              <div class="info_name">{{item.name}}</div>
              <div class="info_time">{{item.createTime}}</div>
            </div>
          </div>
        </van-list>
        <!-- 成品 -->
        <van-list class="list_official" v-model="loading" :finished="finished" finished-text="没有更多了" @load="queryImages()"
          v-if=" curCagetory==0" :offset="10">
          <div class="list_item" v-for="(item,index) in mapKeys(listWithTime)">
            <!--<em class="item_mask"><span>{{item.status==0?"未标引":(item.status==1?"审核中":"已标引")}}</span></em>-->
            <div class="list_time">
              {{item}}
            </div>
            <div class="imgs">
              <div class="img_item" v-for="(item2,index) in listWithTime[item]" @click="goDetailOfficial(item2)">
                <img :src="item2.accessUrl" @error="imgError(item2)" />
              </div>
            </div>

          </div>
        </van-list>
        <!-- 共享 -->
        <van-list class="list_public" v-model="loading" :finished="finished" finished-text="没有更多了" @load="queryImages()"
          v-if="curCagetory==1" :offset="10">
          <div class="list_item" v-for="(item,index) in mapKeys(listWithTime)">
            <!--<em class="item_mask"><span>{{item.status==0?"未标引":(item.status==1?"审核中":"已标引")}}</span></em>-->
            <div class="list_time">
              {{item}}
            </div>
            <div class="imgs">
              <div class="img_item" v-for="(item2,index) in listWithTime[item]" @touchstart.stop="start()" @touchend.stop="end(item2)"
                @touchmove="move()">
                <div class="normal" v-if="!showOperation">
                  <img :src="item2.accessUrl" @error="imgError(item2)"/>
                </div>
                <div class="operation" v-if="showOperation">
                  <div v-if="!item2.selected">
                    <div class="curcle" @click="chooseImg(item,item2,index)">
                    </div>
                    <div class="normal">
                      <img :src="item2.accessUrl" @error="imgError(item2)"/>
                    </div>
                  </div>
                  <div class="selected_div" v-if="item2.selected">
                    <div class="selected">
                      <div class="curcle" @click="unchooseImg(item,item2,index)">
                      </div>
                      <div class="normal">
                        <img :src="item2.accessUrl" @error="imgError(item2)"/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </van-list>
      </div>
      <!-- 视频 -->
      <div class="content" v-if="tabActive==2">
        <!-- 个人 -->
        <van-list class="list_private" v-model="loading" :finished="finished" finished-text="没有更多了" @load="queryVideos()"
          v-if="curCagetory==2" :offset="10">
          <div class="list_item" v-for="(item,index) in list" @click="goDetailPrivate(item)">
            <!--<em class="item_mask"><span>{{item.status==0?"未标引":(item.status==1?"审核中":"已标引")}}</span></em>-->
            <div class="item_preview">
              <img src="../../assets/video.png"/>
              <!-- <video :src="item.accessUrl" @error="imgError(item)" v-if="item.useful"/>
              <img src="../../assets/nofound.png" v-if="!item.useful"/> -->
            </div>
            <div class="list_info">
              <div class="info_name">{{item.name}}</div>
              <div class="info_time">{{item.createTime}}</div>
            </div>
          </div>
        </van-list>
        <!-- 成品 -->
        <van-list class="list_official" v-model="loading" :finished="finished" finished-text="没有更多了" @load="queryImages()"
          v-if="curCagetory==0" :offset="10">
          <div class="list_item" v-for="(item,index) in mapKeys(listWithTime)">
            <!--<em class="item_mask"><span>{{item.status==0?"未标引":(item.status==1?"审核中":"已标引")}}</span></em>-->
            <div class="list_time">
              {{item}}
            </div>
            <div class="imgs">
              <div class="img_item" v-for="(item2,index) in listWithTime[item]" @click="goDetailOfficial(item2)">
                <img src="../../assets/video.png" v-if="item2.useful"/>
                <!-- <video :src="item2.accessUrl" @error="imgError(item2)" v-if="item2.useful"/>
                <img src="../../assets/nofound.png" v-if="!item2.useful"/> -->
              </div>
            </div>
          </div>
        </van-list>
        <!-- 共享 -->
        <van-list class="list_public" v-model="loading" :finished="finished" finished-text="没有更多了" @load="queryImages()"
          v-if="curCagetory==1" :offset="10">
          <div class="list_item" v-for="(item,index) in mapKeys(listWithTime)">
            <!--<em class="item_mask"><span>{{item.status==0?"未标引":(item.status==1?"审核中":"已标引")}}</span></em>-->
            <div class="list_time">
              {{item}}
            </div>
            <div class="imgs">
              <div class="img_item" v-for="(item2,index) in listWithTime[item]" @touchstart.stop="start()" @touchend.stop="end(item2)"
                @touchmove="move()">
                <div class="normal" v-if="!showOperation">
                  <img src="../../assets/video.png" v-if="item2.useful"/>
                  <!-- <video :src="item2.accessUrl" @error="imgError(item2)" v-if="item2.useful"></video>
                  <img src="../../assets/nofound.png" v-if="!item2.useful"/> -->
                </div>
                <div class="operation" v-if="showOperation">
                  <div v-if="!item2.selected">
                    <div class="curcle" @click="chooseImg(item,item2,index)">
                    </div>
                    <div class="normal">
                      <img src="../../assets/video.png" v-if="item2.useful"/>
                      <!-- <video :src="item2.accessUrl" @error="imgError(item2)" v-if="item2.useful"></video>
                      <img src="../../assets/nofound.png" v-if="!item2.useful"/> -->
                    </div>
                  </div>
                  <div class="selected_div" v-if="item2.selected">
                    <div class="selected">
                      <div class="curcle" @click="unchooseImg(item,item2,index)">
                      </div>
                      <div class="normal">
                        <img src="../../assets/video.png" v-if="item2.useful"/>
                        <!-- <video :src="item2.accessUrl" @error="imgError(item2)" v-if="item2.useful"></video>
                        <img src="../../assets/nofound.png" v-if="!item2.useful"/> -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </van-list>
      </div>
      <!-- 音频 -->
      <div class="content" v-if="tabActive==3">
        <!-- 个人 -->
        <van-list class="list_private" v-model="loading" :finished="finished" finished-text="没有更多了" @load="queryAudios()"
          v-if="curCagetory==2" :offset="10">
          <div class="list_item audio_img" v-for="(item,index) in list" @click="goDetailPrivate(item)">
            <!--<em class="item_mask"><span>{{item.status==0?"未标引":(item.status==1?"审核中":"已标引")}}</span></em>-->
            <div class="item_preview">
              <!-- <audio :src="item.accessUrl" @error="imgError(item)" v-if="item.useful"/> -->
              <img src="../../assets/folder@2x.png"/>
              <!-- <img src="../../assets/nofound.png" v-if="!item.useful"/> -->
            </div>
            <div class="list_info">
              <div class="info_name">{{item.name}}</div>
              <div class="info_time">{{item.createTime}}</div>
            </div>
          </div>
        </van-list>
        <!-- 成品 -->
        <van-list class="list_official" v-model="loading" :finished="finished" finished-text="没有更多了" @load="queryImages()"
          v-if="curCagetory==0" :offset="10">
          <div class="list_item" v-for="(item,index) in mapKeys(listWithTime)">
            <!--<em class="item_mask"><span>{{item.status==0?"未标引":(item.status==1?"审核中":"已标引")}}</span></em>-->
            <div class="list_time">
              {{item}}
            </div>
            <div class="imgs">
              <div class="img_item" v-for="(item2,index) in listWithTime[item]" @click="goDetailOfficial(item2)">
                <!-- <audio :src="item2.accessUrl"  @error="imgError(item2)" v-if="item2.useful"/> -->
                <img src="../../assets/folder@2x.png"/>
                <!-- <img src="../../assets/nofound.png" v-if="!item2.useful"/> -->
              </div>
            </div>
          </div>
        </van-list>
        <!-- 共享 -->
        <van-list class="list_public" v-model="loading" :finished="finished" finished-text="没有更多了" @load="queryImages()"
          v-if="curCagetory==1" :offset="10">
          <div class="list_item" v-for="(item,index) in mapKeys(listWithTime)">
            <!--<em class="item_mask"><span>{{item.status==0?"未标引":(item.status==1?"审核中":"已标引")}}</span></em>-->
            <div class="list_time">
              {{item}}
            </div>
            <div class="imgs">
              <div class="img_item" v-for="(item2,index) in listWithTime[item]" @touchstart.stop="start()" @touchend.stop="end(item2)"
                @touchmove="move()">
                <div class="normal" v-if="!showOperation">
                  <!-- <audio :src="item2.accessUrl"  @error="imgError(item2)" v-if="item2.useful"/> -->
                  <img src="../../assets/folder@2x.png"/>
                  <!-- <img src="../../assets/nofound.png" v-if="!item2.useful"/> -->
                </div>
                <div class="operation" v-if="showOperation">
                  <div v-if="!item2.selected">
                    <div class="curcle" @click="chooseImg(item,item2,index)">
                    </div>
                    <div class="normal">
                      <!-- <audio :src="item2.accessUrl"  @error="imgError(item2)" v-if="item2.useful"/> -->
                      <img src="../../assets/folder@2x.png" v-if="item2.useful"/>
                      <!-- <img src="../../assets/nofound.png" v-if="!item2.useful"/> -->
                    </div>
                  </div>
                  <div class="selected_div" v-if="item2.selected">
                    <div class="selected">
                      <div class="curcle" @click="unchooseImg(item,item2,index)">
                      </div>
                      <div class="normal">
                        <!-- <audio :src="item2.accessUrl"  @error="imgError(item2)" v-if="item2.useful"/> -->
                        <img src="../../assets/folder@2x.png" v-if="item2.useful"/>
                        <!-- <img src="../../assets/nofound.png" v-if="!item2.useful"/> -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </van-list>
      </div>
    </div>
    <div class="multdown_div" v-if="curCagetory==1 && showOperation">
      <div class="multdown" @click="multDownload()">下载({{selectedUrls.length}})</div>
      <div class="cancel" @click="cancel()">取消</div>
    </div>
    <div class="upload_div" v-if="curCagetory==2">
      <van-uploader :before-read="getFileInfo" :after-read="uploadComplete" @change="changeImg($event)" accept="image/*"
        v-if="tabActive==1">
        <div class="upload_btn">
          上传素材
        </div>
      </van-uploader>
      <van-uploader :before-read="getFileInfo" :after-read="uploadComplete" @change="changeImg($event)" accept="video/*"
        v-if="tabActive==2">
        <div class="upload_btn">
          上传素材
        </div>
      </van-uploader>
      <van-uploader :before-read="getFileInfo" :after-read="uploadComplete" @change="changeImg($event)" accept="audio/*"
        v-if="tabActive==3">
        <div class="upload_btn">
          上传素材
        </div>
      </van-uploader>
      <!-- <input class="upload_btn" type="file" value="上传素材"/> -->
      <!--<div class="upload_btn" @click="uploaderFile('image')" v-if="active==0">
        <span>上传素材</span>
      </div>
      <div class="upload_btn" @click="uploaderFile('video')" v-if="active==1">
        <span>上传素材</span>
      </div>
      <div class="upload_btn" @click="uploaderFile('audio')" v-if="active==2">
        <span>上传素材</span>
      </div>-->
    </div>
    <!-- <navigate-bar></navigate-bar> -->
    <van-overlay :show="showPreview">
      <div class="wrapper">
        <div class="block" @click.stop>
          <img :src="previewSrc" @error="previewSrc=nofoundImg" v-if="tabActive==1" />
          <video id="myVideo" :src="previewSrc" @error="previewSrc=nofoundImg" controls="controls" v-if="tabActive==2" />
          <audio id="myAudio" :src="previewSrc" @error="previewSrc=nofoundImg" controls="controls" v-if="tabActive==3" />
        </div>
        <div class="upload_cancel_div" v-if="privatePreviewBtn">
          <div class="upload_cancel_btn" style="background: #E9021E;" @click="previewCancel();">取消</div>
        </div>
        <div class="upload_cancel_div" v-if="uploadPreviewBtn">
          <div class="upload_cancel_btn" @click="upload()">上传</div>
          <div class="upload_cancel_btn" style="background: #E9021E;" @click="previewCancel();">取消</div>
        </div>
        <div class="upload_cancel_div" v-if="officialPreviewBtn">
          <div class="upload_cancel_btn" @click="downloadByBlob(previewSrc,new Date().getTime())">下载</div>
          <div class="upload_cancel_btn" style="background: #E9021E;" @click="previewCancel();">取消</div>
        </div>
      </div>
    </van-overlay>
  </div>

</template>

<script>
  import MyHeader from '../views/header.vue'
  import MyTab from '../views/myTab.vue'
  import NavigateBar from '../views/navigateBar.vue'
  import MySelect from '../views/select.vue'
  import nofoundImg from '../../assets/nofound.png'
  import {
    Uploader,
    Overlay
  } from 'vant';
  import {
    domain,
    OfficialImages,
    PrivateImages,
    PublicImages,
    OfficialVideos,
    PrivateVideos,
    PublicVideos,
    OfficialAudios,
    PrivateAudios,
    PublicAudios,
    ImageUpload,
    VideoUpload,
    AudioUpload,
    getParting
  } from '../../utils/request.js'
  import {
    Toast
  } from 'vant';
  export default {
    name: 'Material',
    components: {
      MyHeader,
      MyTab,
      NavigateBar,
      MySelect
    },
    data() {
      return {
        nofoundImg:nofoundImg,
        pageSize: 10,
        partingTitle: this.common.parting.value ? this.common.parting.value : '素材',
        partingCode: this.common.parting.code ? this.common.parting.code : '',
        curCagetory:2,
        list: [],
        listWithTime: {},
        loading: false,
        finished: false,
        pageNum: 1,
        loginToast: null,
        tabActive: 1,
        keyWord: '',
        parting: [{
          text: '全部',
          value: ''
        }],
        previewSrc: '',
        showPreview: false,
        uploadPreviewBtn:false,
        privatePreviewBtn: false,
        officialPreviewBtn: false,
        formData: null,
        showOperation: false,
        timeOutEvent: 0,
        imgSelected: false,
        selectedUrls: [],
        play:true
      }
    },
    watch: {
      tabActive: function(val, oldVal) {
        //this.curCagetory = 2; //默认显示个人
        this.initQueryParams();
        this.common.setParting('', ''); //清空分类
        this.partingTitle = '素材'
        this.partingCode = '';
        this.keyWord = '';
        this.finished = false;
        this.loading = true;
        this.list = [];
        this.listWithTime = {};
        this.pageNum = 1;
        this.parting = [{
          text: '全部',
          value: ''
        }];
        if (val == 1) { //image
          this.common.setMaterialType(3);
          if (this.loading) {
            this.queryImages();
          }
        } else if (val == 2) { //video
          this.common.setMaterialType(2);
          if (this.loading) {
            this.queryVideos();
          }
        } else if (val == 3) { //audio
          this.common.setMaterialType(1);
          if (this.loading) {
            this.queryAudios();
          }
        }
        this.getParting();
      },
      curCagetory: function(val, oldVal) {
        //console.log(val);
      }
    },
    created() {
      //this.setActived();
      this.getParting();
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
      previewCancel(){
        this.showPreview = false;
        if(this.tabActive==2){//video
          var video = document.getElementById('myVideo');
          video.pause();
        }else if(this.tabActive==3){
          var audio = document.getElementById('myAudio');
          audio.pause();
        }

      },
      imgError(item){
        console.log(item.name+"####"+item.useful);
        item.useful=false;
        item.accessUrl=nofoundImg;
      },
      chooseImg(item,item2, index) {
        var itemTemp = this.listWithTime[item][index];
        itemTemp.selected=true;
        this.listWithTime[item].splice(index,1,itemTemp);
        this.selectedUrls.push(item2.accessUrl);
        console.log(this.selectedUrls)
      },
      unchooseImg(item,item2, index) {
        var itemTemp = this.listWithTime[item][index];
        itemTemp.selected=false;
        this.listWithTime[item].splice(index,1,itemTemp);
        var urlIndex = this.selectedUrls.indexOf(item2.accessUrl);
        this.selectedUrls.splice(urlIndex, 1);
        console.log(this.selectedUrls)
      },
      start() {
        let _this = this;
        clearTimeout(this.timeOutEvent); //清除定时器
        this.timeOutEvent = setTimeout(function() {
          _this.showOperation = true;
        }, 2000); //这里设置定时
      },
      move() {
        clearTimeout(this.timeOutEvent); //清除定时器
        this.timeOutEvent = 0;
      },
      end(item2) {
        clearTimeout(this.timeOutEvent);
        if (!this.showOperation && this.timeOutEvent != 0) {
          this.goDetailOfficial(item2)
        }
      },
      multDownload(){
        if(this.selectedUrls.length>0){
          this.selectedUrls.forEach(item=>{
            this.downloadByBlob(item,new Date().getTime());
          })
        }
        this.showOperation=false;
        this.resetMutiSelected();
      },
      cancel(){
        this.showOperation=false;
        this.resetMutiSelected();
      },
      resetMutiSelected(){
        this.selectedUrls=[];
        for(var key in this.listWithTime){
          var arr = this.listWithTime[key];
          for(var i=0;i<arr.length;i++){
            this.listWithTime[key][i].selected=false;
          }
        }
      },
      downloadByBlob(url,name) {
        let image = new Image()
        image.setAttribute('crossOrigin', 'anonymous')
        image.src = url;
        var _this = this;
        image.onload = () => {
          let canvas = document.createElement('canvas')
          canvas.width = image.width
          canvas.height = image.height
          let ctx = canvas.getContext('2d')
          ctx.drawImage(image, 0, 0, image.width, image.height)
          canvas.toBlob((blob) => {
            let url = URL.createObjectURL(blob)
            _this.download(url, name)
            // 用完释放URL对象
            URL.revokeObjectURL(url)
          })
        }
      },
      download(href, name) {
        let eleLink = document.createElement('a')
        eleLink.download = name
        eleLink.href = href
        eleLink.click()
        eleLink.remove()
      },
      changeImg(e) {
        console.log('changeImg', e);
        var file = e.target.files[0]
        var reader = new FileReader()
        var _this = this
        reader.readAsDataURL(file)
        reader.onload = function(e) {
          _this.previewSrc = this.result;
          _this.showPreview = true;
        }
      },
      hidePreview() {
        console.log('hidePreview......');
        this.showPreview = false;
      },
      mapKeys(map) {
        var keys = []
        for (var key in map) {
          keys.push(key);
        }
        return keys;
      },
      select(params) {
        this.curCagetory = params;
        this.reQuery();
      },
      reQuery() {
        this.finished = false;
        this.loading = true;
        this.list = [];
        this.listWithTime = {};
        this.pageNum = 1;
        if (this.tabActive == 1) { //image
          if (this.loading) {
            this.queryImages();
          }
        } else if (this.tabActive == 2) { //video
          if (this.loading) {
            this.queryVideos();
          }
        } else if (this.tabActive == 3) { //audio
          if (this.loading) {
            this.queryAudios();
          }
        }
      },
      change() {
        this.keyWord = '';
        this.parting.forEach(item => {
          if (item.value == this.partingCode) {
            this.partingTitle = item.text + '素材';
          }
        })
        this.reQuery();
      },
      getParting() {
        var _this = this;
        getParting({
            materialType: this.common.materialType
          })
          .then(response => {
            if (response.code == 0) {
              _this.pushToParting(response.list)
            } else {
              Toast(response.message);
              if (response.code == 401) {
                _this.$router.push('/')
              }
            }
          }).catch(err => {
            console.log(err);
          });
      },
      pushToParting(result) {
        result.forEach(item => {
          this.parting.push({
            text: item.value,
            value: item.code
          })
        })

      },
      search(params) {
        this.keyWord = params;
        this.reQuery();
      },
      tabChange(params) {
        this.tabActive = params;
      },
      getFileInfo(file, detail) {
        return true;
      },
      upload() {
        var _this = this;
        var size = this.formData.file.size;
        const data = new FormData();
        data.append("file", this.formData.file);
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            'token': localStorage.getItem('token')
          }
        }; //添加请求头
        this.$http.post(domain + '/api/asset/common/oss/push-url', data, config)
          .then(response => {
            if (response.data.code == 0) {
              _this.initQueryParams()
              if (_this.tabActive == 1) {
                var params = this.getImgParamsFromOssPush(response.data.data, size);
                ImageUpload(params)
                  .then(response => {
                    if (response.code == 0) {
                      this.showPreview = false;
                      Toast('上传成功');
                      _this.queryImages();
                    } else {
                      Toast(response.message);
                      if (response.code == 401) {
                        _this.$router.push('/')
                      }
                    }
                  })
                  .catch(err => {
                    console.log(err);
                  })
              } else if (_this.tabActive == 2) {
                var params = this.getAudioParamsFromOssPush(response.data.data, size);
                VideoUpload(params)
                  .then(response => {
                    if (response.code == 0) {
                      this.showPreview = false;
                      Toast('上传成功');
                      _this.queryVideos();
                    } else {
                      Toast(response.message);
                      if (response.code == 401) {
                        _this.$router.push('/')
                      }
                    }
                  })
                  .catch(err => {
                    console.log(err);
                  })
              } else if (this.tabActive == 3) {
                var params = this.getAudioParamsFromOssPush(response.data.data, size);
                AudioUpload(params)
                  .then(response => {
                    if (response.code == 0) {
                      this.showPreview = false;
                      Toast('上传成功');
                      _this.queryAudios();
                    } else {
                      Toast(response.message);
                      if (response.code == 401) {
                        _this.$router.push('/')
                      }
                    }
                  })
                  .catch(err => {
                    console.log(err);
                  })
              }
            } else {
              Toast(response.data.message);
              if (response.data.code = 401) {
                _this.$router.push('/')
              }
            }
            console.log(response);
          }).catch(err => {
            console.log(err);
          });
      },
      uploadComplete(file) {
        var _this = this;
        this.formData = file;
        this.previewSrc = file.content;
        this.showPreview = true;
        this.uploadPreviewBtn = true;
        this.privatePreviewBtn = false;
        this.officialPreviewBtn = false;
      },
      getImgParamsFromOssPush(data, size) {
        console.log(data);
        var dataArr = data.split("/");
        var image = dataArr[dataArr.length - 1]
        return {
          objKey: image,
          name: image,
          dpi: '',
          size: size,
          extension: image.split(".")[1],
          source: 0,
          medialYear: new Date().getFullYear()
        }
      },
      getAudioParamsFromOssPush(data, size) {
        console.log(data);
        var dataArr = data.split("/");
        var image = dataArr[dataArr.length - 1]
        return {
          objKey: image,
          name: image,
          length: '30',
          size: size,
          extension: image.split(".")[1],
          source: 0,
          medialYear: new Date().getFullYear()
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
            categoryId: this.partingCode,
            keyword: this.keyWord
          }));
        } else if (this.curCagetory == 1) {
          this.queryMaterial(PublicImages({
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            categoryId: this.partingCode,
            keyword: this.keyWord
          }));
        } else if (this.curCagetory == 2) {
          this.queryMaterial(PrivateImages({
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            categoryId: this.partingCode,
            keyword: this.keyWord
          }));
        }
      },
      queryVideos() {
        if (this.curCagetory == 0) {
          this.queryMaterial(OfficialVideos({
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            categoryId: this.partingCode,
            keyword: this.keyWord
          }));
        } else if (this.curCagetory == 1) {
          this.queryMaterial(PublicVideos({
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            categoryId: this.partingCode,
            keyword: this.keyWord
          }));
        } else if (this.curCagetory == 2) {
          this.queryMaterial(PrivateVideos({
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            categoryId: this.partingCode,
            keyword: this.keyWord
          }));
        }
      },
      queryAudios() {
        if (this.curCagetory == 0) {
          this.queryMaterial(OfficialAudios({
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            categoryId: this.partingCode,
            keyword: this.keyWord
          }));
        } else if (this.curCagetory == 1) {
          this.queryMaterial(PublicAudios({
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            categoryId: this.partingCode,
            keyword: this.keyWord
          }));
        } else if (this.curCagetory == 2) {
          this.queryMaterial(PrivateAudios({
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            categoryId: this.partingCode,
            keyword: this.keyWord
          }));
        }
      },
      goDetailOfficial(item) {
        this.showPreview = true;
        this.privatePreviewBtn = false;
        this.officialPreviewBtn = true;
        this.uploadPreviewBtn = false;
        this.previewSrc = item.accessUrl;

        /* this.$router.push({
          name: 'MaterialDetail',
          params: {
            id: item.id
          }
        }) */
      },
      goDetailPrivate(item) {
        this.showPreview = true;
        this.privatePreviewBtn = true;
        this.officialPreviewBtn = false;
        this.uploadPreviewBtn = false;
        this.previewSrc = item.accessUrl;
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

              var listItemTemp = {};
              _this.list.forEach(item =>{
                item['useful'] = true;
              })

              if (_this.curCagetory == 0 || _this.curCagetory == 1) {
                _this.list.forEach(item => {
                  item['selected'] = false;
                  var time = item.createTime.split(' ')[0];
                  var listTemp = listItemTemp[time];
                  if (!listTemp || listTemp.length <= 0) {
                    listItemTemp[time] = [];
                  }
                  listItemTemp[time].push(item);
                });
              }
              console.log(listItemTemp);
              _this.listWithTime = listItemTemp;
            } else {
              Toast(response.message);
              if (response.code = 401) {
                _this.$router.push("/");
              }
            }
          })
          .catch(err => {
            console.log(err);
          })
      }
    }
  }
</script>

<style scoped lang="less">
  .list_div {
    padding: 44px 0 0;
    background: #FFFFFF;
    position: relative;

    .my_tab_div {
      padding-left: 10px;
      top: 44px;
      position: fixed;
      width: 100%;
      background: #FFFFFF;
      height: 40px;
    }

    .select_div {
      z-index: 1000;
      position: fixed;
      right: 16px;
      top: 12px;
      width: 48px;
      height: 20px;
    }

    .parting {
      position: fixed;
      top: 83px;
      width: 100%;
      background: #FFFFFF;
    }

    .material_content {
      background: #FFFFFF;
      margin-top: 90px;
      margin-bottom: 70px;
      width: 100%;

      .content {
        margin-top: 17px;
        width: 100%;

        .list_private {
          width: 100%;
          display: flex;
          flex-direction: column;

          .list_item {
            margin-left: 18px;
            margin-top: 18px;
            display: flex;
            flex-direction: row;
            overflow: hidden;

            .item_preview {
              width: 50px;
              height: 50px;
              video {
                width: 50px;
                height: 50px;
              }

              audio {
                width: 50px;
                height: 50px;
              }

              img {
                width: 50px;
                height: 50px;
              }
            }


            .list_info {
              margin-left: 20px;

              .info_name {
                font-size: 14px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #3F3E3E;
                line-height: 20px;
                width: 250px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }

              .info_time {
                font-size: 12px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #939393;
                line-height: 17px;
                margin-top: 12px;
              }
            }
          }
        }

        .list_official {
          display: flex;
          flex-direction: column;
          margin-left: 18px;
          flex-wrap: wrap;

          .list_item {
            display: flex;
            flex-direction: column;

            .list_time {
              font-size: 12px;
              font-family: PingFangSC-Regular, PingFang SC;
              color: #3F3E3E;
              line-height: 17px;
              margin-bottom: 20px;
              margin-top: 20px;
            }

            .imgs {
              display: flex;
              flex-direction: row;
              flex-wrap: wrap;

              .img_item {
                width: 85px;
                height: 85px;

                video {
                  width: 60px;
                  height: 60px;
                  margin: 1px;
                }

                audio {
                  width: 60px;
                  height: 60px;
                  margin: 1px;
                }

                img {
                  width: 60px;
                  height: 60px;
                  margin: 1px;
                }
              }
            }

          }
        }

        .list_public {
          display: flex;
          flex-direction: column;
          margin-left: 18px;
          flex-wrap: wrap;

          .list_item {
            display: flex;
            flex-direction: column;

            .list_time {
              font-size: 12px;
              font-family: PingFangSC-Regular, PingFang SC;
              color: #3F3E3E;
              line-height: 17px;
              margin-bottom: 20px;
              margin-top: 20px;
            }

            .imgs {
              display: flex;
              flex-direction: row;
              flex-wrap: wrap;

              .img_item {
                width: 85px;
                height: 85px;

                .normal {
                  width: 60px;
                  height: 60px;
                  margin: 1px;
                  background-size: 100% 100%;
                  video{
                    width: 60px;
                    height: 60px;
                  }
                  audio{
                    width: 60px;
                    height: 60px;
                  }
                  img{
                    width: 60px;
                    height: 60px;
                  }
                }

                .operation {
                  width: 85px;
                  height: 85px;
                  margin: 1px;
                  position: relative;

                  .curcle {
                    position: absolute;
                    top: 10px;
                    left: 10px;
                    width: 10px;
                    height: 10px;
                    background: url(../../assets/img_unselected@2x.png) no-repeat center;
                    background-size: 100% 100%;
                    z-index: 9999;
                  }

                  .normal {
                    width: 85px;
                    height: 85px;
                    margin: 1px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    video{
                      width: 60px;
                      height: 60px;
                    }
                    audio{
                      width: 60px;
                      height: 60px;
                    }
                    img{
                      width: 60px;
                      height: 60px;
                    }
                  }

                  .selected_div {
                    width: 85px;
                    height: 85px;
                    margin: 1px;
                    background: #CDDEFF;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    .selected {
                      width: 60px;
                      height: 60px;
                      position: relative;

                      .curcle {
                        width: 10px;
                        height: 10px;
                        position: absolute;
                        top: 0;
                        left: 0;
                        background: url(../../assets/img_selected@2x.png) no-repeat center;
                        background-size: 100% 100%;
                        z-index: 9999;
                      }

                      .normal {
                        width: 60px;
                        height: 60px;
                        video{
                          width: 60px;
                          height: 60px;
                        }
                        audio{
                          width: 60px;
                          height: 60px;
                        }
                        img{
                          width: 60px;
                          height: 60px;
                        }
                      }
                    }
                  }
                }

              }

            }
          }

        }
      }
    }

    .upload_div {
      width: 100%;
      height: 60px;
      position: fixed;
      bottom: 0px;
      background: #FFFFFF;
      padding-left: 18px;
      padding-top: 10px;

      .upload_btn {
        width: 341px;
        height: 40px;
        background: #009C86;
        border-radius: 10px;
        font-size: 15px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
        line-height: 40px;
        text-align: center;
      }
    }


    .multdown_div{
      width: 100%;
      height: 80px;
      position: fixed;
      bottom: 0;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      background: #3F3E3E;
      div{
        width: 160px;
        height: 40px;
        border-radius: 10px;
        font-size: 15px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
        line-height: 40px;
        text-align: center;
      }
      .multdown{
        background: #009C86;
        margin-right: 23px;
      }
      .cancel{
        background: #E9021E;
      }
    }
    .wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      z-index: 9999;

      .block {
        width: 100%;
        img {
          max-width: 100%;
          display: block;
          margin: auto;
        }

        video {
          max-width: 100%;
          display: block;
          margin: auto;
        }

        audio {
          max-width: 100%;
          display: block;
          margin: auto;
        }
      }

      .upload_cancel_div {
        height: 40px;
        width: 100%;
        position: fixed;
        bottom: 0;
        display: flex;
        flex-direction: row;
        margin-bottom: 40px;
        .upload_cancel_btn {
          width: 140px;
          height: 40px;
          background: #009C86;
          border-radius: 10px;
          margin: auto;
          font-size: 15px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #FFFFFF;
          line-height: 40px;
          text-align: center;
        }

      }
    }
  }
</style>
