<template>
  <div>
    <vue-qr
      class="QRCodeBox-img"
      id="QRCodeBox-img"
      :text="'这里是二维码的内容可以是文字或链接'"
      :logoSrc="'这里放二维码中间的图片'"
      :size="2000"
      :margin="10"
    ></vue-qr>
    <div id="QRCodeBox-download" @click="downLoadQRCode">下载二维码</div>
  </div>
</template>

<script>
import vueQr from "vue-qr";

export default {
  components: {
    vueQr,
  },
  methods:{
    downLoadQRCode() {
      const img = document.querySelector(".QRCodeBox-img");
      const Url = img.src;
      const blob = new Blob([""], { type: "application/octet-stream" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = Url;
      a.download = Url.replace(/(.*\/)*([^.]+.*)/gi, "$2").split("?")[0];
      const e = document.createEvent("MouseEvents");
      e.initMouseEvent(
        "click",
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      );
      a.dispatchEvent(e);
      URL.revokeObjectURL(url);
    },
  }
}
</script>

<style>

</style>