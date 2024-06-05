import {
  clientId,
  clientSecret,
  redirectUri,
  tokenGoogleUrl,
  userInfoGoogleUrl,
} from "@/config";
import { axiosApi } from "@/utils/axios";
import axios from "axios";

export const getToken = async (code: string) => {
  const result = await axios({
    method: "post",
    url: tokenGoogleUrl,
    params: {
      code,
      grant_type: "authorization_code",
      redirect_uri: redirectUri,
      client_id: clientId,
      client_secret: clientSecret,
    },
  });
  return result;
};

export const getUserInfo = async () => {
  const result = await axios({
    method: "get",
    url: userInfoGoogleUrl,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
  return result;
};

export const GetUser = async (token: string) => {
  const result = await axiosApi({
    method: "post",
    url: "/auth/verify",
    data: {
      token,
    },
  });
  return result.data;
};
