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

export const GetMoviesNowPlaying = async () => {
  const res = await axiosMovie({
    method: "get",
    url: "/movie/now_playing",
  });

  return res.data;
};

export const GetMoviesPopular = async () => {
  const res = await axiosMovie({
    method: "get",
    url: "/movie/popular",
  });

  return res.data;
};

export const GetMoviesTopRated = async () => {
  const res = await axiosMovie({
    method: "get",
    url: "/movie/top_rated",
  });

  return res.data;
};
