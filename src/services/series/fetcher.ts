import { axiosMovie } from "@/utils/axios";

export const GetSeriesTrendingByDay = async () => {
  const res = await axiosMovie({
    method: "get",
    url: "/trending/tv/day",
  });

  return res.data;
};

export const GetSeriesUpcoming = async () => {
  const res = await axiosMovie({
    method: "get",
    url: "/tv/on_the_air",
  });

  return res.data;
};
