import request from "@/utils/request";

export const getArticle = (params) => {
  return request({
    method: "GET",
    url: "/v1_0/articles",
    params,
  });
};
