<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    :height="tableHeight || null"
    v-loading="isLoading"
    :border="showBorder"
    :header-row-style="{ height: '0.3rem' }"
    :header-cell-style="{ backgroundColor: '#fff', color: '#000' }"
    element-loading-text="加载中..."
    tooltip-effect="light"
    @selection-change="handleSelectionChange"
    @filter-change="handleFilterChange"
    @sort-change="handleSort"
    ref="multipleTable"
  >
    <el-table-column v-if="showSelection" align="center" type="selection" width="55"></el-table-column>
    <el-table-column
      v-for="item in tableOptions"
      :key="item.prop"
      :column-key="item.columnKey"
      :prop="item.prop"
      :label="item.label"
      :show-overflow-tooltip="item.showTooltip || false"
      :align="item.align || 'center'"
      :header-align="item.headerAlign || 'center'"
      :width="item.width || ''"
      :sortable="item.sortable || false"
      :filters="item.filters || null"
      :formatter="item.formatter || null"
    ></el-table-column>
    <!-- 在尾部添加自定义操作栏 -->
    <el-table-column
      align="center"
      v-if="showOperate"
      fixed="right"
      label="操作"
      :width="operateWidth"
    >
      <template slot-scope="scope">
        <el-popover
          placement="left-start"
          width="160"
          trigger="hover"
          :open-delay="200"
          popper-class="btn-popover"
        >
          <!-- 如果不要相关操作按钮，在属性中改变默认值 -->
          <slot :scope="scope" name="default">
            <el-button
              @click="editRow(scope.row.id)"
              type="primary"
              icon="el-icon-edit"
              size="mini"
              v-if="showEdit"
            >编辑</el-button>
            <el-button
              @click="goToDel(scope.row.id)"
              type="danger"
              icon="el-icon-delete"
              size="mini"
              v-if="showDelete"
            >删除</el-button>
          </slot>
          <span class="iconfont icon-more operate-icon" slot="reference"></span>
        </el-popover>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "CommonTable",
  data() {
    return {
      multipleSelection: []
    };
  },
  props: {
    // 表头字段
    tableOptions: {
      type: Array
    },
    // 表格数据
    tableData: {
      type: Array
    },
    // 加载动画
    isLoading: {
      type: Boolean,
      default: true
    },
    // 边框
    showBorder: {
      type: Boolean,
      default: true
    },
    // 显示操作栏
    showOperate: {
      type: Boolean,
      default: true
    },
    //更新操作按钮
    showUpdate: {
      type: Boolean,
      default: false
    },
    //单条审核按钮
    showAudit: {
      type: Boolean,
      default: false
    },
    // 编辑按钮
    showEdit: {
      type: Boolean,
      default: false
    },
    // 删除按钮
    showDelete: {
      type: Boolean,
      default: false
    },
    // 操作栏宽度
    operateWidth: {
      type: String,
      default: "100"
    },
    // 表格高度
    tableHeight: {
      type: String,
      default: "79vh"
    },
    // 多选
    showSelection: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    // 多选框多选
    handleSelectionChange(val) {
      // this.multipleSelection = val.map(item => item.id);
      // 存储批量删除的数组长度
      // this.$store.commit(
      //   'CHANGE_MULTIPLE_LENGTH',
      //   this.multipleSelection.length
      // )
      // 调用父组件方法
      this.$emit("handleSelectionChange", val);
    },
    //更新
    goUpdate(row) {
      this.$emit("goUpdate", row);
    },
    //去审核
    goAudit(id) {
      this.$emit("goAudit", id);
    },
    //查看详情
    checkDetail(id) {
      this.$emit("checkDetail", id);
    },
    // 修改行数据
    editRow(id) {
      this.$emit("editRow", id);
    },
    // 删除行数据
    goToDel(id) {
      this.$emit("goToDel", id);
    },
    //重置密码
    handlePassword(id) {
      this.$emit("handlePassword", id);
    },
    // 列过滤
    handleFilterChange(filters) {
      this.$emit("handleFilterChange", filters);
    },
    // 列排序
    handleSort(val) {
      this.$emit("handleSort", val);
    }
  }
};
</script>
<style lang="scss">
.el-table {
  margin: 0.1rem 0;
  .operate-icon {
    vertical-align: middle;
    font-size: 0.26rem;
    cursor: pointer;
  }
}

.btn-popover {
  display: flex;
  flex-direction: column;
  padding-bottom: 0;

  .el-button {
    margin-bottom: 0.1rem;
  }

  .el-button + .el-button {
    margin-left: 0;
  }
}
</style>
