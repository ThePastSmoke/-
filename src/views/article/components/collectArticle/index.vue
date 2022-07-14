<template>
  <van-button :loading="loading" class="btn" @click="onCollect">
    <template #icon>
      <van-icon
        :color="isCollected ? 'red' : ''"
        :name="isCollected ? 'star' : 'star-o'"
      ></van-icon>
    </template>
  </van-button>
</template>

<script>
import { addCollect, deleteCollect } from "@/api";
export default {
  name: "collectArticle",
  data() {
    return {
      loading: false,
    };
  },
  model: {
    prop: "isCollected",
    event: "changeIsCollected",
  },
  props: {
    isCollected: {
      type: Boolean,
    },
    art_id: [String, Number],
  },
  methods: {
    async onCollect() {
      this.loading = true;
      try {
        if (this.isCollected) {
          // 取消收藏
          await deleteCollect(this.art_id);
        } else {
          await addCollect(this.art_id);
        }
        this.$emit("changeIsCollected", !this.isCollected);
        this.$toast(this.isCollected ? "取消关注" : "关注成功");
        this.loading = false;
      } catch (error) {
        this.$toast("操作失败，请重试");
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped lang="less">
.btn {
  border: none;
}
</style>
