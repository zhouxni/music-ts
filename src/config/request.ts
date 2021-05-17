import axios from "axios";
import { Toast } from "antd-mobile";

const instance = axios.create({
  // baseURL:"/api",
  timeout: 30000,
});
instance.interceptors.request.use(
  (config) => {
    Toast.loading("请稍候...", 0, () => {}, true);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    Toast.hide();
    return response.data.code === 200 ? response.data : Promise.reject();
  },
  (error) => {
    Toast.hide();
    return Promise.reject(error);
  }
);

export default instance.request;
