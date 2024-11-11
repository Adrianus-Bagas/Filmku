import { useMutation, useQuery } from "@tanstack/react-query";

import {
  GetMovieDetailPage,
  GetMoviesPage,
  GetMoviesSchedule,
  GetMoviesVideosPage,
} from "./fetcher";

import { MovieListInterface, RequestParamMovieSchedule } from "@/interfaces";

export const useGetMovies = () => {
  const { isLoading, isFetching, data } = useQuery<{
    nowPlaying: MovieListInterface[];
    popular: MovieListInterface[];
    topRated: MovieListInterface[];
  }>({
    queryKey: ["getMoviesPage"],
    queryFn: () => GetMoviesPage(),
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

export const useGetMoviesDetailPage = () => {
  const { mutate, data, isIdle, isPending } = useMutation({
    mutationFn: ({
      movie_id,
      user_token,
    }: {
      movie_id: string;
      user_token: string;
    }) => GetMovieDetailPage({ movie_id, user_token }),
  });

  return { mutate, data, isIdle, isPending };
};

export const useGetMoviesVideosPage = () => {
  const { mutate, data, isIdle, isPending } = useMutation({
    mutationFn: ({
      movie_id,
      user_token,
    }: {
      movie_id: string;
      user_token: string;
    }) => GetMoviesVideosPage({ movie_id, user_token }),
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

export const useGetMoviesSchedule = (params: RequestParamMovieSchedule) => {
  const { isLoading, isFetching, data, refetch } = useQuery<{
    page: number;
    results: MovieListInterface[];
    total_pages: number;
    total_results: number;
  }>({
    queryKey: ["getMoviesSchedule", params],
    queryFn: () => GetMoviesSchedule(params),
    refetchOnWindowFocus: false,
  });

  return {
    isFetching,
    isLoading,
    data: data?.results || [],
    refetch,
  };
};
