import request from "@Config/request";

export const Searchhot = () => {
  return request({
    url: "/search/hot/detail",
  });
};

export const Searchsuggest = (params: { keywords?: string; type?: string }) => {
  return request({
    url: "/search/suggest",
    params,
  });
};

export const SearchResult = (params: {
  keywords: string;
  type?: number;
  offset?: number;
}) => {
  return request({
    url: "/cloudsearch",
    params,
  });
};
