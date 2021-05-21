import request from "@Config/request";

export const DjCatelist = () => {
  return request({
    url: "/dj/catelist",
  });
};

export const DjList = (params: { type: number; offset?: number }) => {
  return request({
    url: "/dj/recommend/type",
    params,
  });
};
