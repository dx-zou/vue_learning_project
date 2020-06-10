<template>
  <div class="app-main_wrapper">
    <common-table
      :table-data="tableData"
      :table-columns="tableColumns"
      :is-loading="false"
      v-bind="queryForm"
      @toAdd="showForm"
      @toEdit="showForm"
      @toDelete="toDelete"
    >
      <template #searchCustom>
        <el-form-item label="查询条件">
          <el-input
            size="small"
            v-model="queryForm.name"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
      </template>
      <template #operateCustom>
        <el-button size="small" type="danger">删除</el-button>
        <el-button size="small" type="warning" @click="showLogin = true"
          >登录</el-button
        >
      </template>
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
    <common-dialog
      :visible.sync="showLogin"
      title="博客系统登录"
      width="39%"
      @handleConfirm="toLogin"
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
    </common-dialog>
    <blog-form ref="blogForm" />
  </div>
</template>

<script>
import blogForm from "./blog-form";
export default {
  data() {
    return {
      queryForm: {},
      tableData: [
        {
          id: 1
        },
        {
          id: 2
        },
        {
          id: 3
        },
        {
          id: 4
        }
      ],
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
  components: {
    blogForm
  },
  mounted() {
    this.getTableData();
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
    showForm(row) {
      let params = "";
      row && (params = row.id);
      this.$refs.blogForm.show(params);
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
