import dayjs from "dayjs";
import Vue from "vue";
// 注册dayjs全局中文包
import "dayjs/locale/zh-cn";

dayjs.locale("zh-cn");
// 引入相对时间的包
import relatveTime from "dayjs/plugin/relativeTime";
dayjs.extend(relatveTime);
// console.log(dayjs().to(dayjs("1990-01-01"))); // 多少年以前

// 全局过滤器：处理相对时间
Vue.filter("relativeTime", (value) => {
  return dayjs().to(dayjs(value));
});
