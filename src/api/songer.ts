import request from "@/config/request";

export const getSonger = (params: {
  type?: number;
  area?: number;
  initial?: string;
}) => {
  return request({
    url: "/artist/list",
    params,
  });
};

export const getSongerInfo = (params: { id: string | null }) => {
  return request({
    url: "/artists",
    params,
  });
};

export const getArtist = (params: { id: string | null }) => {
  return request({
    url: "/artist/detail",
    params,
  });
};

export const getDesc = (params: { id: string | null }) => {
  return request({
    url: "/artist/desc",
    params,
  });
};

export const getMv = (params: { id: string | null }) => {
  return request({
    url: "/mv/url",
    params,
  });
};

export const getComment = (params: {
  id: string | null;
  type: number;
  limit?: number;
  offset?: number;
  before?: number;
}) => {
  return request({
    url: "/comment/hot",
    params,
  });
};

export const getNewComment = (params: {
  id: string | null;
  type: number;
  pageNo?: number;
  pageSize?: number;
  sortType?: number;
  cursor?: number;
}) => {
  return request({
    url: "/comment/new",
    params,
  });
};

export const getFloorComment = (params: {
  parentCommentId: number;
  id: string | number | null;
  type: number;
  limit?: number;
  time?: number;
}) => {
  return request({
    url: "/comment/floor",
    params,
  });
};
