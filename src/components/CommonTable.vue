<template>
  <el-table
    :data="tableData"
    :max-height="tableHeight || null"
    :border="showBorder"
    :header-row-style="{ height: '0.3rem' }"
    :header-cell-style="{ backgroundColor: '#fff', color: '#000' }"
    :default-expand-all="expandAll"
    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    row-key="id"
    tooltip-effect="light"
    v-loading="isLoading"
    element-loading-text="加载中..."
    @selection-change="handleSelectionChange"
    @filter-change="handleFilterChange"
    @sort-change="handleSort"
    style="width: 100%"
    ref="multipleTable"
  >
    <el-table-column
      v-if="showSelection"
      align="center"
      type="selection"
      width="55"
    ></el-table-column>
    <el-table-column
      v-for="item in tableColumns"
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
    >
      <template #default="{row}">
        <slot :name="item.slotName || ''" :scope="row">
          {{ row[item.prop] }}
        </slot>
      </template>
    </el-table-column>
    <el-table-column
      v-if="showOperate"
      :width="operateWidth"
      align="center"
      label="操作"
    >
      <template #default="{row}">
        <el-popover
          placement="left-start"
          width="160"
          trigger="hover"
          :open-delay="200"
          popper-class="btn-popover"
        >
          <slot :scope="row" name="default">
            <el-button
              @click="toEdit(row)"
              type="primary"
              icon="el-icon-edit"
              size="mini"
              >编辑</el-button
            >
            <el-button
              @click="toDelete(row)"
              type="danger"
              icon="el-icon-delete"
              size="mini"
              >删除</el-button
            >
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
  props: {
    // 表头字段
    tableColumns: {
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
    // 编辑按钮
    showEdit: {
      type: Boolean,
      default: true
    },
    // 删除按钮
    showDelete: {
      type: Boolean,
      default: true
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
      default: false
    },
    // 树形表格展开所有
    expandAll: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      multipleSelection: []
    };
  },
  mounted() {
    // console.log(this.$attrs);
    // console.log(this.$listeners);
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
    // 修改行数据
    toEdit(row) {
      this.$emit("toEdit", row);
    },
    // 删除行数据
    toDelete(id) {
      this.$emit("toDelete", id);
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
