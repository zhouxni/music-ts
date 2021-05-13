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
