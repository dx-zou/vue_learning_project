<template>
  <common-table
    :table-options="tableOptions"
    :table-data="tableData"
    :is-loading="false"
    show-edit
    show-delete
    @editRow="editRow"
  ></common-table>
</template>

<script>
export default {
  data() {
    return {
      tableOptions: [
        { label: "编码", prop: "code" },
        { label: "名称", prop: "name" },
        { label: "型号", prop: "type" },
        { label: "单位", prop: "unit" },
        { label: "数量", prop: "quantity" },
        { label: "备注", prop: "remark" }
      ],
      tableData: [
        { code: "100", name: "200",id: 1, type: "2000", unit: "kg", quantity: 1000, remark: "selling"  },
        { code: "100", name: "200",id: 2, type: "2000", unit: "kg", quantity: 1000, remark: "selling"  },
        { code: "100", name: "200",id: 3, type: "2000", unit: "kg", quantity: 1000, remark: "selling"  },
        { code: "100", name: "200",id: 4, type: "2000", unit: "kg", quantity: 1000, remark: "selling"  },
      ]
    };
  },
  methods: {
    editRow(row) {
      console.log(row);
    }
  }
};
</script>
