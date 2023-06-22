import axios from "axios";
import instance from "../helpers/instance";

export const register = async (email, password) =>
  await instance.post("/api/auth/register", {
    email,
    password,
  });

export const login = async (email, password) =>
  await instance.post("/api/auth/login", {
    email,
    password,
  });

export const logout = async () => await axios.get("/api/auth/logout");

export const refreshToken = async () =>
  await axios.post("http://localhost:8000/api/auth/refresh", {
    refreshToken: JSON.parse(window.localStorage.getItem("userInfo"))
      .refreshToken,
  });
