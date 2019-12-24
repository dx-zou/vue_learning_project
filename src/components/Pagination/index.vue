<template>
  <div class="pagination-container">
    <el-pagination
      :current-page.sync="currentPage"
      :page-size="eachPageSize"
      :page-sizes="pageSizes"
      :layout="layout"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    total: {
      type: Number,
      default: 0
    },
    pageIndex: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 50
    },
    pageSizes: {
      type: Array,
      default() {
        return [50, 100, 200, 300];
      }
    },
    layout: {
      type: String,
      default: "total, sizes, prev, pager, next, jumper"
    }
  },
  computed: {
    // 当前页码数
    currentPage: {
      get() {
        return this.pageIndex;
      },
      set(val) {
        this.$emit("update:pageIndex", val);
      }
    },
    // 每页的条数
    eachPageSize: {
      get() {
        return this.pageSize;
      },
      set(val) {
        this.$emit("update:pageSize", val);
      }
    }
  },
  methods: {
    // 每页条数改变
    handleSizeChange(val) {
      this.$emit("sizeChange", val);
    },
    // 当前页改变
    handleCurrentChange(val) {
      this.$emit("currentChange", val);
    }
  }
};
</script>
<style lang="scss">
.pagination-container {
  text-align: center;
}
</style>
