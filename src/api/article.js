import request from "@/utils/request";

export const getArticle = (params) => {
  return request({
    method: "GET",
    url: "/v1_0/articles",
    params,
  });
};

/**
 * 获取频道的文章列表
 */
export const getArticleById = (articleId) => {
  return request({
    method: "GET",
    url: "/v1_0/articles/" + articleId,
  });
};

/**
 * 添加关注
 */
export const addFollow = (userId) => {
  return request({
    method: "POST",
    url: "/v1_0/user/followings",
    data: {
      target: userId,
    },
  });
};

/**
 * 取消关注
 */
export const deleteFollow = (userId) => {
  return request({
    method: "DELETE",
    url: `/v1_0/user/followings/${userId}`,
  });
};
