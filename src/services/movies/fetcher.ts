import { axiosMovie } from "@/utils/axios";

export const GetMoviesTrendingByDay = async () => {
  const res = await axiosMovie({
    method: "get",
    url: "/trending/movie/day",
  });

  return res.data;
};

export const GetMoviesUpcoming = async () => {
  const res = await axiosMovie({
    method: "get",
    url: "/movie/upcoming",
  });

  return res.data;
};
