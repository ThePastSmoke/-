import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 引入day.js格式化时间插件
import "./utils/dayjs";
// 注册全局icon组件
import TouTiaoIcon from "@/components/TouTiaoIcon";
import "@/style/index.less";
// 引入vant组件库
import vant from "vant";
import "vant/lib/index.less";
Vue.use(vant);

// 引入适配文件
import "amfe-flexible";
// 引入测试接口文件
/* import request from "@/utils/request";
request.get("/v1_0/channels").then((res) => {
  console.log(res.data.data.channels);
}); */
// 关闭开发者提示工具
Vue.config.productionTip = false;
Vue.component("TouTiaoIcon", TouTiaoIcon);
new Vue({
  router, //注册路由
  store,
  render: (h) => h(App),
}).$mount("#app");
