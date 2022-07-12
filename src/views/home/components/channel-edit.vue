<template>
  <div class="channel-edit">
    <van-cell style="text-align: center" title="编辑频道"></van-cell>
    <!-- 我的频道标题 -->
    <van-cell title="我的频道">
      <template #default>
        <van-button
          @click="isEdit = !isEdit"
          class="edit_btn"
          plain
          round
          size="mini"
          type="danger"
        >
          {{ isEdit ? "完成" : "编辑" }}</van-button
        >
      </template>
    </van-cell>
    <!-- 宫格 我的频道 -->
    <van-grid class="my_channels" :gutter="10">
      <van-grid-item
        class="chnnel_item"
        v-for="(item, index) in userChannel"
        :key="item.id"
        @click="onMyChannelClick(item, index)"
      >
        <template #icon v-if="isEdit && index !== 0">
          <van-icon name="clear"></van-icon>
        </template>
        <template #text>
          <span class="text" :class="{ active: active === index }">
            {{ item.name }}
          </span>
        </template>
      </van-grid-item>
    </van-grid>
    <!-- 推荐频道 -->
    <van-cell title="推荐频道"> </van-cell>
    <!-- 宫格  推荐频道-->
    <van-grid class="recommend_channel" direction="horizontal" :gutter="10">
      <van-grid-item
        icon="plus"
        class="chnnel_item"
        v-for="item in recommendChannels"
        :key="item.id"
        @click="addChannel(item)"
      >
        <template #text>
          <span class="text"> {{ item.name }} </span>
        </template>
      </van-grid-item>
    </van-grid>
    <!-- 推荐频道 -->
  </div>
</template>

<script>
import { Notify } from "vant";
import { getAllChannels, addUserChannel, deleteUserChannel } from "@/api";
import differenceBy from "lodash/differenceBy";
import { mapState } from "vuex";
import { setLocat } from "@/utils/storage";
import { TOUTIAO_CHANNELS } from "@/constants.js";

export default {
  name: "ChannelEdit",
  components: {},
  props: {
    userChannel: {
      type: Array,
      required: true,
    },
    active: {
      type: Number,
    },
  },
  data() {
    return {
      allChannels: [],
      isEdit: false,
    };
  },
  computed: {
    // 计算全部频道-我的频道=推荐频道
    // recommendChannels() {
    //   return this.allChannels.filter((item) => {
    //     return !this.userChannel.some((i) => i.id === item.id);
    //   });
    // },
    recommendChannels() {
      return differenceBy(this.allChannels, this.userChannel, "id");
    },
    ...mapState(["user"]),
  },
  created() {
    this.getAllChannels();
  },
  methods: {
    async deleteChannel(item) {
      try {
        if (this.user) {
          // 已登录 在服务器端删除
          await deleteUserChannel(item.id);
          this.$toast("删除成功");
        } else {
          // 未登录 本地存储直接删
          setLocat(TOUTIAO_CHANNELS, this.userChannel);
        }
      } catch (error) {
        this.$toast("登陆失败");
      }
    },
    onMyChannelClick(item, index) {
      if (this.isEdit) {
        // 编辑状态
        if (index === 0) return Notify({ type: "danger", message: "不让删除" });
        // 执行删除操作
        if (index <= this.active) {
          this.$emit("update_active", this.active - 1, true);
        }
        // 删除了数组的某一项
        this.userChannel.splice(index, 1);
        // 调用删除用户频道接口
        this.deleteChannel(item);
      } else {
        // 执行跳转 未编辑状态
        this.$emit("update_active", index, false);
      }
    },
    async getAllChannels() {
      const res = await getAllChannels();
      this.allChannels = res.data.data.channels;
    },
    // 添加Channel
    async addChannel(item) {
      this.userChannel.push(item);
      // 频道持久化 判断是否登录，登录请求接口存到服务器，
      // 未登录把数据存储到本地存储
      if (this.user) {
        // 用户已登录
        try {
          // 添加用户频道
          await addUserChannel({
            id: item.id,
            seq: this.userChannel.length,
          });
          this.$toast("添加频道成功");
        } catch (e) {
          this.$toast("添加失败");
        }
      } else {
        setLocat(TOUTIAO_CHANNELS, this.userChannel);
      }
    },
  },
};
</script>

<style scoped lang="less">
.channel-edit {
  .edit_btn {
    width: 100px;
  }
  .chnnel_item .text {
    font-size: 20px;
    color: #222;
    margin-top: 0;
  }
  /deep/.chnnel_item .van-grid-item__content {
    background-color: #f4f5f6;
  }
  .recommend_channel {
    /deep/.van-icon-plus {
      color: #222;
      font-size: 20px;
      margin-right: 5px;
    }
  }
  .my_channels {
    /deep/.van-icon-clear {
      position: absolute;
      color: #cacaca;
      right: -10px;
      top: -10px;
      font-size: 20px;
    }
    /deep/.active {
      color: red !important;
    }
    /deep/.van-grid-item__icon-wrapper {
      position: unset;
    }
  }
}
</style>
