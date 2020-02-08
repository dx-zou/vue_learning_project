<template>
  <div ref="uploadContainer">
    <el-divider content-position="left">图片上传</el-divider>
    <input
      type="file"
      accept="image/*"
      multiple
      ref="uploadRef"
      @change="uploadChange"
    />
    <img :src="imgSrc" alt="暂无图片" />
    <el-divider content-position="left">大文件切片上传，断点续传</el-divider>
    <input type="file" @change="handleFileChange" />
    <el-button type="primary" @click="handleUpload">上传</el-button>
  </div>
</template>

<script>
// 图片上传预览
export default {
  data() {
    return {
      imgSrc: "",
      container: {
        file: null,
        data: []
      },
      length: 10
    };
  },
  methods: {
    uploadChange() {
      const uploader = this.$refs["uploadRef"];
      let fileList = uploader.files;
      // 单个文件预览
      // let file = fileList[0];
      // 多个文件预览
      const formData = new FormData();

      // 创建filereader 对象
      Array.from(fileList).forEach(item => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(item);
        // 读取图片
        fileReader.addEventListener("load", () => {
          let img = document.createElement("img");
          img.src = fileReader.result;
          img.style = "width:300px;height:200px";
          this.$refs.uploadContainer.appendChild(img);
        });
        formData.append("imgSrc", item, item.name);
        console.log(formData);
      });
    },
    /**
     * @description 模拟bind函数
     *
     * @param {*} context
     * @returns {Function}
     */
    request({ url, method = "post", data, headers = {}, requestList }) {
      return new Promise(resolve => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        Object.keys(headers).forEach(key =>
          xhr.setRequestHeader(key, headers[key])
        );
        xhr.send(data);
        xhr.onload = e => {
          resolve({
            data: e.target.response
          });
        };
      });
    },
    async handleUpload() {},
    handleFileChange(e) {
      const [file] = e.target.files;
      if (!file) return;
      Object.assign(this.$data, this.$options.data());
      this.container.file = file;
    }
  }
};
</script>

<style lang="scss" scoped>
img {
  width: 300px;
  height: 200px;
}
</style>
