<template>
  <div
    class="sidebar-logo-container"
    :class="{ collapse: collapse, 'light-theme': !$store.getters.darkTheme }"
  >
    <transition name="sidebarLogoFade">
      <router-link
        v-if="collapse"
        key="collapse"
        class="sidebar-logo-link"
        to="/"
      >
        <img src="@/assets/images/logo.gif" class="sidebar-logo" />
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img src="@/assets/images/logo.gif" class="sidebar-logo" />
        <span class="sidebar-title">{{ title }}</span>
      </router-link>
    </transition>
  </div>
</template>

<script>
export default {
  name: "SidebarLogo",
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      title: "Keep going"
    };
  }
};
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  height: 0.6rem;
  line-height: 0.6rem;
  background: $menuBg;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      display: inline-block;
      width: 0.55rem;
      height: 0.55rem;
      margin-right: 0.1rem;
      border-radius: 50%;
      vertical-align: middle;
      /*box-shadow: 0 0 0 2px #fd9495;*/
      animation: logo-rotate 8s linear infinite;
      &:hover {
        animation-play-state: paused; /*暂停动画*/
      }
    }

    & .sidebar-title {
      display: inline-block;
      font-weight: 700;
      line-height: 50px;
      font-size: 14px;
      color: #fff;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    text-align: left;
    .sidebar-logo {
      margin-right: 0;
    }
  }
  &.light-theme {
    background: #fff;
    .sidebar-title {
      color: #000;
    }
  }
  @keyframes logo-rotate {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
}
</style>
