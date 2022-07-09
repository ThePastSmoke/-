import request from "@/utils/request";
/*
 ** 调用获取频道列表
 */

export const getUserChannel = () => {
  return request({
    method: "GET",
    url: "/v1_0/user/channels",
  });
};

/**
 * 获取所有频道
 */
export const getAllChannels = () => {
  return request({
    method: "GET",
    url: "/v1_0/channels",
  });
};
