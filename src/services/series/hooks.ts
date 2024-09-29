import { useQuery } from "@tanstack/react-query";

import {
  GetSeriesSchedule,
  GetSeriesTrendingByDay,
  GetSeriesUpcoming,
} from "./fetcher";

import { RequestParamSeriesSchedule, SeriesListInterface } from "@/interfaces";

export const useGetSeriesTrendingByDay = () => {
  const { isLoading, isFetching, data } = useQuery({
    queryKey: ["getSeriesTrendingByDay"],
    queryFn: () => GetSeriesTrendingByDay(),
    refetchOnWindowFocus: false,
  });

  return { isFetching, isLoading, data: data?.results ?? [] };
};

export const useGetSeriesUpcoming = () => {
  const { isLoading, isFetching, data } = useQuery({
    queryKey: ["getSeriesUpcoming"],
    queryFn: () => GetSeriesUpcoming(),
    refetchOnWindowFocus: false,
  });

  return { isFetching, isLoading, data: data?.results ?? [] };
};

export const useGetSeriesSchedule = (params: RequestParamSeriesSchedule) => {
  const { isLoading, isFetching, data, refetch } = useQuery<{
    page: number;
    results: SeriesListInterface[];
    total_pages: number;
    total_results: number;
  }>({
    queryKey: ["getSeriesSchedule", params],
    queryFn: () => GetSeriesSchedule(params),
    refetchOnWindowFocus: false,
  });

  return {
    isFetching,
    isLoading,
    data: data?.results || [],
    refetch,
  };
};
