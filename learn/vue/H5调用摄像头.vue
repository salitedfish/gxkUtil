<template>
  <div class="ar-page bg-black">
    <div class="ar-box">
      <video ref="arVideo" class="ar-video" id="ar-video" autoplay :width="videoWidth" :height="videoHeight" playsinline="true" webkit-playsinline="true" muted></video>
    </div>

    <van-button type="primary" @click="onTakePhoto" class="photo-btn">拍照</van-button>
  </div>
</template>

<script>
/**框架*/
/**工具库*/
/**类型*/
/**组件*/
/**自定义方法*/

export default {
  name: "",
  data() {
    return {
      imgURL: "",
      thisVideo: "",
      videoSize: 375,
      /**获取设备像素比 */
      devicePixelRatio: Math.floor(window.devicePixelRatio),
    };
  },
  mounted() {
    /**开局获取一下页面宽度 */
    const width = window.getComputedStyle(document.getElementsByClassName("ar-page")[0]).getPropertyValue("width");
    if (navigator.userAgent.toLowerCase().match(/huawei/i) == "huawei") {
      this.videoSize = width.slice(0, -2) * this.devicePixelRatio * 2;
    } else {
      this.videoSize = width.slice(0, -2) * this.devicePixelRatio;
    }
    if ((navigator.mediaDevices && navigator.mediaDevices.getUserMedia) || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia) {
      //调用用户媒体设备，访问摄像头
      this.initVideo({
        video: {
          width: this.videoSize,
          facingMode: "environment",
        },
      });
    } else {
      this.$toast("你的浏览器不支持访问用户媒体设备");
      this.$emit("onerror", "你的浏览器不支持访问用户媒体设备");
    }
  },
  methods: {
    initVideo(constrains) {
      let _this = this;
      if (navigator.mediaDevices.getUserMedia) {
        //最新标准API
        navigator.mediaDevices.getUserMedia(constrains).then(_this.videoSuccess).catch(_this.videoError);
      } else if (navigator.webkitGetUserMedia) {
        //webkit内核浏览器
        navigator.webkitGetUserMedia(constrains).then(_this.videoSuccess).catch(_this.videoError);
      } else if (navigator.mozGetUserMedia) {
        //Firefox浏览器
        navigator.mozGetUserMedia(constrains).then(_this.videoSuccess).catch(_this.videoError);
      } else if (navigator.getUserMedia) {
        //旧版API
        navigator.getUserMedia(constrains).then(_this.videoSuccess).catch(_this.videoError);
      }
    },
    videoSuccess(stream) {
      let video = document.getElementById("ar-video");

      if ("srcObject" in video) {
        video.srcObject = stream;
      } else {
        video.src = window.URL.createObjectURL(stream);
      }
    },
    onTakePhoto() {
      console.log("拍照");
    },
  },
};
</script>

<style scoped lang="less">
.ar-page {
  color: #333;
  text-align: center;
  overflow-y: scroll;
  overflow-x: hidden;
  .ar-box {
    position: relative;
    height: 120vw;
    overflow: hidden;
    .ar-video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
    }
  }

  .photo-btn {
    margin-top: 40px;
    border-radius: 22px;
  }
}
</style>
