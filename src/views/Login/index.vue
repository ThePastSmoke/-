<template>
  <div class="login-container">
    <!-- 标题 -->
    <van-nav-bar title="登录">
      <template #left>
        <van-icon name="cross" @click="$router.back()" />
        <!-- <TouTiaoIcon icon="guanbi1"></TouTiaoIcon>  .native-->
      </template>
    </van-nav-bar>
    <!-- 表单区域 -->
    <div>
      <van-form @submit="onSubmit" ref="form">
        <van-field
          v-model="user.mobile"
          name="mobile"
          placeholder="手机号"
          :rules="rules.mobile"
        >
          <template #left-icon>
            <TouTiaoIcon icon="shouji"></TouTiaoIcon>
          </template>
        </van-field>
        <van-field
          type="number"
          maxlength="6"
          v-model="user.code"
          name="code"
          placeholder="验证码"
          :rules="rules.code"
        >
          <!-- 设置输入框自定义icon -->
          <template #left-icon>
            <TouTiaoIcon icon="yanzhengma"></TouTiaoIcon>
          </template>
          <template #button>
            <van-count-down
              @finish="isShowCountDown = false"
              v-if="isShowCountDown"
              format="ss s"
              :time="5000"
            />
            <van-button
              v-else
              native-type="button"
              size="mini"
              type="primary"
              class="send-sms-btn"
              @click="sedSever"
              :loading="isDisabled"
              >发送验证码</van-button
            >
          </template>
        </van-field>
        <div style="margin: 16px">
          <van-button block type="info" native-type="submit">提交</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { login, getSeverCode } from "@/api";
import { Toast } from "vant";
export default {
  data() {
    return {
      isShowCountDown: false, //倒计时是否显示字段
      isDisabled: false, // 加载中字段
      // 用户名验证码
      user: {
        mobile: "13911111112",
        code: "246810",
      },
      // 表单校验
      rules: {
        mobile: [
          {
            required: true,
            message: "手机号不能为空",
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "手机号格式不对",
          },
        ],
        code: [
          {
            required: true,
            message: "验证码不能为空",
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码只能6位",
          },
        ],
      },
    };
  },
  methods: {
    async onSubmit() {
      // async await 捕获错误用trycatch
      try {
        const res = await login(this.user);
        // 把token存入vuex
        this.$store.commit("setUser", res.data.data);
        Toast.success("登陆成功");
        this.$router.push("/"); // 登录成功跳转到主页
      } catch (e) {
        // console.log(e);
        // 可选链运算符进行数据判断
        Toast.fail(e?.response?.data?.message || "服务器错误");
      }
    },
    // 发送验证码
    async sedSever() {
      try {
        // 获取form表单dom调用validate方法进行表单校验（设置单个或多个规则name）
        await this.$refs.form.validate("mobile");
      } catch (error) {
        // 捕获到错误return
        return;
      }

      // 校验通过
      try {
        this.isDisabled = true;
        // 获取发送验证码的ajax
        await getSeverCode(this.user.mobile);
        // 让计数器显示buttom隐藏
        this.isShowCountDown = true;
        Toast.success("验证码发送成功"); //提示
      } catch (error) {
        // 出现错误后提示用户
        Toast.fail(error.response?.data?.message || "出错了");
        this.isShowCountDown = false;
      } finally {
        this.isDisabled = false;
      }
    },
  },
};
</script>

<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 152px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .van-icon {
    color: #fff;
  }
}
</style>
