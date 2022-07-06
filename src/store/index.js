import Vue from "vue";
import Vuex from "vuex";
import { setLocat, getLocat } from "@/utils/storage";

Vue.use(Vuex);
const tokenKye = "token_toutiao";
export default new Vuex.Store({
  state: {
    user: getLocat(tokenKye),
  },
  getters: {},
  mutations: {
    // 修改state里的值user是login里请求回来的token值
    setUser(state, user) {
      state.user = user;
      // 存入本地存储
      setLocat(tokenKye, user);
    },
  },
  actions: {},
  modules: {},
});
