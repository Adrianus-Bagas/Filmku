import { axiosApi } from "@/utils/axios";

export const GetUser = async () => {
  const result = await axiosApi({
    method: "get",
    url: `/user/profile`,
  });
  return result.data;
};
