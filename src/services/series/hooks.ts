import { useMutation, useQuery } from "@tanstack/react-query";

import {
  GetSeriesDetailPage,
  GetSeriesEpisodePage,
  GetSeriesEpisodeVideoPage,
  GetSeriesPage,
  GetSeriesSchedule,
  GetSeriesSeasonPage,
  GetSeriesVideosPage,
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

export const useGetSeriesVideosPage = () => {
  const { mutate, data, isIdle, isPending } = useMutation({
    mutationFn: ({
      series_id,
      user_token,
    }: {
      series_id: string;
      user_token: string;
    }) => GetSeriesVideosPage({ series_id, user_token }),
  });

  return {
    mutate,
    data: data || {
      similar: [],
      videos: [],
    },
    isIdle,
    isPending,
  };
};

export const useGetSeriesSeasonPage = () => {
  const { mutate, data, isIdle, isPending } = useMutation({
    mutationFn: ({
      series_id,
      season_number,
      user_token,
    }: {
      series_id: string;
      season_number: string;
      user_token: string;
    }) => GetSeriesSeasonPage({ series_id, season_number, user_token }),
  });

  return { mutate, data, isIdle, isPending };
};

export const useGetSeriesEpisodePage = () => {
  const { mutate, data, isIdle, isPending } = useMutation({
    mutationFn: ({
      series_id,
      season_number,
      episode_number,
      user_token,
    }: {
      series_id: string;
      season_number: string;
      episode_number: string;
      user_token: string;
    }) =>
      GetSeriesEpisodePage({
        series_id,
        season_number,
        episode_number,
        user_token,
      }),
  });

  return { mutate, data, isIdle, isPending };
};

export const useGetSeriesEpisodeVideoPage = () => {
  const { mutate, data, isIdle, isPending } = useMutation({
    mutationFn: ({
      series_id,
      season_number,
      episode_number,
      user_token,
    }: {
      series_id: string;
      season_number: string;
      episode_number: string;
      user_token: string;
    }) =>
      GetSeriesEpisodeVideoPage({
        series_id,
        season_number,
        episode_number,
        user_token,
      }),
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
