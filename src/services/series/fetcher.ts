import {
  RequestParamSeriesSchedule,
  ResponseSeriesDetailInterface,
  ResponseSeriesEpisodeInterface,
  ResponseSeriesSeasonInterface,
  ResponseSeriesVideosInterface,
} from "@/interfaces";
import { axiosApiMovie, axiosMovie } from "@/utils";

export const GetSeriesPage = async () => {
  const result = await axiosApiMovie({
    method: "get",
    url: "/series",
  });

  return result.data;
};

export const GetSeriesDetailPage = async ({
  series_id,
  user_token,
}: {
  series_id: string;
  user_token: string;
}): Promise<ResponseSeriesDetailInterface> => {
  const result = await axiosApiMovie({
    method: "post",
    url: `/series/${series_id}`,
    data: {
      user_token,
    },
  });

  return result.data;
};

export const GetSeriesSeasonPage = async ({
  series_id,
  season_number,
  user_token,
}: {
  series_id: string;
  season_number: string;
  user_token: string;
}): Promise<ResponseSeriesSeasonInterface> => {
  const result = await axiosApiMovie({
    method: "post",
    url: `/series/${series_id}/season/${season_number}`,
    data: {
      user_token,
    },
  });

  return result.data;
};

export const GetSeriesEpisodePage = async ({
  series_id,
  season_number,
  episode_number,
  user_token,
}: {
  series_id: string;
  season_number: string;
  episode_number: string;
  user_token: string;
}): Promise<ResponseSeriesEpisodeInterface> => {
  const result = await axiosApiMovie({
    method: "post",
    url: `/series/${series_id}/season/${season_number}/episode/${episode_number}`,
    data: {
      user_token,
    },
  });

  return result.data;
};

export const GetSeriesEpisodeVideoPage = async ({
  series_id,
  season_number,
  episode_number,
  user_token,
}: {
  series_id: string;
  season_number: string;
  episode_number: string;
  user_token: string;
}): Promise<ResponseSeriesVideosInterface> => {
  const result = await axiosApiMovie({
    method: "post",
    url: `/series/${series_id}/season/${season_number}/episode/${episode_number}/videos`,
    data: {
      user_token,
    },
  });

  return result.data;
};

export const GetSeriesVideosPage = async ({
  series_id,
  user_token,
}: {
  series_id: string;
  user_token: string;
}): Promise<ResponseSeriesVideosInterface> => {
  const res = await axiosApiMovie({
    method: "post",
    url: `/series/${series_id}/videos`,
    data: {
      user_token,
    },
  });

  return res.data;
};

export const GetSeriesSchedule = async (params: RequestParamSeriesSchedule) => {
  const res = await axiosMovie({
    method: "get",
    url: "discover/tv",
    params: {
      include_adult: false,
      include_null_first_air_dates: false,
      language: "en-US",
      page: 1,
      "first_air_date.gte": params.first_on_air_date_gte,
      "first_air_date.lte": params.first_on_air_date_lte,
      sort_by: "popularity.desc",
      with_original_language: params.original_language,
    },
  });

  return res.data;
};
