<template>
  <div>
    <van-cell
      @click="hancleClick(item)"
      v-for="(item, index) in list"
      :key="index"
      icon="search"
      :title="item"
    >
      <template #title>
        <div v-html="highLight(item)"></div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from "@/api";
// lodash 支持按需加载，有利于打包结果优化
import { debounce } from "lodash";
export default {
  name: "SearchSuggestion",
  data() {
    return {
      list: [],
    };
  },
  props: {
    searchText: String,
  },
  watch: {
    searchText: {
      // 首次监视触发
      immediate: true,
      // 监视的处理函数 防抖
      handler: debounce(function (value) {
        this.getSearchSuggestion(value);
      }, 500),
    },
  },
  methods: {
    hancleClick(value) {
      // console.log(value);
      this.$emit("onSearch", value);
    },
    highLight(item) {
      const reg = new RegExp(this.searchText, "gi");
      return item.replace(
        reg,
        `<span style="color:red;">${this.searchText.toUpperCase()}</span>`
      );
    },
    async getSearchSuggestion(q) {
      const res = await getSearchSuggestion(q);
      this.list = res.data.data.options;
    },
  },
};
</script>

<style lang="less" scoped></style>
