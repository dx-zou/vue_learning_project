<template>
  <div class="table-container">
    <div class="table-top-bar" v-if="showForm || showAdd">
      <el-form inline class="table-search-form" v-if="showForm">
        <slot name="tableSearch"></slot>
        <span v-show="searchExpand">
          <slot name="tableSearchMore"></slot>
        </span>
        <slot name="searchDefault">
          <el-form-item v-if="showSearch">
            <el-button
              type="primary"
              icon="el-icon-search"
              size="mini"
              @click="searchTable"
              >搜索</el-button
            >
            <el-button
              icon="el-icon-refresh-right"
              size="mini"
              @click="resetSearch"
              >重置</el-button
            >
            <el-button
              v-if="showSearchExpand"
              :icon="
                searchExpand ? 'el-icon-caret-top' : 'el-icon-caret-bottom'
              "
              size="mini"
              @click="searchExpand = !searchExpand"
              >{{ searchExpand ? "收起" : "展开" }}</el-button
            >
          </el-form-item>
        </slot>
      </el-form>
      <div class="table-operate_bar" v-if="showAdd">
        <slot name="tableAdd"></slot>
        <el-button size="mini" type="primary" icon="el-icon-plus" @click="toAdd"
          >新增</el-button
        >
        <el-button
          size="mini"
          type="danger"
          icon="el-icon-delete"
          @click="toDelete('mul')"
          >删除</el-button
        >
        <el-button
          v-if="showToggleColumn"
          size="mini"
          type="primary"
          icon="el-icon-s-operation"
          @click="showSet = true"
          >展示列</el-button
        >
        <el-button
          v-if="showExpandRow"
          size="mini"
          type="primary"
          @click="expandRow"
          icon="el-icon-sort"
          >{{ defaultExpandRow ? "全部折叠" : "全部展开" }}</el-button
        >
      </div>
    </div>
    <slot name="tableCenter"></slot>
    <el-table
      :data="tableData"
      :max-height="tHeight || null"
      size="mini"
      :cell-style="{ padding: '3px 0', fontSize: '14px' }"
      :border="showBorder"
      :header-cell-style="{
        backgroundColor: '#d7e3f2',
        color: 'black',
        fontSize: '14px',
        fontWeight: 'bold',
        padding: '2px 0'
      }"
      :lazy="lazy"
      :load="load"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      :row-key="rowKey"
      :highlight-current-row="highlightCurrentRow"
      :default-expand-all="defaultExpandRow"
      tooltip-effect="light"
      v-loading="loading"
      element-loading-text="加载中..."
      @selection-change="handleSelectionChange"
      @current-change="currentRowChange"
      @filter-change="handleFilterChange"
      @row-dblclick="handleRowDblclick"
      @sort-change="handleColumnSort"
      style="width: 100%"
      ref="multipleTable"
    >
      <el-table-column
        v-if="showSelection"
        align="center"
        type="selection"
        width="65"
      ></el-table-column>
      <el-table-column
        v-if="showIndex"
        align="center"
        type="index"
        label="序号"
        width="65"
      ></el-table-column>
      <el-table-column
        v-for="(item, index) in columnList"
        :key="item.prop"
        :type="item.type"
        :prop="columnListCopy[index].prop"
        :column-key="columnListCopy[index].columnKey"
        :label="item.label"
        :show-overflow-tooltip="item.showTooltip || false"
        :align="item.align || globalAlign || 'left'"
        :header-align="item.headerAlign || globalAlign || 'left'"
        :min-width="item.width || ''"
        :sortable="item.sortable || globalSortable"
        :filters="item.filters || null"
        :formatter="item.formatter || null"
      >
        <template #header="{row}" v-if="item.headerSlotName">
          <slot :name="item.headerSlotName || ''" :scope="row"></slot>
        </template>
        <template #default="{row}" v-if="item.slotName">
          <slot :name="item.slotName || ''" :scope="row">{{
            row[item.prop]
          }}</slot>
        </template>
      </el-table-column>
      <el-table-column
        v-if="showOperate"
        :width="operateWidth"
        align="left"
        headerAlign="left"
        label="操作"
      >
        <template #default="{row}">
          <el-button
            @click="toEdit(row)"
            type="text"
            icon="el-icon-edit"
            size="mini"
            v-if="showEdit"
            >编辑</el-button
          >
          <el-button
            @click="toDelete(row)"
            type="text"
            icon="el-icon-delete"
            size="mini"
            v-if="showDelete"
            >删除</el-button
          >
          <slot :scope="row" name="default"></slot>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :page-options="page"
      @handlePageChange="handlePageChange"
      @handleSizeChange="handleSizeChange"
    />
    <common-dialog
      title="选择表格列"
      :visible.sync="showSet"
      :show-footer="false"
      width="40%"
    >
      <el-checkbox-group
        v-model="selectedColumnList"
        @change="handleColumnChange"
      >
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
import Sortable from "sortablejs";

