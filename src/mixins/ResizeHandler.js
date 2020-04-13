import store from "@/store";

const { body } = document;
const WIDTH = 992; // refer to Bootstrap's responsive design

export default {
  watch: {
    $route() {
      if (this.device === "mobile" && this.sidebarCollapse) {
        store.dispatch("settings/closeSideBar");
      }
    }
  },
  beforeMount() {
    window.addEventListener("resize", this.$_resizeHandler);
    this.$once("hook:beforDestroy", () => {
      console.log("hook:beforDestroy");

      window.removeEventListener("resize", this.$_resizeHandler);
    });
  },
  // beforeDestroy() {
  //   window.removeEventListener("resize", this.$_resizeHandler);
  // },
  mounted() {
    const isMobile = this.isMobileMode();
    if (isMobile) {
      store.dispatch("app/toggleDevice", "mobile");
      store.dispatch("settings/closeSideBar");
    }
  },
  methods: {
    isMobileMode() {
      const rect = body.getBoundingClientRect();
      return rect.width - 1 < WIDTH;
    },
    $_resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.isMobileMode();
        store.dispatch("app/toggleDevice", isMobile ? "mobile" : "desktop");

        if (isMobile) {
          store.dispatch("settings/closeSideBar");
        }
      }
    }
  }
};
