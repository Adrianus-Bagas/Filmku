import { axiosApiMovie } from "@/utils";

export const GetHome = async (user_token: string) => {
  const result = await axiosApiMovie({
    method: "post",
    url: "/home",
    data: {
      user_token,
    },
  });

  return result.data;
};

export const GetNotification = async () => {
  const result = await axiosApiMovie({
    method: "get",
    url: "/home/notification",
  });

  return result.data;
};

export const PostSearch = async (query: string) => {
  const result = await axiosApiMovie({
    method: "post",
    url: "/home/search",
    data: {
      query,
    },
  });

  return result.data;
};
