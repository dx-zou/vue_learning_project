<template>
  <el-card shadow="hover" :body-style="card">
    <el-form :inline="true">
      <slot></slot>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="small"
          v-if="showSearch"
          @click="search"
          >查询</el-button
        >
      </el-form-item>
    </el-form>
    <div class="btn-container" v-if="showButton">
      <el-button
        v-for="(item, index) in toolButtons"
        :key="index"
        :type="item.btnType || 'primary'"
        :icon="item.icon"
        @click="clickBtn(item.type)"
        size="mini"
        >{{ item.text }}</el-button
      >
    </div>
  </el-card>
</template>

<script>
export default {
  name: "TableToolbar",
  props: {
    toolButtons: {
      type: Array,
      default() {
        return [
          {
            icon: "el-icon-plus",
            text: "新增",
            type: "add"
          },
          {
            icon: "el-icon-delete",
            text: "批量删除",
            type: "delete",
            btnType: "danger"
          }
        ];
      }
    },
    showSearch: {
      type: Boolean,
      default: true
    },
    showAdd: {
      type: Boolean,
      default: true
    },
    showDelete: {
      type: Boolean,
      default: true
    },
    showButton: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      card: {
        display: "flex",
        padding: "5px 10px",
        "flex-direction": "row",
        "justify-content": "space-between"
      }
    };
  },

  //方法列表
  methods: {
    clickBtn(type) {
      this.$emit("handleToolClick", type);
    },
    search() {
      this.$emit("queryTable");
    }
  }
};
</script>

<style lang="scss" scoped>
.el-card {
  /deep/ .el-card__body {
    align-items: center;
    .el-form {
      .el-form-item {
        margin-bottom: 0;
      }
    }
    .btn-container {
      display: flex;
      align-items: center;
    }
    .el-tag {
      font-size: 0.16rem;
    }
  }
}
</style>
