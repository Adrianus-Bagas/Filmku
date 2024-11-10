import { useQuery } from "@tanstack/react-query";

import { GetHome, GetNotification, PostSearch } from "./fetcher";

import {
  MovieListInterface,
  NotificationInterface,
  PeopleListInterface,
  RecommendedMoviesInterface,
  RecommendedSeriesInterface,
  SeriesListInterface,
} from "@/interfaces";

export const useGetHome = (user_token: string) => {
  const { isLoading, isFetching, data } = useQuery<{
    trendingMovies: MovieListInterface[];
    upcomingMovies: MovieListInterface[];
    trendingSeries: SeriesListInterface[];
    upcomingSeries: SeriesListInterface[];
    recommendMoviesByWatchlist: RecommendedMoviesInterface;
    recommendMoviesByFavorite: RecommendedMoviesInterface;
    recommendMoviesByHistory: RecommendedMoviesInterface;
    recommendSeriesByWatchlist: RecommendedSeriesInterface;
    recommendSeriesByFavorite: RecommendedSeriesInterface;
    recommendSeriesByHistory: RecommendedSeriesInterface;
  }>({
    queryKey: ["getHome", user_token],
    queryFn: () => GetHome(user_token),
    refetchOnWindowFocus: false,
  });

  return {
    isFetching,
    isLoading,
    data,
  };
};

export const useGetNotification = () => {
  const { isLoading, isFetching, data } = useQuery<NotificationInterface>({
    queryKey: ["getNotification"],
    queryFn: () => GetNotification(),
    refetchOnWindowFocus: false,
  });

  return {
    isFetching,
    isLoading,
    data,
  };
};

export const useSearch = (query: string) => {
  const { isLoading, isFetching, data } = useQuery<{
    movies: MovieListInterface[];
    series: SeriesListInterface[];
    people: PeopleListInterface[];
  }>({
    queryKey: ["postSearch", query],
    queryFn: () => PostSearch(query),
    refetchOnWindowFocus: false,
    enabled: !!query,
  });

  return {
    isFetching,
    isLoading,
    data,
  };
};
