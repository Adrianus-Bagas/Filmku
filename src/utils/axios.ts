import defautlAxios, { AxiosRequestConfig } from "axios";
import { getCookie } from "cookies-next";

import {
  ACCESS_TOKEN,
  API_BASE_URL,
  MOVIE_BASE_URL,
} from "@/services/api-config";

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

const configApiMovie: AxiosRequestConfig = {
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
};

const axiosApi = defautlAxios.create(configApi);
const axiosMovie = defautlAxios.create(configMovie);
const axiosApiMovie = defautlAxios.create(configApiMovie);

axiosApi.interceptors.request.use((req) => {
  if (typeof window !== "undefined") {
    const getAccessToken = getCookie("access_token");

    req.headers["Authorization"] = "Bearer " + getAccessToken;
  }

  return req;
});

export { axiosApi, axiosMovie, axiosApiMovie };
