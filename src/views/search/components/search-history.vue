<template>
  <div>
    <van-cell title="搜索记录">
      <template #default>
        <template v-if="isDeleteHisroty">
          <van-tag class="btn" type="danger" @click="deleteAllHisroty"
            >全部删除</van-tag
          >
          <van-tag class="btn" type="success" @click="isDeleteHisroty = false"
            >完成</van-tag
          >
        </template>
        <van-icon
          name="delete"
          v-else
          @click="isDeleteHisroty = true"
        ></van-icon>
      </template>
    </van-cell>

    <van-cell
      @click="clickHisrotyItem(item, index)"
      :title="item"
      v-for="(item, index) in searchHistory"
      :key="index"
    >
      <template #default>
        <van-icon name="clear" v-if="isDeleteHisroty"></van-icon>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "SearchHistory",
  data() {
    return {
      isDeleteHisroty: false,
    };
  },
  props: {
    searchHistory: Array,
  },
  methods: {
    // 删除全部 自定义事件通知父组件删除
    deleteAllHisroty() {
      this.$emit("deleteAll");
    },
    clickHisrotyItem(item, index) {
      if (this.isDeleteHisroty) {
        this.searchHistory.splice(index, 1);
      } else {
        this.$emit("onSearch", item);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.btn {
  margin-right: 5px;
}
</style>
