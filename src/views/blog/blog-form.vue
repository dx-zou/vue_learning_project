<template>
  <common-dialog
    :visible.sync="showDialog"
    :title="title"
    @handleClose="handleClose"
    @handleConfirm="submitForm"
  >
    <el-form
      :model="formData"
      :rules="formRules"
      ref="formRef"
      label-width="130px"
      label-position="left"
    >
      <el-form-item label="标题" prop="title">
        <el-input
          v-model.trim="formData.title"
          clearable
          placeholder="请输入博客标题，不超过30个字符"
        ></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input
          v-model.trim="formData.content"
          type="textarea"
          clearable
          placeholder="请输入博客内容"
        ></el-input>
      </el-form-item>
      <el-form-item label="是否置顶" prop="isTop">
        <el-radio-group v-model="formData.isTop">
          <el-radio :label="0">否</el-radio>
          <el-radio :label="1">是</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </common-dialog>
</template>

<script>
// import { checkName10, checkNumber } from "@/utils/checkForm";
// import addPageAuth from "@/mixins/addPageAuth";
export default {
  data() {
    return {
      formData: {},
      isSaving: false,
      showDialog: false,
      id: "",
      formRules: {
        content: [
          {
            required: true,
            message: "请输入",
            trigger: ["blur", "change"]
          }
        ],
        title: [
          {
            required: true,
            message: "请输入",
            trigger: ["blur", "change"]
          }
        ],
        isTop: [
          {
            required: true,
            message: "请选择",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  computed: {
    title() {
      return this.id ? "编辑博客" : "新增博客";
    }
  },
  methods: {
    handleClose() {
      this.$refs.formRef.resetFields();
      this.id = "";
    },
    // 显示弹窗
    show(id) {
      this.showDialog = true;
      if (id) {
        this.id = id;
        this.getDetail(id);
      }
    },
    // 获取详情
    getDetail() {
      this.$http({
        url: this.$api.getBlogDetail + `/${this.id}`
      }).then(res => {
        this.formData = res.data;
      });
    },
    // 新增或编辑
    submitForm() {
      this.$refs["formRef"].validate(valid => {
        if (valid) {
          this.isSaving = true;
          this.$http({
            url: this.id ? this.$api.updateBlog : this.$api.addBlog,
            method: this.id ? "patch" : "post",
            data: this.formData
          }).then(res => {
            this.isSaving = false;
            if (res.code === 1) {
              this.id
                ? this.$toast("success", "编辑成功")
                : this.$toast("success", "新增成功");
            }
          });
        }
      });
    }
  }
};
</script>
