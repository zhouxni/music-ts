import request from "@Config/request";
export const cellphone = (params: { phone: string; password: string }) => {
  return request({
    url: "/login/cellphone",
    params,
  });
};

export const emaillogin = (params: { email: string; password: string }) => {
  return request({
    url: "/login",
    params,
  });
};
export const captchaSent = (params: { phone: string }) => {
  return request({
    url: "/captcha/sent",
    params,
  });
};
