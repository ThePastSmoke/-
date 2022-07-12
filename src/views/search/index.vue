<template>
  <div class="search-container">
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isShowSearch = false"
      />
    </form>

    <!-- 搜索结果页面 组件 -->
    <SearchResult :searchText="searchText" v-if="isShowSearch"></SearchResult>
    <!-- 搜索建议 组件 -->
    <SearchSuggestion
      :searchText="searchText"
      v-else-if="searchText"
      @onSearch="onSearch"
    ></SearchSuggestion>
    <!-- 搜索历史 组件 -->
    <SearchHistory
      @deleteAll="searchHistory = []"
      @onSearch="onSearch"
      :searchHistory="searchHistory"
      v-else
    ></SearchHistory>
  </div>
</template>

<script>
import SearchHistory from "@/views/search/components/search-history.vue";
import SearchSuggestion from "@/views/search/components/search-suggestion.vue";
import SearchResult from "@/views/search/components/search-result.vue";
import { HISTORYKEY } from "@/constants";
import { setLocat, getLocat } from "@/utils/storage";
export default {
  name: "SearchPage",
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult,
  },
  props: {},
  data() {
    return {
      searchText: "", // 搜索框值
      isShowSearch: false, // 判断搜索栏是否显示
      searchHistory: getLocat(HISTORYKEY) || [], // 搜索历史
    };
  },
  computed: {},
  watch: {
    // 监听searchHistory存入本地存储
    searchHistory(val) {
      setLocat(HISTORYKEY, val);
    },
  },
  created() {},
  methods: {
    // 搜索触发
    onSearch(value) {
      // 默认搜索历史 >>如果搜索框有内容 搜索内容 >> 按下回车搜索结果
      this.isShowSearch = true;
      this.searchText = value;
      console.log("正在搜索");
      // 添加之前先判断value是否存在搜索历史列表里面
      const index = this.searchHistory.indexOf(value);
      if (index !== -1) {
        // 找到这一项删除
        this.searchHistory.splice(index, 1);
      }
      this.searchHistory.unshift(value);
    },
    // 点击搜索栏取消按钮时触发
    onCancel() {
      this.$router.push({ path: "/home" });
      console.log("取消了搜索");
    },
  },
};
</script>

<style scoped lang="less"></style>
