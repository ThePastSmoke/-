<template>
  <div class="layout-container">
    <!-- 二级路由 -->
    <router-view></router-view>
    <!-- tab栏 -->
    <van-tabbar route class="layout-tabbar" v-model="active">
      <van-tabbar-item to="/home">
        <template #icon>
          <TouTiaoIcon icon="shouye"></TouTiaoIcon>
        </template>
        首页
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <template #icon>
          <TouTiaoIcon icon="wenda"></TouTiaoIcon>
        </template>
        问答
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <template #icon>
          <TouTiaoIcon icon="shipin"></TouTiaoIcon>
        </template>
        视频
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <template #icon>
          <TouTiaoIcon icon="wode"></TouTiaoIcon>
        </template>
        我的
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
    };
  },
};
</script>

<style scoped lang="less">
.layout-container {
  .layout-tabbar {
    i.toutiao {
      font-size: 40px;
    }
    span.text {
      font-size: 20px;
    }
  }
}
</style>
