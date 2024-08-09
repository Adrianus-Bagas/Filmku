import { RequestParamSeriesSchedule } from "@/interfaces/series.interface";
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
