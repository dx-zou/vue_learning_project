<template>
  <div class="user-container">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="编号" width="80" type="index" align="center"></el-table-column>
      <el-table-column prop="name" label="姓名" align="center"></el-table-column>
      <el-table-column prop="city" label="城市" align="center"></el-table-column>
      <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
      <el-table-column prop="birthday" label="生日" align="center"></el-table-column>
      <el-table-column prop="title" label="生日" align="center"></el-table-column>
      <el-table-column prop="image" label="头像" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.image" alt>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    id: "",
    name: {
      default: "",
      type: String
    }
  },
  data () {
    return {
      tableData: []
    }
  },
  created () {
    this.getUserlist()
  },
  methods: {
    getUserlist () {
      this.$http.get('getUserList').then(res => {
        this.tableData = res.data
      });
    }
  }
}
</script>

<style lang="less">
</style>
