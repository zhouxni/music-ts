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

export const Djprogram = (params: { rid: string | null; offset?: number }) => {
  return request({
    url: "/dj/program",
    params,
  });
};

export const Djdetail = (params: { rid: string | null }) => {
  return request({
    url: "/dj/detail",
    params,
  });
};

export const Djprogramdetail = (params: { id: number }) => {
  return request({
    url: "/dj/program/detail",
    params,
  });
};
