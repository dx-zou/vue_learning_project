<template>
  <el-select
    v-model="selectValue"
    :placeholder="placeholder"
    :size="size"
    :disabled="disabled"
    :value-key="valueKey"
    filterable
    clearable
    style="width: 100%"
  >
    <el-option
      v-for="item in optionList"
      :key="item[optionsProp[1]]"
      :label="item[optionsProp[0]]"
      :value="item[optionsProp[1]]"
    >
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: "CommonSelect",
  props: {
    placeholder: {
      type: String,
      default: "请选择"
    },
    // 渲染选择框的数据
    optionList: {
      type: Array,
      required: true
    },
    // 指定 label value 对应的键名
    optionsProp: {
      type: Array,
      default: function() {
        return ["label", "value"];
      }
    },
    // 输入框尺寸
    size: {
      type: String,
      default: ""
    },
    // 绑定值为对象时，指定键名
    valueKey: {
      type: String,
      default: ""
    },
    // 绑定值
    value: {
      type: [String, Boolean, Number, Object],
      required: true
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    selectValue: {
      get: function() {
        return this.value;
      },
      set: function(newVal) {
        this.$emit("changeValue", newVal);
      }
    }
  }
};
</script>
