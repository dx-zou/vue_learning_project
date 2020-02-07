<template>
  <div class="cropper-wrapper">
    <!-- 1.一个用于获取上传文件的input，type="file"，并且监听onchange事件  -->
    <input
      type="file"
      accept="image/*"
      id="imgReader"
      hidden
      @change="loadingImg"
    />
    <el-button type="primary" @click="uploadImg">上传</el-button>
    <div class="prev-wrapper">
      <!-- 2.一个用于给Cropper.js覆盖使用的img  -->
      <img id="cropImg" class="img-container" />
      <!-- 3.两个用于预览的div  -->
      <div class="prev-box">
        <div class>裁剪预览</div>
        <div class="previewBox"></div>
        <div class="previewBoxRound"></div>
      </div>
    </div>

    <!-- <common-dialog :show-dialog="showDialog"></common-dialog> -->
  </div>
</template>

<script>
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";
export default {
  data() {
    return {
      CROPPER: null,
      showDialog: false
    };
  },
  methods: {
    loadingImg($event) {
      //读取上传文件
      let reader = new FileReader();
      if ($event.target.files[0]) {
        //readAsDataURL方法可以将File对象转化为data:URL格式的字符串（base64编码）
        reader.readAsDataURL($event.target.files[0]);
        reader.onload = e => {
          let dataURL = reader.result;
          this.showDialog = true;
          //将img的src改为刚上传的文件的转换格式
          const image = document.querySelector("#cropImg");
          image.src = dataURL;
          //创建cropper实例-----------------------------------------
          this.CROPPER = new Cropper(image, {
            aspectRatio: 16 / 16,
            viewMode: 0,
            minContainerWidth: 300,
            minContainerHeight: 300,
            dragMode: "move",
            preview: [
              document.querySelector(".previewBox"),
              document.querySelector(".previewBoxRound")
            ]
          });
        };
      }
    },
    uploadImg() {
      if (this.CROPPER) {
        this.CROPPER.destroy();
      }
      document.querySelector("#imgReader").click();
    }
  }
};
</script>

<style lang="scss" scoped>
.cropper-wrapper {
  height: 5rem;
  .previewBox,
  .previewBoxRound {
    box-shadow: 0 0 5px #adadad;
    width: 100px;
    height: 100px;
    margin-top: 30px;
    overflow: hidden; /*这个超出设置为隐藏很重要，否则就会整个显示出来了*/
  }
  .previewBoxRound {
    border-radius: 50%; /*设置为圆形*/
  }
  .prev-wrapper {
    display: flex;
  }
  .cropper-container {
    width: 60%;
  }
  .img-container {
    max-width: 50%;
  }
}
</style>
