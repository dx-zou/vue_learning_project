<template>
  <div ref="uploadContainer">
    <input
      type="file"
      accept="image/*"
      multiple
      ref="uploadRef"
      @change="uploadChange"
    />
    <img :src="imgSrc" alt="暂无图片" />
  </div>
</template>

<script>
// 图片上传预览
export default {
  data() {
    return {
      imgSrc: ""
    };
  },
  methods: {
    uploadChange(files) {
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
