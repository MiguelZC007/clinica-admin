import Axios from "axios";
import { authHeader } from "../helpers/auth_header";

let url = localStorage.getItem("url")
  ? localStorage.getItem("url")
  : process.env.REACT_APP_URL;

const axios = Axios.create({
  baseURL: url,
  withCredentials: false,
  credentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axios.interceptors.request.use(
  (config) => {
    if (authHeader()) {
      config.headers["Authorization"] = authHeader();
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    if (error.response.data.message === "Unauthorized") {
      localStorage.clear();
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);

export default axios;
