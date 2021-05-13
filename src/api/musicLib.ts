import request from "@Config/request";

export const getBanner = (params = { type: 1 }) => {
  return request({
    url: "/banner",
    params,
  });
};

export const getRecommSongList = () => {
  return request({
    url: "/personalized?limit=9",
  });
};

export const getDjHot = () => {
  return request({
    url: "/dj/hot?limit=9",
  });
};

export const getMv = () => {
  return request({
    url: "/personalized/mv",
  });
};

export const getNewSong = () => {
  return request({
    url: "/personalized/newsong",
  });
};

export const getRecommRadio = () => {
  return request({
    url: "/program/recommend",
  });
};
