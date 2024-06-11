import { useQuery } from "@tanstack/react-query";
import { GetMoviesTrendingByDay, GetMoviesUpcoming } from "./fetcher";

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
