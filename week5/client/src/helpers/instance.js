import axios from "axios";
import jwt_decode from "jwt-decode";
import * as authApi from "../api/authApi";

const instance = axios.create({
  baseURL: "http://localhost:8000/",
  timeout: 300000,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  async (config) => {
    const userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
    if (userInfo) {
      const decodedToken = jwt_decode(userInfo.token);
      if (Date.now() > decodedToken.exp * 1000) {
        const { data } = await authApi.refreshToken();
        localStorage.setItem(
          "userInfo",
          JSON.stringify({
            token: data.accessToken,
            user: data.user,
            refreshToken: data.refreshToken,
          })
        );
        config.headers["authorization"] = "Bearer " + data.accessToken;
      }
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default instance;
