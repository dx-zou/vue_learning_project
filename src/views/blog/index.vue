<template>
  <div class="app-main_wrapper">
    <common-table
      :table-columns="tableColumns"
      :query-form="queryForm"
      :table-url="$api.blogQuery"
      show-selection
      show-search-expand
      @toAdd="showForm('add')"
      @toEdit="showForm"
      @toDelete="toDelete"
      @resetSearch="resetSearch"
      @handleSelectionChange="handleSelectionChange"
      ref="commonTable"
    >
      <template #tableSearch>
        <el-form-item label="标题">
          <el-input
            v-model.trim="queryForm.title"
            size="mini"
            clearable
            @change="getTableData"
            placeholder="标题"
          ></el-input>
        </el-form-item>
        <el-form-item label="作者">
          <el-input
            v-model.trim="queryForm.author"
            size="mini"
            clearable
            @change="getTableData"
            placeholder="作者"
          ></el-input>
        </el-form-item>
        <el-form-item label="置顶">
          <el-select
            v-model="queryForm.isTop"
            @change="getTableData"
            placeholder="请选择"
          >
            <el-option value="" label="全部" />
            <el-option :value="1" label="是" />
            <el-option :value="0" label="否" />
          </el-select>
        </el-form-item>
      </template>
      <template #tableSearchMore>
        <el-form-item label="创建时间">
          <el-date-picker
            v-model="dateRange"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            @change="value => handleTimeChange(value, 'startTime', 'endTime')"
          >
          </el-date-picker>
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
      queryForm: {
        title: "",
        author: "",
        startTime: "",
        endTime: "",
        read: "",
        isTop: ""
      },
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
          label: "创建时间",
          sortable: "custom"
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
      dateRange: [],
      multipleSelection: [],
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
    // 时间范围搜索
    handleTimeChange(value, start, end) {
      this.queryForm[start] = value ? value[0] : "";
      this.queryForm[end] = value ? value[1] : "";
      this.getTableData();
    },
    // 重置搜索
    resetSearch() {
      for (let key in this.queryForm) {
        this.queryForm[key] = "";
      }
      this.dateRange = [];
      this.getTableData();
    },
    getTableData() {
      this.$refs.commonTable.getTableData();
    },
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val.map(item => item.id);
    },
    /**
     *  显示表单
     */
    showForm(row) {
      this.$refs.blogForm.show(row);
    },
    /**
     *  删除数据
     */
    async toDelete(row) {
      if (row === "mul" && this.multipleSelection.length === 0) {
        return this.$toast("请选择要删除数据", "warning");
      }
      const confirmed = await this.$deleteConfirm();
      if (!confirmed) return;
      const ids = row === "mul" ? this.multipleSelection : [row.id];
      const result = await this.$http.delete(this.$api.blogQuery, {
        data: ids
      });
      if (result.code === 200) {
        this.$toast("删除成功");
        this.getTableData();
      }
    },
    handleChange(value, row) {
      row.scope.isTop = row.scope.isTop === 1 ? 0 : 1;
    }
  }
};
</script>
