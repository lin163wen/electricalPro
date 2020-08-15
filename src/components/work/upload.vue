<template>
  <div>
    <!-- 'title','hasRight','back','parting','search','upload' -->
    <my-header title="分类v" back="true" hasRight="true" upload="true"></my-header>
    <div class="material_content">
      <van-grid :border="false" :column-num="4">
        <van-grid-item>
          <div @click="uploadDetail()">
            分类1
          </div>
        </van-grid-item>
        <van-grid-item>
          <div>
            分类2
          </div>
        </van-grid-item>
        <van-grid-item>
          <div>
            分类3
          </div>
        </van-grid-item>
        <van-grid-item>
          <div>
            分类4
          </div>
        </van-grid-item>
        <van-grid-item>
          <div>
            分类5
          </div>
        </van-grid-item>
        <van-grid-item>
          <div>
            分类6
          </div>
        </van-grid-item>
      </van-grid>
    </div>
    <div @click="preview()">
      预览
    </div>
  </div>

</template>

<script>
  import MyHeader from '../views/header.vue'
  export default {
    name: 'Search',
    components: {
      MyHeader
    },
    data() {
      return {}
    },
    created() {
      if(window.plus){
        this.plusReady()
      }else{
        document.addEventListener('plusready', this.plusReady, false)
      }
      this.galleryImgs('',10)

    },
    methods: {
      plusReady() {
        var ws = plus.webview.currentWebview(); //pw回车可输出plus.webview
      },
      uploadDetail() {
        this.$router.push('/UploadDetail')
      },
      preview() {
        this.$router.push('/Preview')
      },
      galleryImg() {
        // 从相册中选择图片
        console.log("从相册中选择图片:");
        plus.gallery.pick(function(path) {
          // 返回的路径等会上传的时候要用
          console.log(path);
        }, function(e) {
          // 失败的回调函数
          console.log("取消选择图片");
        }, {
          // 图片获取的选项

          // 图库文件过滤选项
          filter: "image",

        });
      },
      galleryImgs() {
        // 从相册中选择图片
        console.log("从相册中选择多张图片:");
        plus.gallery.pick(function(e) {
          for (var i in e.files) {
            console.log(e.files[i]);
          }
        }, function(e) {
          console.log("取消选择图片");
        }, {
          filter: "image",
          // 是否可以多选
          multiple: true,
          // 设定最多可选取数量
          maximum: 3,
          // 是否使用系统相册文件选择界面
          system: false,
          // 当超过设定的选取数量触发的事件
          onmaxed: function() {
            plus.nativeUI.alert('最多只能选择3张图片');
          }
        });
      },
      galleryImgs(url, imgMaxNum) {
        // 从相册中选择图片
        console.log('从相册中选择多张图片:')
        plus.gallery.pick(function(e) {
          // 成功回调
          console.log(e)
          // 如果选取成功则执行上传功能
          // 创建任务
          // 返回以upload对象
          let task = plus.uploader.createUpload(url, {
              method: 'POST',
              header:{
                "Content-Type":"application/x-www-form-urlencoded",
                "token":localStorage.getItem('token')
              },
              // 上传任务每次上传的文件块大小（仅在支持断点续传的服务有效）
              // 数值类型，单位为Byte（字节），默认值为102400，若设置值小于等于0则表示不分块上传
              blocksize: 10000000000000000000000000,
              // 上传任务的优先级,数值类型，数值越大优先级越高，默认优先级值为0。
              priority: 100,
              // 上传任务超时时间
              timeout: 51000
            },
            // 完成函数，成功失败都会调用次函数
            function(t, status) {
              // 上传完成
              if (status == 200) {
                // 上传成功返回url
                alert('Upload success: ' + t.url)
              } else {
                alert('Upload failed: ' + status)
              }
            }
          )

          // 遍历添加文件
          for (var i in e.files) {
            // 使用图片选取后返回的文件路径
            // param 1添加上传文件的路径
            // param2  可通过此参数设置上传任务属性，如文件标识、文件名称、文件类型等, key如果重复会导致上传失败
            // 函数返回一个布尔值，代表添加文件成功与否
            task.addFile(e.files[i], {
              key: 'ducha' + i + Math.random() * 10
            })
          }

          // 添加上传数据
          if (imgType !== undefined) {
            task.addData('IMG_TYPE', imgType)
          }
          //需要提交的参数多次添加
          task.addData("fileFrom", "信息发布");
          task.addData("attachType", "1");
          task.start()

        }, function(e) {
          // 失败回调
          console.log('取消选择图片')
        }, {
          // options
          filter: 'image',
          // 多选
          multiple: true,
          // 是否调用手机终端自带的相册页面
          system: true,
          maximum: imgMaxNum || '',
          onmaxed: function() {
            plus.nativeUI.alert('最多只能选择' + imgMaxNum + '张图片')
          }
        })
      }
    }


  }
</script>

<style scoped lang="less">
  .work div {
    width: 40%;
    margin: 30px;
    display: inline-block;
  }
</style>
