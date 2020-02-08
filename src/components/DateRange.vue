<template>
  <div class="date-range">
    <el-select
      v-model="dateRangeValue"
      placeholder="请选择"
      clearable
      style="width:100%"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
    <slot name="range" :dateRange="dateRange"></slot>
  </div>
</template>

<script>
export default {
  name: "FnDateRange",
  data() {
    return {
      dateRangeValue: "",
      options: [
        { value: 1, label: "最近三天" },
        { value: 2, label: "最近一周" },
        { value: 3, label: "最近一个月" },
        { value: 4, label: "最近三个月" },
        { value: 5, label: "最近半年" },
        { value: 6, label: "最近一年" },
        { value: 7, label: "未来七天" },
        { value: 8, label: "未来三个月" },
        { value: 9, label: "本月" },
        { value: 10, label: "下个月" },
        { value: 11, label: "上个月" },
        { value: 12, label: "上一个季度" },
        { value: 13, label: "本年度" }
      ],
      dateRange: {
        start_time: undefined,
        end_time: undefined
      }
    };
  },
  watch: {
    dateRangeValue() {
      switch (this.dateRangeValue) {
        case 1:
          this.latestTime(3); // 最近三天
          break;
        case 2:
          this.latestTime(7); // 最近7天
          break;
        case 3:
          this.latestTime(1, "month"); // 最近1个月
          break;
        case 4:
          this.latestTime(3, "month"); // 最近三个月
          break;
        case 5:
          this.latestTime(6, "month"); // 最近半年
          break;
        case 6:
          this.latestTime(12, "month"); // 最近一年
          break;
        case 7:
          this.futureTime(6); // 未来七天
          break;
        case 8:
          this.futureTime(3, "month"); // 未来三个月
          break;
        case 9:
          this.whichMonth(); // 本月
          break;
        case 10:
          this.whichMonth("next"); // 下一个月
          break;
        case 11:
          this.whichMonth("prev"); // 上一个月
          break;
        case 12:
          this.quarterSelect(); // 上一个季度
          break;
        case 13:
          this.thisYear(); // 本年度
          break;
        default:
          break;
      }
      this.$emit(
        "getRange",
        this.dateRange.start_time,
        this.dateRange.end_time
      );
    }
  },
  methods: {
    // 格式化日期时间
    dateFormate(date) {
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let hour = date.getHours();
      let minute = date.getMinutes();
      let second = date.getSeconds();
      month = month.toString().padStart(2, 0);
      day = day.toString().padStart(2, 0);
      hour = hour.toString().padStart(2, 0);
      minute = minute.toString().padStart(2, 0);
      second = second.toString().padStart(2, 0);
      return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    },
    // 获取每月的天数
    getMonthDays(year, month) {
      var d = new Date(year, month, 0);
      return d.getDate();
    },
    // 设置一天的起始时间和结束时间
    setTime(date, start) {
      if (start) {
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
      } else {
        date.setHours(23);
        date.setMinutes(59);
        date.setSeconds(59);
      }
      return date;
    },
    // 最近一段时间,value：数量；flag：月，不传即是天
    latestTime(value, flag) {
      let date = new Date();
      this.dateRange.end_time = this.dateFormate(date);
      flag
        ? date.setMonth(date.getMonth() - value)
        : date.setDate(date.getDate() - value);
      this.dateRange.start_time = this.dateFormate(date);
    },
    // 未来一段时间
    futureTime(value, flag) {
      let date = new Date();
      date.setDate(date.getDate() + 1);
      this.setTime(date, "start");
      this.dateRange.start_time = this.dateFormate(date);
      flag
        ? date.setMonth(date.getMonth() + value)
        : date.setDate(date.getDate() + value);
      this.setTime(date);
      this.dateRange.end_time = this.dateFormate(date);
    },
    // 本月，上一个月，下一个月
    whichMonth(flag) {
      let date = new Date();
      // 本月起始时间
      date.setDate(1);
      this.setTime(date, "start");
      // 如果是下一个月，month+1
      flag == "next" && date.setMonth(date.getMonth() + 1);
      flag == "prev" && date.setMonth(date.getMonth() - 1);
      this.dateRange.start_time = this.dateFormate(date);
      // 本月结束时间
      var d = this.getMonthDays(date.getFullYear(), date.getMonth() + 1);
      date.setDate(d);
      this.setTime(date);
      this.dateRange.end_time = this.dateFormate(date);
    },
    // 本年度
    thisYear() {
      let date = new Date();
      let start = `${date.getFullYear()}-1-1 0:0:0`;
      this.dateRange.start_time = this.dateFormate(new Date(start));
      let end = `${date.getFullYear()}-12-31 23:59:59`;
      this.dateRange.end_time = this.dateFormate(new Date(end));
    },
    // 每一个季度开始和结束的时间
    quarterRange(num) {
      let start_day;
      let end_day = "";
      let date = new Date();
      switch (num) {
        case 1:
          start_day = "1-1";
          end_day = "3-31";
          break;
        case 2:
          start_day = "4-1";
          end_day = "6-30";
          break;
        case 3:
          start_day = "7-1";
          end_day = "9-30";
          break;
        case 4:
          start_day = "10-1";
          end_day = "12-31";
          date.setFullYear(date.getFullYear() - 1);
          break;
        default:
          break;
      }
      let start = `${date.getFullYear()}-${start_day} 0:0:0`;
      this.dateRange.start_time = this.dateFormate(new Date(start));
      let end = `${date.getFullYear()}-${end_day} 23:59:59`;
      this.dateRange.end_time = this.dateFormate(new Date(end));
    },
    // 上一个季度
    quarterSelect() {
      let date = new Date();
      let month = date.getMonth() + 1;
      if (month < 4) {
        this.quarterRange(4); // 去年最后一个季度
      } else if (month < 7) {
        this.quarterRange(1); // 本年第一个季度
      } else if (month < 10) {
        this.quarterRange(2); // 本年第二个季度
      } else {
        this.quarterRange(3); // 本年第三个季度
      }
    }
  }
};
</script>

<style lang="scss"></style>
