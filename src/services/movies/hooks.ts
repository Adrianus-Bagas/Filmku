import { useQuery } from "@tanstack/react-query";
import {
  GetMoviesDetail,
  GetMoviesNowPlaying,
  GetMoviesPopular,
  GetMoviesTopRated,
  GetMoviesTrendingByDay,
  GetMoviesUpcoming,
  GetMoviesVideos,
} from "./fetcher";
import {
  MovieDetailInterface,
  MovieVideoInterface,
} from "@/interfaces/movies.interfaces";

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
