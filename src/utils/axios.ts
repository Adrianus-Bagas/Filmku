import defautlAxios, { AxiosRequestConfig } from "axios";

import { ACCESS_TOKEN, API_BASE_URL } from "@/services/api-config";

const config: AxiosRequestConfig = {
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
};

const axios = defautlAxios.create(config);

export { axios };
