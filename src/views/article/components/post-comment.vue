<template>
  <div class="post-comment">
    <van-field
      class="post-field"
      v-model="inputComment"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="优质评论将会被优先展示"
      show-word-limit
    />
    <van-button class="post-btn" size="small" @click="onAddComment"
      >发布</van-button
    >
  </div>
</template>

<script>
import { addComment } from "@/api";
export default {
  name: "PostComment",
  components: {},
  props: {
    target: {
      type: [String, Number],
      require: true,
    },
  },
  data() {
    return {
      inputComment: "",
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onAddComment() {
      this.$toast.loading({
        duration: 0, // 表示toast不会消失
        forbidClick: true, //禁用被禁点击
      });
      try {
        const res = await addComment({
          // 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
          target: this.target,
          // 评论内容
          content: this.inputComment,
          // 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
          art_id: null,
        });
        this.$toast.success("发表评论成功");
        console.log(res);
      } catch (error) {
        this.$toast.success("发表评论失败");
        console.log(error);
      }
    },
  },
};
</script>

<style scoped lang="less">
.post-comment {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
