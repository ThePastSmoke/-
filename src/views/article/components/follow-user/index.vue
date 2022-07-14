<template>
  <van-button
    v-if="this.value"
    @click="follow"
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    :loading="isFollowLoading"
    >关注</van-button
  >
  <van-button
    v-else
    @click="follow"
    class="follow-btn"
    round
    size="small"
    :loading="isFollowLoading"
    >已关注</van-button
  >
</template>

<script>
import { addFollow, deleteFollow } from "@/api";
// v-model 给子组件传值
// 第一步给子组件传一个value属性的值
// 第二部绑定一个input自定义事件，可以让子组件直接触发修改父组件的值
export default {
  name: "FollowUser",
  data() {
    return {
      isFollowLoading: false,
    };
  },
  props: {
    // is_followed: {
    //   type: Boolean,
    //   required: true,
    // },
    user_id: {
      type: [Number, String, Object],
      required: true,
    },
    value: [Boolean],
  },
  methods: {
    // 是否关注
    async follow() {
      this.isFollowLoading = true;
      try {
        if (this.value) {
          // 已关注
          await deleteFollow(this.user_id);
        } else {
          // 未关注
          await addFollow(this.user_id);
        }
        this.$emit("input", !this.value);
        // this.is_followed = !this.is_followed;
        this.$notify({
          type: "success",
          message: this.value ? "关注成功" : "取消成功",
        });
        this.isFollowLoading = false;
      } catch (e) {
        console.log(e);
        this.isFollowLoading = false;
      }
    },
  },
};
</script>

<style scoped lang="less">
.van-button {
  position: absolute;
  top: 170px;
  right: 20px;
}
</style>
