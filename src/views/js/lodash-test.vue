<template>
  <div>
    lodash learning ...
  </div>
</template>

<script>
  import _ from "lodash";
  export default {
    data() {
      return {

      }
    },
    created() {
      this.concatArray();
    },
    methods: {
      concatArray() {
        var array = [1];
        var other = _.concat(array, 2, [3], [[4]])
        console.log(other)
      }
    }
  }
</script>