export default {
  name: "CommonTable",
  props: {
    tableUrl: {
      type: String
    },
    // 表头字段
    tableColumns: {
      type: Array
    },
    // 分页
    page: {
      type: Object,
      default() {
        return {
          total: 10,
          pageSize: 3,
          pageNum: 1
        };
      }
    },
    // 搜索数据
    queryForm: {
      type: Object,
      default() {
        return {};
      }
    },
    // 懒加载树形表格数据
    load: {
      type: Function
    },
    // 边框
    showBorder: {
      type: Boolean,
      default: true
    },
    // 搜索栏展开
    searchExpand: {
      type: Boolean,
      default: false
    },
    // 搜索栏展开按钮
    showSearchExpand: {
      type: Boolean,
      default: false
    },
    // 树形数据懒加载
    lazy: {
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
    // 新增按钮
    showAdd: {
      type: Boolean,
      default: true
    },
    // 表格行唯一标识
    rowKey: {
      type: String,
      default: "id"
    },
    // 全局表格对齐方式
    globalAlign: {
      type: String
    },
    // 全局列排序
    globalSortable: {
      type: [String, Boolean],
      default: false
    },
    // 操作栏宽度
    operateWidth: {
      type: String,
      default: "200"
    },
    // 表格高度
    tableHeight: {
      type: String,
      default: "500px"
    },
    // 多选
    showSelection: {
      type: Boolean,
      default: false
    },
    // 序号
    showIndex: {
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
    },
    // 显示展示列按钮
    showToggleColumn: {
      type: Boolean,
      default: true
    },
    showExpandRow: {
      type: Boolean,
      default: false
    },
    // 是否展示搜索框
    showForm: {
      type: Boolean,
      default: true
    },
    highlightCurrentRow: {
      type: Boolean,
      default: true
    },
    // 表格列是否可拖动
    columnDragable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tableData: [],
      multipleSelection: [], // 已选择的行数据
      columnList: [], // 列数据
      columnListCopy: [],
      selectedColumnList: [], // 展示的列
      showSet: false,
      loading: false,
      defaultExpandRow: false, // 默认展开树形表格行
      formData: {}, // 搜索数据
      columnOrder: {}
    };
  },
  computed: {
    tHeight: {
      get() {
        return this.tableHeight;
      },
      set() {}
    }
  },
  mounted() {
    this.handleColumnShow();
    this.columnDragable && this.handleColumnDrag();
    this.getTableData();
  },
  methods: {
    // 处理列的显示
    handleColumnShow() {
      // 阻止默认行为
      document.body.ondrop = function(event) {
        event.preventDefault();
        event.stopPropagation();
      };
      const res = [...this.tableColumns].filter(col => !col.hiddenColumn);
      this.columnList = [...res];
      this.columnListCopy = [...res];
      // 默认不展示的列不选中
      this.selectedColumnList = this.columnList.map(
        item => !item.hiddenColumn && item.label
      );
    },
    // 选择表格显示的列
    handleColumnChange(value) {
      this.columnList = this.tableColumns.filter(item => {
        if (value.includes(item.label)) {
          item.hiddenColumn = false;
          return item;
        }
      });
      this.columnListCopy = [...this.columnList];
    },

    // 列拖拽方法
    handleColumnDrag() {
      const wrapperTr = document.querySelectorAll(
        ".el-table__header-wrapper tr"
      );
      for (const ele of Array.from(wrapperTr)) {
        Sortable.create(ele, {
          animation: 180,
          delay: 0,
          onEnd: evt => {
            if (this.showSelection || this.showIndex) {
              const oldItem = this.columnListCopy[evt.oldIndex - 1];
              this.columnListCopy.splice(evt.oldIndex - 1, 1);
              this.columnListCopy.splice(evt.newIndex - 1, 0, oldItem);
            } else {
              const oldItem = this.columnListCopy[evt.oldIndex];
              this.columnListCopy.splice(evt.oldIndex, 1);
              this.columnListCopy.splice(evt.newIndex, 0, oldItem);
            }
          }
        });
      }
    },
    /**
     * @description 获取表格数据
     */
    async getTableData() {
      if (!this.tableUrl) return;
      this.loading = true;
      const { pageNum, pageSize } = this.page;
      const params = {
        pageNum,
        pageSize,
        ...this.queryForm,
        ...this.columnOrder
      };
      const res = await this.$http.get(this.tableUrl, { params });
      if (res.code === 200) {
        this.tableData = res.data.rows;
        this.page.total = res.data.total;
      }
      this.loading = false;
    },
    /**
     * @description 当前页码数变化
     */
    handlePageChange(val) {
      this.page.pageNum = val;
      this.getTableData();
    },
    /**
     * @description 每页条数变化
     */
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.getTableData();
    },
    // 搜索表格
    searchTable() {
      Object.assign(this.queryForm, this.formData);
      this.getTableData();
    },
    // 重置搜索条件
    resetSearch() {
      this.$emit("resetSearch");
    },
    // 树结构展开与折叠
    expandRow() {
      this.defaultExpandRow = !this.defaultExpandRow;
      this.$nextTick(() => {
        this.forArr(this.tableData, this.defaultExpandRow);
      });
    },
    // 遍历
    forArr(arr, isExpand) {
      arr.forEach(i => {
        // toggleRowExpansion(i, isExpand)用于多选表格，
        // 切换某一行的选中状态，如果使用了第二个参数，
        // 则是设置这一行选中与否（selected 为 true 则选中）
        this.$refs.multipleTable.toggleRowExpansion(i, isExpand);
        if (i.children) {
          this.forArr(i.children, isExpand);
        }
      });
    },
    // 多选框多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      // 调用父组件方法
      this.$emit("handleSelectionChange", val);
    },
    // 选中行
    currentRowChange(val) {
      this.$emit("currentRowChange", val);
    },
    // 新增
    toAdd() {
      this.$emit("toAdd", "add");
    },
    // 修改行数据
    toEdit(row) {
      this.$emit("toEdit", row);
    },
    // 删除行数据
    toDelete(row) {
      this.$emit("toDelete", row);
    },
    // 列过滤
    handleFilterChange(filters) {
      this.$emit("handleFilterChange", filters);
    },
    // 双击表格行
    handleRowDblclick(row, column, event) {
      this.$emit("handleRowDblclick", row, column, event);
    },
    // 列排序
    handleColumnSort({ order, prop }) {
      if (order) {
        this.columnOrder = {
          orderType: order === "ascending" ? "ASC" : "DESC", // true 升序 false降序
          orderColumn: prop
        };
        this.getTableData();
      }
    }
  }
};
</script>
<style lang="scss">
.table-container {
  padding: 10px;
  .table-top-bar {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .table-search-form {
      flex: 1;
      .el-form-item {
        margin-bottom: 5px;
      }
    }
  }
  .el-table {
    margin: 10px 0;
  }
  .column-check {
    margin-bottom: 10px;
  }
}
</style>
