import { axiosApiMovie } from "@/utils";

export const GetCastsPage = async () => {
  const result = await axiosApiMovie({
    method: "get",
    url: "/people",
  });

  return result.data;
};
