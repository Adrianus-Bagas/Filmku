import defautlAxios, { AxiosRequestConfig } from "axios";

import {
  ACCESS_TOKEN,
  API_BASE_URL,
  MOVIE_BASE_URL,
} from "@/services/api-config";
import { getCookie } from "cookies-next";

const configApi: AxiosRequestConfig = {
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

const configMovie: AxiosRequestConfig = {
  baseURL: MOVIE_BASE_URL,
  timeout: 30000,
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
};

const axiosApi = defautlAxios.create(configApi);
const axiosMovie = defautlAxios.create(configMovie);

axiosApi.interceptors.request.use((req) => {
  if (typeof window !== "undefined") {
    const getAccessToken = getCookie("access_token");
    req.headers["Authorization"] = "Bearer " + getAccessToken;
  }
  return req;
});

export { axiosApi, axiosMovie };
