<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <ArticleItem
        v-for="(item, index) in list"
        :key="index"
        :article="item"
      ></ArticleItem>
      <!-- <van-cell
        v-for="(item, index) in list"
        :key="index"
        :title="item.title"
      /> -->
    </van-list>
  </div>
</template>

<script>
import { getSearch } from "@/api";
import ArticleItem from "@/components/article-item";
export default {
  name: "SearchResult",
  components: { ArticleItem },
  props: {
    searchText: {
      type: String,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 10,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      const res = await getSearch({
        page: this.page, // 页码
        per_page: this.perPage, // 每页大小
        q: this.searchText, // 搜索关键字
      });
      this.list = [...this.list, ...res.data.data.results];
      this.loading = false;
      if (res.data.data.results.length) {
        this.page++;
      } else {
        this.finished = true;
      }
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(this.list.length + 1);
      //   }

      //   // 加载状态结束
      //   this.loading = false;

      //   // 数据全部加载完成
      //   if (this.list.length >= 40) {
      //     this.finished = true;
      //   }
      // }, 1000);
    },
  },
};
</script>

<style scoped lang="less"></style>
