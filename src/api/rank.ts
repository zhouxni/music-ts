import request from "@/config/request";

export const getRank = () => {
  return request({
    url: "/toplist",
  });
};

export const getRankDetail = () => {
  return request({
    url: "/toplist/detail",
  });
};
