<template>
  <el-card class="cropper-wrapper">
    <h1 slot="header">cropper 图像裁剪</h1>
    <input
      type="file"
      accept="image/*"
      hidden
      ref="imgReader"
      @change="loadingImg"
    />
    <el-button type="primary" @click="uploadImg">上传</el-button>
    <div>
      <img :src="cropperedImg" alt="头像" class="croppered-img" />
    </div>
    <common-dialog :visible.sync="showDialog" @handleConfirm="handleConfirm">
      <div class="prev-wrapper">
        <img ref="cropImg" class="cropper-img" />
        <div class="prev-box">
          <div class>裁剪预览</div>
          <div class="previewBox" ref="previewBox"></div>
          <div class="previewBoxRound" ref="previewBoxRound"></div>
        </div>
      </div>
    </common-dialog>
  </el-card>
</template>

<script>
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";
export default {
  name: "Cropper",
  data() {
    return {
      CROPPER: null,
      cropperedImg: require("@/assets/images/avatar.jpg"),
      showDialog: false
    };
  },
  methods: {
    /**
     * 上传图片
     */
    uploadImg() {
      if (this.CROPPER) {
        this.CROPPER.destroy();
      }
      this.$refs.imgReader.click();
    },
    /**
     *
     */
    loadingImg($event) {
      this.showDialog = true;
      // 读取上传文件
      const reader = new FileReader();
      const imgFile = $event.target.files[0];

      if (imgFile) {
        // readAsDataURL方法可以将File对象转化为data:URL格式的字符串（base64编码）
        reader.readAsDataURL(imgFile);
        reader.onload = () => {
          const dataURL = reader.result;
          // 将img的src改为刚上传的文件的转换格式
          const image = this.$refs.cropImg;
          image.src = dataURL;
          // 创建cropper实例-----------------------------------------
          this.CROPPER = new Cropper(image, {
            aspectRatio: 16 / 16,
            viewMode: 1,
            minContainerWidth: 300,
            minContainerHeight: 300,
            dragMode: "move",
            preview: [this.$refs.previewBox, this.$refs.previewBoxRound],
            ready() {},
            cropend(res) {
              console.log(res);
            },
            crop() {}
          });
        };
      }
    },
    /**
     * 确定裁剪
     */
    handleConfirm() {
      this.cropperedImg = this.CROPPER.getCroppedCanvas({
        imageSmoothingQuality: "high"
      }).toDataURL("image/jpeg");
      this.showDialog = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.cropper-wrapper {
  .croppered-img {
    width: 150px;
    height: 150px;
    margin-top: 30px;
  }
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
    width: 100%;
    height: 450px;
    display: flex;
    margin-top: 30px;
  }
  .cropper-img {
    max-width: 100%;
  }
  .prev-box {
    margin-left: 30px;
  }
}
</style>
