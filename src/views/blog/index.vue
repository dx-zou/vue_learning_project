<template>
  <div class="app-main_wrapper">
    <common-table
      :table-columns="tableColumns"
      :query-form="queryForm"
      :table-url="this.$api.getBlogList"
      @toAdd="showForm"
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
        <el-button size="small" type="primary">新增</el-button>
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
      <template #default="{scope}">
        <el-button
          @click="toPlay(scope)"
          type="text"
          :icon="
            rowId === scope.id && playing
              ? 'el-icon-video-pause'
              : 'el-icon-video-play'
          "
          size="mini"
          >{{ rowId === scope.id && playing ? "暂停" : "试听" }}</el-button
        >
      </template>
    </common-table>

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
    <audio
      ref="audio"
      preload="metadata"
      autoplay
      :src="soundUrl"
      @ended="handleEnded"
    ></audio>
  </div>
</template>

<script>
import blogForm from "./blog-form";
export default {
  data() {
    return {
      queryForm: {},
      rowId: "",
      soundUrl: "",
      playing: false,
      tableData: [
        {
          id: 1,
          soundUrl:
            "http://res.iciba.com/resource/amp3/1/0/2b/d0/2bd0e890f8a04ea645fe2e0d4482d285.mp3"
        },
        {
          id: 2,
          soundUrl:
            "http://res.iciba.com/resource/amp3/1/0/18/d6/18d6769919266cd0bd6cd78aa405d5d0.mp3"
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
          prop: "createAt",
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
      showLogin: false
    };
  },
  components: {
    blogForm
  },
  methods: {
    // 试听发音
    toPlay({ id, soundUrl }) {
      const audio = this.$refs.audio;
      this.rowId = id;
      this.soundUrl = soundUrl;
      this.playing ? audio.pause() : audio.play();
      this.playing = !this.playing;
    },
    // 音频播放结束
    handleEnded() {
      this.playing = false;
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
              if (res.code === 200) {
                this.$refs.commonTable.getTableData();
                this.$toast("登录成功");
              }
              this.showLogin = false;
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
            this.$toast("删除成功");
            this.$refs.commonTable.getTableData();
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
