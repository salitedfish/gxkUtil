<template>
  <div id="scanner">
    <div class="model">
      <div class="scanner-view">
        <div class="scanner-view-arrow arrow1"></div>
        <div class="scanner-view-arrow arrow2"></div>
        <div class="scanner-view-arrow arrow3"></div>
        <div class="scanner-view-arrow arrow4"></div>
        <div class="scanner-line"></div>
      </div>
    </div>
    <video class="video-view" ref="video" autoplay playsinline="true" webkit-playsinline="true"></video>
    <canvas ref="canvas" width="478" height="850" style="display: none"></canvas>
  </div>
</template>
<script>
/* eslint-disable */
import Vue from "vue";
import jsQR from "jsqr";
// import Quagga from "quagga";
export default Vue.extend({
  name: "",
  data() {
    return { cameraWidth: 0, cameraHeight: 0, timerID: 0 };
  },
  beforeDestroy() {
    console.log("clearInterval");
    clearInterval(this.timerID);
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
        navagator.mozGetUserMedia(constrains).then(_this.videoSuccess).catch(_this.videoError);
      } else if (navigator.getUserMedia) {
        //旧版API
        navigator.getUserMedia(constrains).then(_this.videoSuccess).catch(_this.videoError);
      }
    },
    videoSuccess(stream) {
      let video = this.$refs.video,
        _this = this;
      //将视频流设置为video元素的源
      video.srcObject = stream;
      //播放视频
      video.play();
      video.oncanplay = function () {
        // 摄像头分辨率,手机480x640
        console.log("摄像头分辨率");
        console.log(video.videoWidth, video.videoHeight);

        _this.cameraWidth = video.videoWidth;
        _this.cameraHeight = video.videoHeight;
        // 发送图片进行识别
        _this.readImg();
      };
    },
    videoError(error) {
      this.$emit("onerror", `${error.name} ${error.message}`);
      console.log("访问用户媒体设备失败：", error.name, error.message);
    },
    readImg() {
      let video = this.$refs.video,
        canvas = this.$refs.canvas,
        context = canvas.getContext("2d"),
        _this = this;
      let timer = setInterval(function () {
        context.drawImage(video, 0, 0, _this.cameraWidth, _this.cameraHeight, 0, 0, 478, 850);
        // 扫码条形码
        // let imgUri = canvas.toDataURL();
        // _this.readBarcode(imgUri, timer);
        // 扫码二维码
        let imageData = context.getImageData(0, 0, 478, 850);
        _this.readQrcode(imageData.data, timer);
      }, 1000);
      this.timerID = timer;
    },
    // readBarcode(imgBase64, timer) {
    //   let _this = this;
    //   Quagga.decodeSingle(
    //     {
    //       inputStream: {
    //         size: 1920,
    //       },
    //       locator: {
    //         patchSize: "medium",
    //         halfSample: false,
    //       },
    //       decoder: {
    //         readers: [
    //           {
    //             format: "code_128_reader",
    //             config: {},
    //           },
    //         ],
    //       },
    //       locate: true,
    //       src: imgBase64,
    //     },
    //     function (result) {
    //       if (result) {
    //         if (result.codeResult) {
    //           console.log(result.codeResult);
    //           clearInterval(timer);
    //           _this.$emit("ondata", result.codeResult.code);
    //           //   alert("扫码成功，结果是..." + result.codeResult.code);
    //         } else {
    //           console.log("正在扫条形码...not detected 1");
    //         }
    //       } else {
    //         console.log("正在扫条形码...not detected 2");
    //       }
    //     }
    //   );
    // },
    readQrcode(data, timer) {
      let _this = this;
      let code = jsQR(data, 478, 850, {
        inversionAttempts: "dontInvert",
      });
      if (code) {
        clearInterval(timer);

        _this.$emit("ondata", code.data);
        //
        // alert("扫码成功，结果是..." + code.data);
      } else {
        console.log("正在扫二维码...");
      }
    },
  },
  mounted() {
    console.log(navigator, "show navigator");
    if ((navigator.mediaDevices && navigator.mediaDevices.getUserMedia) || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia) {
      console.log("手机型号", navigator.userAgent.toLowerCase());
      if (navigator.userAgent.toLowerCase().match(/huawei/i) == "huawei") {
        //调用用户媒体设备，访问摄像头
        this.initVideo({
          video: {
            height: 500,
            facingMode: "environment",
            //   facingMode: {
            //     // 强制后置摄像头
            //     // exact: "user",
            //     exact: "environment",
            //   },
          },
        });
      } else {
        //调用用户媒体设备，访问摄像头
        this.initVideo({
          video: {
            height: 800,
            facingMode: "environment",
            //   facingMode: {
            //     // 强制后置摄像头
            //     // exact: "user",
            //     exact: "environment",
            //   },
          },
        });
      }
    } else {
      //   alert("你的浏览器不支持访问用户媒体设备");
      this.$emit("onerror", "你的浏览器不支持访问用户媒体设备");
    }
  },
});
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
#scanner {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
}
.model {
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  position: relative;
  z-index: 88;
  border-top: calc((100vh - 60vw) / 2) solid rgba(0, 0, 0, 0.2);
  border-bottom: calc((100vh - 60vw) / 2) solid rgba(0, 0, 0, 0.2);
  border-right: 20vw solid rgba(0, 0, 0, 0.2);
  border-left: 20vw solid rgba(0, 0, 0, 0.2);
}
.scanner-view {
  width: 100%;
  height: 100%;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.3);
  z-index: 89;
}
.scanner-line {
  position: absolute;
  width: 100%;
  height: 1px;
  background: #49ff46;
  border-radius: 20px;
  z-index: 90;
  animation: myScan 1s infinite alternate;
}
@keyframes myScan {
  from {
    top: 0;
  }
  to {
    top: 100%;
  }
}
.scanner-view-arrow {
  position: absolute;
  width: 5vw;
  height: 5vw;
  border: 2px solid #09bb07;
}
.scanner-view-arrow.arrow1 {
  top: -1px;
  left: 0px;
  z-index: 99;
  border-right: none;
  border-bottom: none;
}
.scanner-view-arrow.arrow2 {
  top: -1px;
  right: 0px;
  z-index: 99;
  border-left: none;
  border-bottom: none;
}
.scanner-view-arrow.arrow3 {
  bottom: -1px;
  left: 0px;
  z-index: 99;
  border-right: none;
  border-top: none;
}
.scanner-view-arrow.arrow4 {
  bottom: -1px;
  right: 0px;
  z-index: 99;
  border-left: none;
  border-top: none;
}
.video-view {
  position: absolute;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  top: 0px;
  left: 0px;
  z-index: 80;
}
</style>
