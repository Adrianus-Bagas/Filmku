import { useMutation, useQuery } from "@tanstack/react-query";

import {
  GetMovieDetailPage,
  GetMoviesPage,
  GetMoviesSchedule,
  GetMoviesSimilar,
  GetMoviesVideos,
  GetMoviesVideosPage,
} from "./fetcher";

import {
  MovieListInterface,
  MovieVideoInterface,
  RequestParamMovieSchedule,
} from "@/interfaces";

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

export const useGetMoviesVideos = (movie_id: string) => {
  const { isLoading, isFetching, data } = useQuery<{
    id: number;
    results: MovieVideoInterface[];
  }>({
    queryKey: ["getMoviesVideos", movie_id],
    queryFn: () => GetMoviesVideos(movie_id),
    refetchOnWindowFocus: false,
    enabled: !!movie_id,
  });

  return { isFetching, isLoading, data: data?.results ?? [] };
};

export const useGetMoviesSimilar = (movie_id: string) => {
  const { isLoading, isFetching, data } = useQuery<{
    page: number;
    results: MovieListInterface[];
  }>({
    queryKey: ["getMoviesSimilar", movie_id],
    queryFn: () => GetMoviesSimilar(movie_id),
    refetchOnWindowFocus: false,
    enabled: !!movie_id,
  });

  return { isFetching, isLoading, data: data?.results ?? [] };
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
