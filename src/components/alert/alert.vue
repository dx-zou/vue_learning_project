<template>
  <transition name="alert">
    <div class="fn-alert" :class="[typeClass]" v-show="visible">
      <i :class="[iconClass]" v-if="showIcon"></i>
      <div class="fn-alert-content">
        <span class="fn-alert-title" :class="1" v-if="title">
          <slot name="title">{{ title }}</slot>
        </span>
        <p class="fn-alert-description" v-if="description">{{ description }}</p>
        <i
          class="el-alert__closebtn"
          :class="{
            'is-customed': closeText !== '',
            'el-icon-close': closeText === ''
          }"
          v-show="closable"
          @click="close()"
          >{{ closeText }}</i
        >
      </div>
    </div>
  </transition>
</template>
<script>
const ICON_CLASSES_MAP = {
  success: "el-icon-success",
  error: "el-icon-error",
  warning: "el-icon-warning"
};
export default {
  name: "fnAlert",
  props: {
    showIcon: Boolean,
    type: {
      type: String,
      default: "info"
    },
    title: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: ""
    },
    closable: {
      type: Boolean,
      default: true
    },
    closeText: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      visible: true
    };
  },
  computed: {
    typeClass() {
      return `fn-alert-${this.type}`;
    },
    iconClass() {
      return ICON_CLASSES_MAP[this.type] || "el-icon-info";
    }
  },
  methods: {
    close() {
      this.visible = false;
      this.$emit("close");
    }
  }
};
</script>

<style lang="scss">
.fn-alert {
  display: flex;
  width: 100%;
  height: 40px;
  align-items: center;
  padding: 0 20px;
  margin-bottom: 10px;
  background-color: #f0f9eb;
  .fn-alert-content {
    position: relative;
    flex: 1;
    margin-left: 10px;
    .el-alert__closebtn {
      position: absolute;
      top: 2px;
      right: 10px;
    }
  }
}
.fn-alert-success {
  color: #67c23a;
  background-color: #f0f9eb;
}
.fn-alert-info {
  color: #909399;
  background-color: #f4f4f5;
}
.fn-alert-error {
  color: #f56c6c;
  background-color: #fef0f0;
}
.fn-alert-warning {
  color: #e6a23c;
  background-color: #fdf6ec;
}

.alert-enter,
.alert-leave-to {
  opacity: 0;
  transform: translateY(-100px);
}
.alert-enter-active,
.alert-leave-active {
  transition: all 0.3s ease-in-out;
}
</style>
