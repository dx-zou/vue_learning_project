<template>
  <div>
    <table-toolbar
      :tool-buttons="toolButtons"
      @handleToolClick="handleToolClick"
    ></table-toolbar>
    <common-table
      :table-data="tableData"
      :table-options="tableOptions"
      :is-loading="false"
    >
      <template #status="row">
        <el-switch
          :value="row.status"
          :active-value="true"
          :inactive-value="false"
          active-color="#13ce66"
          inactive-color="#ff4949"
          @change="handleChange($event)"
        >
        </el-switch>
      </template>
    </common-table>
    <el-dialog :visible.sync="showLogin" title="博客系统登录" width="39%">
      <el-form :model="loginForm">
        <el-form-item label="用户名">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            v-model="loginForm.password"
            type="password"
            clearable
            show-password
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" size="small" @click="toLogin">登录</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          title: "11",
          status: true,
          author: "feng",
          createTime: new Date().getFullYear(),
          read: 100
        }
      ],
      tableOptions: [
        {
          prop: "title",
          label: "标题"
        },
        {
          prop: "status",
          label: "状态",
          slotName: "status"
        },
        {
          prop: "author",
          label: "作者"
        },
        {
          prop: "createTime",
          label: "创建时间"
        },
        {
          prop: "read",
          label: "阅读量"
        }
      ],
      toolButtons: [
        {
          icon: "el-icon-plus",
          text: "新增",
          type: "add"
        },
        {
          icon: "el-icon-user-solid",
          text: "登录",
          type: "login",
          btnType: "danger"
        }
      ],
      loginForm: {},
      showLogin: false,
      value: "100"
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    // 获取表格数据
    getTableData() {
      this.$http({
        url: this.$api.getBlogList
      }).then(res => {});
    },
    // 处理工具栏按钮点击事件
    handleToolClick(type) {
      if (type === "login") {
        this.showLogin = true;
      }
    },
    toLogin() {},
    handleChange(value) {
      console.log(value);
    }
  }
};
</script>

<style lang="scss" scoped></style>
