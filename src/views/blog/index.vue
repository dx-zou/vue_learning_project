<template>
  <div class="app-main_wrapper">
    <common-table
      :table-columns="tableColumns"
      :query-form="queryForm"
      :table-url="$api.blogQuery"
      @toAdd="showForm('add')"
      @toEdit="showForm"
      @toDelete="toDelete"
      ref="commonTable"
    >
      <template #tableSearch>
        <el-form-item label="标题">
          <el-input
            size="small"
            v-model.trim="queryForm.name"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
      </template>
      <template #tableAdd>
        <el-button size="mini" icon="el-icon-user" @click="showLogin = true"
          >登录</el-button
        >
      </template>
      <template #toTop="row">
        <el-switch
          :value="row.scope.isTop"
          :active-value="1"
          :inactive-value="0"
          @change="handleChange($event, row)"
        >
        </el-switch>
      </template>
    </common-table>

    <common-dialog
      :visible.sync="showLogin"
      title="博客系统登录"
      width="39%"
      @handleConfirm="toLogin"
    >
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules">
        <el-form-item label="用户名" prop="userName">
          <el-input
            v-model.trim="loginForm.userName"
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
  components: {
    blogForm
  },
  data() {
    return {
      queryForm: {},
      rowId: "",
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
          prop: "createdAt",
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
        userName: [
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
      showLogin: false
    };
  },

  methods: {
    /**
     * @description 登录
     */
    toLogin() {
      this.$refs["loginForm"].validate(async valid => {
        if (valid) {
          const { userName, password } = this.loginForm;
          const result = await this.$http.post(this.$api.login, {
            userName,
            password
          });
          if (result.code === 200) {
            this.$refs.commonTable.getTableData();
            this.$toast("登录成功");
          }
          this.showLogin = false;
        }
      });
    },
    getTableData() {
      this.$refs.commonTable.getTableData();
    },
    /**
     * @description 去编辑页面
     */
    showForm(row) {
      this.$refs.blogForm.show(row);
    },
    /**
     * @description 删除数据
     */
    async toDelete(row) {
      let confirmed = await this.$deleteConfirm();
      if (confirmed) {
        const result = await this.$http.delete(
          this.$api.blogQuery + `/${row.id}`
        );
        if (result.code === 200) {
          this.$toast("删除成功");
          this.getTableData();
        }
      }
    },
    handleChange(value, row) {
      row.scope.isTop = row.scope.isTop === 1 ? 0 : 1;
    }
  }
};
</script>

<style lang="scss" scoped></style>
