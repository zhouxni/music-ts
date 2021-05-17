import request from "@/config/request";
// import Cookies from "js-cookie";
// import { Decrypt } from "@Config/secret";
export const getSonger = (params: {
  type?: number;
  area?: number;
  initial?: string;
  offset: number;
}) => {
  return request({
    url: "/artist/list",
    params,
  });
};

export const getSongs = (params: {
  id: string | null;
  offset?: number;
  limit?: number;
}) => {
  return request({
    url: "/artist/songs",
    params,
  });
};

export const getSongerInfo = (params: { id: string | null }) => {
  return request({
    url: "/artists",
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
  cursor?: number | string;
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

export const getSongUrl = (params: { id: string | null }) => {
  return request({ url: "/song/url", params });
};

export const getMusicComment = (params: {
  id: string | null;
  offset?: number;
  before?: number;
}) => {
  return request({
    url: "/comment/music",
    params,
  });
};

export const getMusicDetail = (params: { ids: string | null }) => {
  return request({
    url: "/song/detail",
    params,
  });
};

export const getSongAlbum = (params: {
  id: string | null;
  limit?: number;
  offset?: number;
}) => {
  return request({
    url: "/artist/album",
    params,
  });
};

export const getMvComment = (params: {
  id: string | null;
  offset?: number;
}) => {
  return request({
    url: "/comment/mv",
    params,
  });
};

export const getAlbumDetail = (params: { id: string | null }) => {
  return request({
    url: "/album",
    params,
  });
};

export const getAlbumDynamic = (params: { id: string | null }) => {
  return request({
    url: "/album/detail/dynamic",
    params,
  });
};

export const checkMusic = (params: { id: number }) => {
  return request({
    url: "check/music",
    params,
  });
};

export const getMvList = (params: { id: string | null; offset?: number }) => {
  return request({
    url: "/artist/mv",
    params,
  });
};

export const getArtistDetail = (params: { id: string | null }) => {
  return request({
    url: "/artist/detail",
    params,
  });
};

export const getSimiArtist = (params: { id: string | null }) => {
  return request({
    url: "/simi/artist",
    params,
  });
};

export const getPlayList = (params: { id: string | null }) => {
  return request({
    url: "/playlist/detail",
    params,
  });
};

export const getPlayListComment = (params: {
  id: string | null;
  offset?: number;
}) => {
  return request({
    url: "/comment/playlist",
    params,
  });
};

export const getHotComment = (params: {
  id: string | null;
  offset?: number;
  type: string | null;
}) => {
  return request({
    url: "/comment/hot",
    params,
  });
};

export const getPlayListCategory = () => {
  return request({
    url: "/playlist/catlist",
  });
};

export const getPlayListHot = () => {
  return request({
    url: "/playlist/hot",
  });
};

export const getPlayListTop = (
  params: { order?: string; offset?: number; cat?: string } = {}
) => {
  return request({
    url: "/top/playlist",
    params,
  });
};

export const getHighqualityTag = () => {
  return request({
    url: "/playlist/highquality/tags",
  });
};

export const getHighqualityList = (params: { cat?: string; before?: number }) => {
  return request({
    url: "/top/playlist/highquality",
    params,
  });
};
