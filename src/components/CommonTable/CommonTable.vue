<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    :height="tableHeight"
    v-loading="isLoading"
    :border="showBorder"
    element-loading-text="加载中..."
    ref="multipleTable"
    tooltip-effect="light"
    @selection-change="handleSelectionChange"
  >
    <el-table-column
      v-if="showSelection"
      align="center"
      type="selection"
      width="55"
    ></el-table-column>
    <el-table-column
      v-for="item in tableOptions"
      :key="item.prop"
      :prop="item.prop"
      :label="item.label"
      :show-overflow-tooltip="item.showTooltip || false"
      :align="item.align || 'center'"
      :header-align="item.headerAlign || 'center'"
      :width="item.width || ''"
    ></el-table-column>
    <el-table-column
      align="center"
      v-if="showOperate"
      fixed="right"
      label="操作"
      :width="operateWidth"
    >
      <template slot-scope="scope">
        <slot :scope="scope" name="default">
          <el-button
            @click="changeRow(scope.row.id)"
            type="primary"
            size="small"
            v-if="showEdit"
            >修改</el-button
          >
          <el-button
            @click="goToDel(scope.row.id)"
            type="danger"
            size="small"
            v-if="showDelete"
            >删除</el-button
          >
        </slot>
        <slot :scope="scope" name="more"></slot>
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
    // 加载动画
    showBorder: {
      type: Boolean,
      default: false
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
      default: "200"
    },
    // 表格高度
    tableHeight: {
      type: String,
      default: "69.5vh"
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
      this.multipleSelection = val;
      // 存储批量删除的数组长度
      this.$store.commit(
        "CHANGE_MULTIPLE_LENGTH",
        this.multipleSelection.length
      );
      // 调用父组件方法
      this.$emit("handleSelectionChange", val);
    },
    // 修改行数据
    changeRow(id) {
      this.$emit("changeRow", id);
    },
    // 删除行数据
    goToDel(id) {
      this.$emit("goToDel", id);
    }
  }
};
</script>
