<template>
  <common-table :isLoading="false" :tableOptions="tableOptions" :tableData="tableData"></common-table>
</template>

<script>
export default {
  data () {
    return {
      tableOptions: [
        { label: '原料编码', prop: 'materialcode' },
        { label: '原料名称', prop: 'materialname' },
        { label: '规格型号', prop: 'invstd' },
        { label: '单位', prop: 'unitname' },
        { label: '现存数量', prop: 'quantity' },
        { label: '现存件数', prop: 'num' },
        { label: '备注', prop: 'remark' }
      ],
      tableData: [
        { materialcode: '100', materialname: '200' },
        { materialname: '100' }
      ]
    }
  }
}
</script>
