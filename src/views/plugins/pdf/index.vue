<template>
  <div>
    <!-- <JwChat-index
      :tool-config="tool"
      :config="config"
      :taleList="list"
      @enter="bindEnter"
      v-model="inputMsg"
    /> -->
    <!-- <pdf
      src="https://dakaname.oss-cn-hangzhou.aliyuncs.com/file/2018-12-28/1546003237411.pdf"
    ></pdf> -->
  </div>
</template>

<script>
// import pdf from "vue-pdf";
export default {
  data() {
    return {
      pdf_src: "",
      list: [
        {
          date: "2020/04/25 21:19:07",
          text: {
            text: "<audio data-src='https://www.w3school.com.cn/i/horse.mp3'/>"
          },
          mine: false,
          name: "只盼流星不盼雨",
          img: "./gf.jpg"
        },
        {
          date: "2020/04/25 21:19:07",
          text: { text: "<img data-src='./gf.jpg'/>" },
          mine: false,
          name: "只盼流星不盼雨",
          img: "./gf.jpg"
        },
        {
          date: "2020/04/16 21:19:07",
          text: {
            text:
              "<video data-src='https://www.w3school.com.cn/i/movie.mp4' controls='controls' />"
          },
          mine: true,
          name: "JwChat",
          img: "./gf.jpg"
        }
      ],
      inputMsg: "hhhh",
      tool: {
        show: ["file", "history", "img"],
        callback: this.toolEvent,
        showEmoji: true
      },
      config: {
        img: "./gf.jpg",
        name: "feeng",
        dept: "最简单、最便捷",
        callback: this.headerEvent
      }
    };
  },
  // components: {
  //   pdf
  // },
  methods: {
    bindEnter() {
      const msg = this.inputMsg;
      if (!msg) return;
      const msgObj = {
        date: "2020/05/20 23:19:07",
        text: { text: msg },
        mine: true,
        name: "JwChat",
        img: "./gf.jpg"
      };
      this.list.push(msgObj);
    },
    toolEvent(type) {
      console.log(type);
    },
    headerEvent(type) {
      console.log(type);
    }
  }
};
</script>

<style lang="scss" scoped></style>
