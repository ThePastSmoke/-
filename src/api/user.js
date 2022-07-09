import request from "@/utils/request";
// 引入vuex组件
// import store from "@/store/index";
// 用户登录
export const login = (data) => {
  return request({
    method: "POST",
    url: "/v1_0/authorizations",
    data,
  });
};
// 获取发送验证码 参数传入手机号
export const getSeverCode = (mobile) => {
  return request({
    method: "GET",
    url: `/v1_0/sms/codes/${mobile}`,
  });
};

// 请求用户个人信息 请求头带入token
export const getUserInfo = () => {
  return request({
    method: "GET",
    url: "/v1_0/user",
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`,
    // },
  });
};
