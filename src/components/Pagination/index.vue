<template>
  <div class="pagination-container">
    <el-pagination
      :current-page.sync="currentPage"
      :page-size.sync="eachPageSize"
      :page-sizes="pageSizes"
      :layout="layout"
      :total="pageOptions.total"
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
    pageOptions: {
      type: Object,
      default() {
        return {
          pageNo: 1,
          pageSize: 50,
          total: 0
        };
      }
    },
    pageSizes: {
      type: Array,
      default() {
        return [5, 100, 200, 300];
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
        return this.pageOptions.pageNo;
      },
      set(val) {
        this.$emit("update:pageOptions.pageNo", val);
      }
    },
    // 每页的条数
    eachPageSize: {
      get() {
        return this.pageOptions.pageSize;
      },
      set(val) {
        this.$emit("update:pageOptions.pageSize", val);
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
      this.$emit("handlePageChange", val);
    }
  }
};
</script>
<style lang="scss">
.pagination-container {
  text-align: center;
}
</style>
