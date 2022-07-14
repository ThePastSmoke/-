<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="出错了,点击重试"
    >
      <CommentItem
        v-for="item in list"
        :key="item.com_id"
        :comment="item"
      ></CommentItem>
      <!-- <van-cell :title="item.content" v-for="item in list" :key="item.com_id" /> -->
    </van-list>
    <!-- 评论列表 -->
  </div>
</template>

<script>
import CommentItem from "@/views/article/components/comment-item.vue";
import { getComments } from "@/api";
export default {
  name: "ArticleComment",
  components: { CommentItem },
  props: {
    articleId: {
      type: [String, Number],
    },
  },
  data() {
    return {
      list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      offset: null,
      error: false,
    };
  },

  methods: {
    async onLoad() {
      try {
        const res = await getComments({
          type: "a", // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
          source: this.articleId, // 源id，文章id或评论id
          offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
          limit: 10, // 每页大小
        });
        // 请求回来的数据需要展开拼接到list
        this.list.push(...res.data.data.results);
        // 请求完数据后把loading手动设置false不在请求
        this.loading = false;
        // 判断是否是最后一个评论
        // 是的话手动把finished设置为true不再请求
        if (res.data.data.last_id === res.data.data.end_id) {
          this.finished = true;
        } else {
          // 不是最后一个数据的话把offset改成上一条数据的最后一条id再请求下十条数据
          this.offset = res.data.data.last_id;
        }
      } catch (error) {
        // 捕获到错误后把error改为true提示用户重新点击 并把loading改成false不让请求一直发送
        console.log(error);
        this.error = true;
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped lang="less">
.van-list {
  margin-bottom: 45px;
}
</style>
