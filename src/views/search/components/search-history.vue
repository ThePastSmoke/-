<template>
  <div>
    <van-cell title="搜索记录">
      <template #default>
        <van-tag class="btn" type="danger">标签</van-tag>
        <van-tag class="btn" type="success">标签</van-tag>
        <van-icon name="delete"></van-icon>
      </template>
    </van-cell>

    <van-cell :title="item" v-for="(item, index) in searchHistory" :key="index">
      <template #default>
        <van-icon name="clear"></van-icon>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "SearchHistory",
  props: {
    searchHistory: Array,
  },
};
</script>

<style lang="less" scoped>
.btn {
  margin-right: 5px;
}
</style>
