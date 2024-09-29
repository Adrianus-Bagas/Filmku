import { useQuery } from "@tanstack/react-query";

import {
  GetMoviesCredits,
  GetMoviesDetail,
  GetMoviesNowPlaying,
  GetMoviesPopular,
  GetMoviesSchedule,
  GetMoviesSimilar,
  GetMoviesTopRated,
  GetMoviesTrendingByDay,
  GetMoviesUpcoming,
  GetMoviesVideos,
} from "./fetcher";

import {
  MovieCastInterface,
  MovieCrewInterface,
  MovieDetailInterface,
  MovieListInterface,
  MovieVideoInterface,
  RequestParamMovieSchedule,
} from "@/interfaces";

export const useGetMoviesTrendingByDay = () => {
  const { isLoading, isFetching, data } = useQuery<{
    page: number;
    results: MovieListInterface[];
  }>({
    queryKey: ["getMoviesTrendingByDay"],
    queryFn: () => GetMoviesTrendingByDay(),
    refetchOnWindowFocus: false,
  });

  return { isFetching, isLoading, data: data?.results ?? [] };
};

export const useGetMoviesUpcoming = () => {
  const { isLoading, isFetching, data } = useQuery<{
    page: number;
    results: MovieListInterface[];
  }>({
    queryKey: ["getMoviesUpcoming"],
    queryFn: () => GetMoviesUpcoming(),
    refetchOnWindowFocus: false,
  });

  return { isFetching, isLoading, data: data?.results ?? [] };
};

export const useGetMoviesNowPlaying = () => {
  const { isLoading, isFetching, data } = useQuery<{
    page: number;
    results: MovieListInterface[];
  }>({
    queryKey: ["getMoviesNowPlaying"],
    queryFn: () => GetMoviesNowPlaying(),
    refetchOnWindowFocus: false,
  });

  return { isFetching, isLoading, data: data?.results ?? [] };
};

export const useGetMoviesPopular = () => {
  const { isLoading, isFetching, data } = useQuery<{
    page: number;
    results: MovieListInterface[];
  }>({
    queryKey: ["getMoviesPopular"],
    queryFn: () => GetMoviesPopular(),
    refetchOnWindowFocus: false,
  });

  return { isFetching, isLoading, data: data?.results ?? [] };
};

export const useGetMoviesTopRated = () => {
  const { isLoading, isFetching, data } = useQuery<{
    page: number;
    results: MovieListInterface[];
  }>({
    queryKey: ["getMoviesTopRated"],
    queryFn: () => GetMoviesTopRated(),
    refetchOnWindowFocus: false,
  });

  return { isFetching, isLoading, data: data?.results ?? [] };
};

export const useGetMoviesDetail = (movie_id: string) => {
  const { isLoading, isFetching, data } = useQuery<MovieDetailInterface>({
    queryKey: ["getMoviesDetail", movie_id],
    queryFn: () => GetMoviesDetail(movie_id),
    refetchOnWindowFocus: false,
    enabled: !!movie_id,
  });

  return { isFetching, isLoading, data };
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

export const useGetMoviesCredits = (movie_id: string) => {
  const { isLoading, isFetching, data } = useQuery<{
    id: number;
    cast: MovieCastInterface[];
    crew: MovieCrewInterface[];
  }>({
    queryKey: ["getMoviesCredit", movie_id],
    queryFn: () => GetMoviesCredits(movie_id),
    refetchOnWindowFocus: false,
    enabled: !!movie_id,
  });

  return {
    isFetching,
    isLoading,
    dataCast: data?.cast ?? [],
    dataCrew: data?.crew ?? [],
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
