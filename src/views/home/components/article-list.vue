<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="refreshLoading"
      @refresh="onRefresh"
      :success-text="successText"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="出错了,点击重新加载 ~"
      >
        <!-- 封装组件进行渲染 把请求过来的数据传入封装的组件里 -->
        <articleItem
          :article="item"
          v-for="(item, index) in list"
          :key="index"
        ></articleItem>
        <!-- <van-cell
          v-for="(item, index) in list"
          :key="index"
          :title="item.title"
        /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticle } from "@/api";
import articleItem from "@/components/article-item";
export default {
  name: "ArticleList",
  components: {
    articleItem,
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      pre_timestamp: null,
      error: false,
      refreshLoading: false,
      successText: "",
    };
  },
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // 获取文章列表数据
      try {
        const res = await getArticle({
          channel_id: this.channel.id,
          timestamp: this.pre_timestamp || Date.now(),
          with_top: 1,
        });
        this.list = [...this.list, ...res.data.data.results];
        this.loading = false;

        // 数据请求完了
        if (res.data.data.results.length === 0) {
          this.finished = true;
        } else {
          this.pre_timestamp = res.data.data.pre_timestamp;
        }
      } catch (e) {
        this.loading = false;
        this.error = true;
      }
    },
    // 下拉刷新
    async onRefresh() {
      const res = await getArticle({
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 1,
      });
      this.list = [...res.data.data.results, ...this.list];
      this.refreshLoading = false;
      this.successText = `跟新了${res.data.data.results.length}条数据`;
    },
  },
};
</script>

<style scoped lang="less">
.article-list {
  height: 79vh;
  overflow: auto;
}
</style>
