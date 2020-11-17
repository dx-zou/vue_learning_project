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
          :autosize="{ minRows: 3, maxRows: 6 }"
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
    show(row) {
      this.showDialog = true;
      if (typeof row === "object") {
        this.id = row.id;
        this.getDetail(this.id);
      }
    },
    // 获取详情
    getDetail() {
      this.$http({
        url: this.$api.blogQuery + `/${this.id}`
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
            url: this.$api.blogQuery,
            method: this.id ? "patch" : "post",
            data: this.formData
          }).then(res => {
            this.isSaving = false;
            if (res.code === 200) {
              this.$toast("操作成功");
              this.showDialog = false;
              this.$parent.getTableData();
            }
          });
        }
      });
    }
  }
};
</script>
