<template>
  <canvas ref="cas" width="300" height="300"></canvas>
</template>

<script>
export default {
  name: "clock",
  mounted() {
    this.draw();
  },
  methods: {
    draw() {}
  }
};
</script>

<style lang="scss" scoped></style>
