<template>
  <div>
    <quill-editor
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
      v-model="content"
    ></quill-editor>
    <el-upload
      class="quill-upload"
      ref="upload"
      :action="uploadUrl"
      :show-file-list="false"
      :on-success="uploadSuccess"
      :on-error="uploadError"
      :before-upload="beforeUpload"
    ></el-upload>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block"],
  [{ header: 1 }, { header: 2 }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ size: ["small", false, "large", "huge"] }],
  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],
  ["link", "image"],
  ["clean"]
];
export default {
  components: {
    quillEditor
  },
  props: {
    value: {
      type: String
    }
  },
  data() {
    return {
      uploadUrl: "",
      editorOption: {
        placeholder: "请输入内容",
        modules: {
          toolbar: {
            container: toolbarOptions,
            handlers: {
              image: function(value) {
                if (value) {
                  document.querySelector(".quill-upload input").click();
                } else {
                  this.quill.format("image", false);
                }
              }
            }
          }
        }
      }
    };
  },
  computed: {
    content: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  },
  methods: {
    // 富文本上传图片前
    beforeUpload(file) {
      // 限制格式
      if (!/^image\/(jpeg|png|jpg|JPG|JPEG|gif)$/.test(file.type)) {
        this.$toast("只支持上传jpg,png,gif格式的图片", "warning");
        return;
      }
      const isLt2M = file.size / 1024 / 1024 < 5;
      if (!isLt2M) {
        this.$toast("图片大小不能超过5MB!", "warning");
      }
    },
    uploadSuccess(res) {
      // 获取富文本组件实例
      let quill = this.$refs.myQuillEditor.quill;
      // 获取光标所在位置
      let length = quill.getSelection().index;
      // 插入图片
      quill.insertEmbed(length, "image", res.data);
      // 调整光标到最后
      quill.setSelection(length + 1);
    },
    uploadError() {},
    onEditorBlur() {},
    onEditorFocus() {},
    onEditorReady() {}
  }
};
</script>

<style lang="scss" scoped>
.quill-editor {
  height: 350px;
}
</style>
