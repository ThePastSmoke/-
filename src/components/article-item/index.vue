<template>
  <div class="article-item">
    <!-- to跳转路由传递对应的文字列表id -->
    <van-cell :title="article.title" :to="`/article/${article.art_id}`">
      <!-- 一张图 -->
      <template #default v-if="article.cover.type === 1">
        <van-image class="Img" :src="article.cover.images[0]" />
      </template>
      <!-- 三张图 -->
      <template #label>
        <div class="img_contaniner" v-if="article.cover.type === 3">
          <van-image
            class="Img_three"
            v-for="(item, index) in article.cover.images"
            :key="index"
            :src="item"
          />
        </div>
        <!-- 下方默认显示 -->
        <div class="label_container">
          <span> {{ article.aut_name }} </span
          ><span>{{ article.comm_count }} 评论</span
          ><span>{{ article.pubdate | relativeTime }}</span>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "ArticleItem",
  components: {},
  props: {
    article: {
      type: [Object],
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="less">
.article-item {
  .Img {
    width: 200px;
  }
  .img_contaniner {
    display: flex;
    justify-content: space-between;
  }
  .Img_three {
    width: 200px;
    height: 200px;
  }
  .label_container span {
    margin-right: 20px;
  }
}
</style>
