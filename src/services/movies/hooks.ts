import { useQuery } from "@tanstack/react-query";
import {
  GetMoviesNowPlaying,
  GetMoviesPopular,
  GetMoviesTopRated,
  GetMoviesTrendingByDay,
  GetMoviesUpcoming,
} from "./fetcher";

export const useGetMoviesTrendingByDay = () => {
  const { isLoading, isFetching, data } = useQuery({
    queryKey: ["getMoviesTrendingByDay"],
    queryFn: () => GetMoviesTrendingByDay(),
    refetchOnWindowFocus: false,
  });

  return { isFetching, isLoading, data: data?.results ?? [] };
};

export const useGetMoviesUpcoming = () => {
  const { isLoading, isFetching, data } = useQuery({
    queryKey: ["getMoviesUpcoming"],
    queryFn: () => GetMoviesUpcoming(),
    refetchOnWindowFocus: false,
  });

  return { isFetching, isLoading, data: data?.results ?? [] };
};

export const useGetMoviesNowPlaying = () => {
  const { isLoading, isFetching, data } = useQuery({
    queryKey: ["getMoviesNowPlaying"],
    queryFn: () => GetMoviesNowPlaying(),
    refetchOnWindowFocus: false,
  });

  return { isFetching, isLoading, data: data?.results ?? [] };
};

export const useGetMoviesPopular = () => {
  const { isLoading, isFetching, data } = useQuery({
    queryKey: ["getMoviesPopular"],
    queryFn: () => GetMoviesPopular(),
    refetchOnWindowFocus: false,
  });

  return { isFetching, isLoading, data: data?.results ?? [] };
};

export const useGetMoviesTopRated = () => {
  const { isLoading, isFetching, data } = useQuery({
    queryKey: ["getMoviesTopRated"],
    queryFn: () => GetMoviesTopRated(),
    refetchOnWindowFocus: false,
  });

  return { isFetching, isLoading, data: data?.results ?? [] };
};
