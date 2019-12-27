<template>
  <div>
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
      :table-options="tableOptions"
      :is-loading="false"
      @toEdit="toEdit"
      @toDelete="toDelete"
    >
      <template #status="row">
        <el-switch
          :value="row.status"
          :active-value="true"
          :inactive-value="false"
          active-color="#13ce66"
          inactive-color="#ff4949"
          @change="handleChange($event, row)"
        >
        </el-switch>
      </template>
    </common-table>
    <pagination
      :page-options="pageOptions"
      @handlePageChange="handlePageChange"
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
      tableData: [],
      tableOptions: [
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
          prop: "status",
          label: "状态",
          slotName: "status"
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
        pageSize: 5,
        pageNo: 1
      }
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    handlePageChange(val) {
      this.pageOptions.pageNo = val;
      this.getTableData();
    },
    // 获取表格数据
    getTableData() {
      let { pageNo, pageSize } = this.pageOptions;
      this.$http({
        url: this.$api.getBlogList,
        params: {
          pageNo,
          pageSize
        }
      }).then(res => {
        this.tableData = res.data.rows;
        this.pageOptions.total = res.data.total;
      });
    },
    // 处理工具栏按钮点击事件
    handleToolClick(type) {
      if (type === "login") {
        this.showLogin = true;
      } else if (type === "add") {
        this.$router.push({ name: "addBlog" });
      }
    },
    toLogin() {
      this.$refs["loginForm"].validate(valid => {
        if (valid) {
          const { username, password } = this.loginForm;
          this.$http({
            url: this.$api.login,
            method: "post",
            data: {
              username,
              password
            }
          }).then(res => {
            if (res.code) {
              this.showLogin = false;
              this.getTableData();
              this.$toast("success", "登录成功");
            }
          });
        }
      });
    },
    toEdit(row) {
      this.$router.push(`/blog/edit-blog/${row.id}`);
    },
    async toDelete(row) {
      let confirmed = await this.$deleteConfirm();
      if (confirmed) {
        this.$http({
          url: this.$api.deleteBlog,
          method: "post",
          data: {
            id: row.id
          }
        }).then(res => {
          if (res.code === 1) {
            this.$toast("success", "删除成功");
            this.getTableData();
          }
        });
      }
    },
    handleChange(value, row) {
      row.scope.status = false;
    }
  }
};
</script>

<style lang="scss" scoped></style>
