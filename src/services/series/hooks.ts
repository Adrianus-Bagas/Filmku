import { useMutation, useQuery } from "@tanstack/react-query";

import {
  GetSeriesDetailPage,
  GetSeriesPage,
  GetSeriesSchedule,
} from "./fetcher";

import { RequestParamSeriesSchedule, SeriesListInterface } from "@/interfaces";

export const useGetSeries = () => {
  const { isLoading, isFetching, data } = useQuery<{
    nowPlaying: SeriesListInterface[];
    popular: SeriesListInterface[];
    topRated: SeriesListInterface[];
  }>({
    queryKey: ["getSeriesPage"],
    queryFn: () => GetSeriesPage(),
    refetchOnWindowFocus: false,
  });

  return {
    isFetching,
    isLoading,
    data: data || {
      nowPlaying: [],
      popular: [],
      topRated: [],
    },
  };
};

export const useGetSeriesDetailPage = () => {
  const { mutate, data, isIdle, isPending } = useMutation({
    mutationFn: ({
      series_id,
      user_token,
    }: {
      series_id: string;
      user_token: string;
    }) => GetSeriesDetailPage({ series_id, user_token }),
  });

  return { mutate, data, isIdle, isPending };
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
