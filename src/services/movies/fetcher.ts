import {
  RequestParamMovieSchedule,
  ResponseMovieDetailInterface,
  ResponseMovieVideosInterface,
} from "@/interfaces";
import { axiosApiMovie, axiosMovie } from "@/utils";

export const GetMoviesPage = async () => {
  const result = await axiosApiMovie({
    method: "get",
    url: "/movies",
  });

  return result.data;
};

export const GetMovieDetailPage = async ({
  movie_id,
  user_token,
}: {
  movie_id: string;
  user_token: string;
}): Promise<ResponseMovieDetailInterface> => {
  const result = await axiosApiMovie({
    method: "post",
    url: `/movies/${movie_id}`,
    data: {
      user_token,
    },
  });

  return result.data;
};

export const GetMoviesVideosPage = async ({
  movie_id,
  user_token,
}: {
  movie_id: string;
  user_token: string;
}): Promise<ResponseMovieVideosInterface> => {
  const res = await axiosApiMovie({
    method: "post",
    url: `/movies/${movie_id}/videos`,
    data: {
      user_token,
    },
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
