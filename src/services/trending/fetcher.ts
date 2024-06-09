import { axiosMovie } from "@/utils/axios";

export const GetMoviesTrendingByDay = async () => {
  const res = await axiosMovie({
    method: "get",
    url: "/trending/movie/day",
  });

  return res.data;
};

export const GetSeriesTrendingByDay = async () => {
  const res = await axiosMovie({
    method: "get",
    url: "/trending/tv/day",
  });

  return res.data;
};
