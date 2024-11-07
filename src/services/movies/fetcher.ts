import { RequestParamMovieSchedule } from "@/interfaces";
import { axiosApiMovie, axiosMovie } from "@/utils";

export const GetMoviesPage = async () => {
  const result = await axiosApiMovie({
    method: "get",
    url: "/movies",
  });

  return result.data;
};

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

export const GetMoviesDetail = async (movie_id: string) => {
  const res = await axiosMovie({
    method: "get",
    url: `/movie/${movie_id}`,
  });

  return res.data;
};

export const GetMoviesVideos = async (movie_id: string) => {
  const res = await axiosMovie({
    method: "get",
    url: `/movie/${movie_id}/videos`,
  });

  return res.data;
};

export const GetMoviesSimilar = async (movie_id: string) => {
  const res = await axiosMovie({
    method: "get",
    url: `/movie/${movie_id}/similar`,
  });

  return res.data;
};

export const GetMoviesCredits = async (movie_id: string) => {
  const res = await axiosMovie({
    method: "get",
    url: `/movie/${movie_id}/credits`,
  });

  return res.data;
};

export const GetMoviesSchedule = async (params: RequestParamMovieSchedule) => {
  const res = await axiosMovie({
    method: "get",
    url: "discover/movie",
    params: {
      include_adult: false,
      include_video: false,
      language: "en-US",
      page: 1,
      "primary_release_date.gte": params.primary_release_date_gte,
      "primary_release_date.lte": params.primary_release_date_lte,
      sort_by: "popularity.desc",
      with_original_language: params.original_language,
    },
  });

  return res.data;
};
