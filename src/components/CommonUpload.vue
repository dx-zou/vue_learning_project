<template>
  <el-upload
    class="c-upload"
    name="multipartFile"
    ref="upload"
    :action="uploadUrl"
    :list-type="listType"
    :limit="limit"
    :headers="headers"
    :data="data"
    :accept="accept"
    :file-list="fileList"
    :show-file-list="showList"
    :on-success="handleSuccess"
    :on-error="handleError"
    :on-exceed="handleExceed"
    :on-remove="handleRemove"
    :before-upload="handleBefore"
    :on-progress="handleProgress"
  >
    <button v-if="hidden" ref="uploadBtn" hidden class="hidden-btn"></button>
    <el-button v-else size="mini" icon="el-icon-upload2" :type="btnType">{{
      title
    }}</el-button>
  </el-upload>
</template>

<script>
export default {
  props: {
    // 按钮文案
    title: {
      type: String,
      default: "上传文件"
    },
    // 上传按钮样式类型
    btnType: {
      type: String,
      default: "primary"
    },
    // 上传地址
    action: {
      type: String,
      required: true
    },
    // 额外数据
    data: {
      type: Object
    },
    // 是否隐藏上传按钮
    hidden: {
      type: Boolean,
      default: false
    },
    // 是否显示上传列表
    showList: {
      type: Boolean,
      default: false
    },
    // 同时上传个数
    limit: {
      type: Number,
      default: 1
    },
    // 上传文件类型
    fileType: {
      type: String,
      default: "image"
    },
    // 回显文件列表
    fileList: {
      type: Array
    }
  },
  data() {
    return {
      uploading: false,
      headers: {
        userId: localStorage.getItem("userId"),
        userName: localStorage.getItem("userName"),
        userType: localStorage.getItem("isAdmin") == "true" ? 2 : 1
      },
      reflect: {
        image: ".jpg,.jpeg,.png,.gif,.JPEG,.JPG,.PNG,.GIF,.bmp,.BMP",
        audio: ".mp3,.mav,.aac,.ape,.flac",
        office: ".xls,xlsx,.XLS,.XLSX",
        version: ".apk,.Apk,.APK",
        video: ".mp4",
        file: ""
      }
    };
  },
  computed: {
    // 上传路径
    uploadUrl() {
      return this.action || this.$api.fileUpload;
    },
    // 允许上传文件类型
    accept() {
      return this.reflect[this.fileType];
    },
    // 列表类型
    listType() {
      return this.fileType === "image" ? "picture" : "text";
    }
  },

  methods: {
    // 上传前
    handleBefore() {
      this.uploading = true;
      this.$emit("handleUploadBefore");
    },
    // 上传前
    handleExceed() {
      this.$toast("最多上传一个文件", "warning");
    },
    //删除前
    // beforeRemove(file, fileList, res) {
    //   this.$emit("beforeRemove", file);
    // },
    // 移除文件
    handleRemove(res) {
      this.$emit("handleRemove", res);
    },
    // 上传中
    handleProgress() {},
    // 上传成功
    handleSuccess(res) {
      this.uploading = false;
      if (res.code === 0) {
        this.$toast(res.msg, "error");
      } else {
        this.$toast("上传成功");
      }
      this.clearFiles();
      this.$emit("handleUploadSuccess", res);
    },
    // 上传失败
    handleError(err) {
      this.uploading = false;
      this.$toast("上传失败", err);
      this.$emit("handleUploadError", err);
    },
    // 清空上传文件
    clearFiles() {
      this.$refs.upload.clearFiles();
    }
  }
};
</script>

<style lang="scss">
.c-upload {
  display: inline-block;
  width: 100%;
  word-break: break-all;
  .hidden-btn {
    width: 0;
    height: 0;
  }
}
</style>
