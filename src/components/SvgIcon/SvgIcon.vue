<template>
   <svg  :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
  export default {
    name: "SvgIcon",
    props: {
      iconClass: {
        type: String,
        required: true
      },

    },
     computed: {
      iconName() {
        return `#icon-${this.iconClass}`
      },
      svgClass() {
        if (this.className) {
          return 'svg-icon' + this.className
        } else {
          return 'svg-icon'
        }
      }
    }
  }
</script>

<style lang="scss">
.svg-icon {
  width: 0.14rem;
  height: 0.14rem;
  //vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover!important;
  display: inline-block;
}
</style>
b
