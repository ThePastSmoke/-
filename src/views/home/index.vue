<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- /导航栏 -->
    <!-- tab导航栏 -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <van-tab v-for="item in userChannel" :key="item.id" :title="item.name">
        <articleList :channel="item"></articleList>
      </van-tab>
      <template #nav-right>
        <div class="placeholder"></div>
        <div class="hamburger-btn">
          <i class="toutiao toutiao-gengduo" @click="isShow = true"></i>
        </div>
      </template>
    </van-tabs>
    <!-- tab导航栏 -->

    <!-- 汉堡按钮弹层 -->
    <van-popup
      style="height: 90%"
      v-model="isShow"
      closeable
      close-icon-position="top-left"
      position="bottom"
    >
      <channel_edit
        @update_active="update_active"
        :active="active"
        :userChannel="userChannel"
      ></channel_edit>
      <!-- <van-cell style="text-align: center" title="编辑频道"></van-cell> -->
    </van-popup>
    <!-- 汉堡按钮弹层 -->
  </div>
</template>

<script>
import articleList from "@/views/home/components/article-list.vue";
import channel_edit from "@/views/home/components/channel-edit.vue";
import { getUserChannel } from "@/api";
export default {
  name: "HomePage",
  components: { articleList, channel_edit },
  props: {},
  data() {
    return {
      active: 0, // 控制page栏目谁高亮
      userChannel: [], // tab栏数据
      isShow: false, // 汉堡按钮弹框
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getUserChannel();
  },
  mounted() {},
  methods: {
    // 自定义事件让子组件通知我修改active值
    update_active(index, type) {
      this.active = index;
      this.isShow = type;
    },
    // 调用获取频道列表
    async getUserChannel() {
      const res = await getUserChannel();
      this.userChannel = res.data.data.channels;
    },
  },
};
</script>

<style scoped lang="less">
// 头部搜索栏样式
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
  max-height: 100vh;
  overflow: auto;
  /deep/.van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
      color: #fff;
    }
  }
}
// tab栏css
/deep/ .channel-tabs {
  .van-tabs__wrap {
    position: fixed;
    top: 92px;
    z-index: 1;
    left: 0;
    right: 0;
    height: 82px;
  }
  .van-tab {
    border-right: 1px solid #edeff3;
    min-width: 200px;
    height: 80px;
    .van-tab__text {
      font-size: 27px;
      color: #777777;
    }
  }

  .van-tab--active .van-tab__text {
    color: #333 !important;
  }
  .van-tabs__line {
    width: 31px !important;
    height: 6px;
    background: rgba(50, 150, 250, 1);
    border-radius: 3px;
    bottom: 8px;
  }
  .van-tabs__nav {
    padding: 0;
  }
  .placeholder {
    flex-shrink: 0;
    width: 66px;
    height: 82px;
  }

  .hamburger-btn {
    position: fixed;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 66px;
    height: 82px;
    background-color: #fff;
    opacity: 0.902;
    i.toutiao {
      font-size: 33px;
    }
    &:before {
      content: "";
      position: absolute;
      left: 0;
      width: 1px;
      height: 100%;
      background-image: url(~@/assets/gradient-gray-line.png);
      background-size: contain;
    }
  }
}
</style>
