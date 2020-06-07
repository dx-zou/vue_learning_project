<template>
  <div class="table-container">
    <!-- 搜索栏 -->
    <el-form
      inline
      :class="['table-search-form', !showSearchForm && 'form-hidden']"
    >
      <slot name="searchCustom"></slot>
      <slot name="searchDefault">
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            size="small"
            @click="searchTable"
            >查询</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-delete" size="small" @click="resetSearch"
            >重置</el-button
          >
        </el-form-item>
      </slot>
    </el-form>
    <!-- 顶部操作栏 -->
    <div class="table-operate_bar">
      <div class="bar-l">
        <slot name="operateCustom">
          <el-button size="small" type="primary">新增</el-button>
        </slot>
      </div>
      <div class="bar-r">
        <el-tooltip class="item" effect="dark" content="刷新" placement="top">
          <el-button size="small" icon="el-icon-refresh" circle></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="显隐" placement="top">
          <el-button
            size="small"
            icon="el-icon-view"
            circle
            @click="showSet = true"
          ></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="搜索" placement="top">
          <el-button
            size="small"
            icon="el-icon-search"
            circle
            @click="toggleSearch"
          ></el-button>
        </el-tooltip>
      </div>
    </div>
    <!-- table -->
    <el-table
      :data="tableData"
      :height="tableHeight || null"
      :border="showBorder"
      :header-row-style="{ height: '30px' }"
      :header-cell-style="{ backgroundColor: '#fafafa', color: '#000' }"
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
        v-for="item in columnList"
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
        <template #default="{row}" v-if="item.slotName">
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
          <slot :scope="row" name="default">
            <el-button-group>
              <el-tooltip effect="light" content="编辑" placement="top">
                <el-button
                  @click="toEdit(row)"
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                  circle
                ></el-button>
              </el-tooltip>
              <el-tooltip effect="light" content="删除" placement="top">
                <el-button
                  @click="toDelete(row)"
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  circle
                ></el-button>
              </el-tooltip>
            </el-button-group>
          </slot>
        </template>
      </el-table-column>
    </el-table>
    <common-dialog
      title="选择表格列"
      :visible.sync="showSet"
      :show-footer="false"
      width="35%"
    >
      <el-checkbox-group v-model="columnLabel" @change="handleColumnChange">
        <el-checkbox
          v-for="item in tableColumns"
          :key="item.label"
          :label="item.label"
          class="column-check"
        ></el-checkbox>
      </el-checkbox-group>
    </common-dialog>
  </div>
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
      default: "150"
    },
    // 表格高度
    tableHeight: {
      type: String,
      default: "calc(100vh - 280px)"
    },
    // 多选
    showSelection: {
      type: Boolean,
      default: false
    },
    // 渲染表格搜索栏
    showSearch: {
      type: Boolean,
      default: true
    },
    // 树形表格展开所有
    expandAll: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      multipleSelection: [],
      authBtnList: [],
      columnList: [],
      columnLabel: [],
      showSet: false,
      showSearchForm: true
    };
  },
  mounted() {
    this.columnList = this.tableColumns;
    this.columnLabel = this.columnList.map(item => item.label);
    // this.getAuthBtn();
  },
  methods: {
    // 获取有操作权限的按钮
    getAuthBtn() {
      let authButton = this.$store.getters.authButton || {};
      for (let key in authButton) {
        if (key === this.$route.name) {
          authButton[key].forEach(item => this.authBtnList.push(item.name));
          break;
        }
      }
    },
    // 多选框多选
    handleSelectionChange(val) {
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
    },
    // 选择表格显示的列
    handleColumnChange(value) {
      this.columnList = this.tableColumns.filter(item =>
        value.includes(item.label)
      );
    },
    searchTable() {},
    resetSearch() {},
    toggleSearch() {
      this.showSearchForm = !this.showSearchForm;
      const h = this.showSearchForm
        ? "calc(100vh - 280px)"
        : "calc(100vh - 240px)";
      this.tableHeight = h;
    }
  }
};
</script>
<style lang="scss">
.table-container {
  padding: 10px;
  .el-form {
    height: 50px;
    padding: 0 20px 10px;
    overflow: hidden;
    transition: all 0.3s;
    .el-form-item {
      margin-bottom: 0;
    }
  }
  .form-hidden {
    height: 0;
    padding: 0 20px;
  }
  .column-check {
    margin-bottom: 10px;
  }
}
.table-operate_bar {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  .el-button + .el-button {
    margin-left: 10px;
  }
}
</style>
