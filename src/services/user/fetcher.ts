import { axiosApi } from "@/utils";

export const GetUserData = async () => {
  const result = await axiosApi({
    method: "get",
    url: "/user",
  });

  return result.data;
};
