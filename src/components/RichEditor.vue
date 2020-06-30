<template>
  <div class="tinymce-editor">
    <editor
      v-model="editorData"
      :init="init"
      :disabled="disabled"
      @onClick="onClick"
      placeholder="请输入内容..."
    >
    </editor>
  </div>
</template>

<script>
import tinymce from "tinymce/tinymce";
import Editor from "@tinymce/tinymce-vue";
export default {
  name: "RichEditor",
  components: {
    Editor
  },
  props: {
    // v-model绑定
    value: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    plugins: {
      type: [String, Array],
      default: "lists image media table wordcount"
    },
    toolbar: {
      type: [String, Array],
      default:
        "undo redo | fullscreen |fontsizeselect forecolor backcolor | formatselect alignleft aligncenter alignright alignjustify | link unlink |bold italic underline strikethrough | numlist bullist |image|  indent outdent| superscript subscript | removeformat |"
    }
  },

  data() {
    return {
      editorData: this.value,
      //初始化配置
      init: {
        language_url: "/tinymce/langs/zh_CN.js",
        language: "zh_CN",
        skin_url: "/tinymce/skins/ui/oxide",
        content_css: "/tinymce/skins/content/default/content.css",
        height: 350,
        plugins: this.plugins,
        toolbar: this.toolbar,
        branding: false,
        menubar: false,
        paste_data_images: true, //可以保留图片
        powerpaste_word_import: "merge", // 是否保留word粘贴样式  clean | merge
        images_upload_handler: async (blobInfo, success, failure) => {
          const file = blobInfo.blob();
          if (file.size > 10485760) {
            failure("图片请不要大于10MB");
          } else {
            try {
              success(await this.uploadImg(blobInfo));
            } catch {
              failure("上传图片失败");
            }
          }
        }
      }
    };
  },
  watch: {
    value(newValue) {
      this.editorData = newValue;
    },
    editorData(newValue) {
      this.$emit("input", newValue);
    }
  },
  mounted() {
    tinymce.init({});
  },
  methods: {
    uploadImg(blobInfo) {
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append("file", blobInfo.blob(), blobInfo.filename());
        const configs = {
          headers: {
            "Content-Type": "multipart/form-data"
          },
          withCredentials: false
        };
        this.$http.post(this.$api.fileUpload, formData, configs).then(res => {
          if (res.data.code === 200) {
            resolve(res.data.data);
          } else {
            reject("上传失败");
          }
        });
      });
    },
    //点击获取富文本的光标及内容
    onClick(e) {
      this.$emit("onClick", e, tinymce);
    },
    //可以添加一些自己的自定义事件，如清空内容
    clear() {
      this.myValue = "";
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/.ck-editor__editable {
  min-height: 350px;
}
.tinymce-editor {
  position: relative;
  text-align: right;
}
</style>
