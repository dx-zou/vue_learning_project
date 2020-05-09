<template>
  <div class="app-mian_wrapper">
    <table-toolbar
      :tool-buttons="toolButtons"
      @handleToolClick="handleToolClick"
    >
      <template>
        <el-form-item>
          <el-input
            size="small"
            v-model="queryForm.title"
            clearable
            prefix-icon="el-icon-search"
            placeholder="请输入"
          />
        </el-form-item>
      </template>
    </table-toolbar>
    <common-table
      :table-data="tableData"
      :table-columns="tableColumns"
      :is-loading="false"
      v-bind="queryForm"
      @toEdit="toEdit"
      @toDelete="toDelete"
    >
      <template #toTop="row">
        <el-switch
          :value="row.scope.isTop"
          :active-value="1"
          :inactive-value="0"
          active-color="#ff4949"
          inactive-color="#dcdfe6"
          @change="handleChange($event, row)"
        >
        </el-switch>
      </template>
    </common-table>
    <pagination
      :page-options="pageOptions"
      @handlePageChange="handlePageChange"
      @handleSizeChange="handleSizeChange"
    />
    <el-dialog
      :visible.sync="showLogin"
      title="博客系统登录"
      width="39%"
      custom-class="commom-dialog"
    >
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model.trim="loginForm.username"
            placeholder="请输入用户名"
            clearable
          />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model.trim="loginForm.password"
            type="password"
            clearable
            show-password
            @keyup.enter.native="toLogin"
            placeholder="请输入密码"
          />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="small" @click="showLogin = false">取消</el-button>
        <el-button type="primary" size="small" @click="toLogin">登录</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryForm: {},
      tableData: [{}],
      tableColumns: [
        {
          prop: "title",
          label: "标题"
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
        },
        {
          prop: "toTop",
          label: "是否置顶",
          slotName: "toTop"
        }
      ],
      loginRules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: ["blur", "change"]
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: ["blur", "change"]
          }
        ]
      },
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
      pageOptions: {
        total: 0,
        pageSize: 3,
        pageNo: 1
      }
    };
  },
  mounted() {
    // this.getTableData();
  },
  methods: {
    /**
     * @description 当前页码数变化
     */
    handlePageChange(val) {
      this.pageOptions.pageNo = val;
      this.getTableData();
    },
    /**
     * @description 每页条数变化
     */
    handleSizeChange(val) {
      this.pageOptions.pageSize = val;
      this.getTableData();
    },
    /**
     * @description 获取表格数据
     */
    getTableData() {
      let { pageNo, pageSize } = this.pageOptions;
      this.$http
        .get(this.$api.getBlogList, { params: { pageNo, pageSize } })
        .then(res => {
          this.tableData = res.data.rows;
          this.pageOptions.total = res.data.total;
        });
    },
    /**
     * @description 处理工具栏按钮点击事件
     */
    handleToolClick(type) {
      if (type === "login") {
        this.showLogin = true;
      } else if (type === "add") {
        this.$router.push({ name: "addBlog" });
      }
    },
    /**
     * @description 登录
     */
    toLogin() {
      this.$refs["loginForm"].validate(valid => {
        if (valid) {
          const { username, password } = this.loginForm;
          this.$http
            .post(this.$api.login, {
              username,
              password
            })
            .then(res => {
              if (res.code) {
                this.showLogin = false;
                this.getTableData();
                this.$toast("success", "登录成功");
              }
            });
        }
      });
    },
    /**
     * @description 去编辑页面
     */
    toEdit(row) {
      this.$router.push(`/blog/edit-blog/${row.id}`);
    },
    /**
     * @description 删除数据
     */
    async toDelete(row) {
      let confirmed = await this.$deleteConfirm();
      if (confirmed) {
        this.$http.delete(this.$api.deleteBlog + `/${row.id}`).then(res => {
          if (res.code === 1) {
            this.$toast("success", "删除成功");
            this.getTableData();
          }
        });
      }
    },
    handleChange(value, row) {
      row.scope.isTop = row.scope.isTop === 1 ? 0 : 1;
    }
  }
};
</script>

<style lang="scss" scoped></style>
