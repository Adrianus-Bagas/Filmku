import { useQuery } from "@tanstack/react-query";

import { GetMoviesTrendingByDay, GetSeriesTrendingByDay } from "./fetcher";

export const useGetMoviesTrendingByDay = () => {
  const { isLoading, isFetching, data } = useQuery({
    queryKey: ["getMoviesTrendingByDay"],
    queryFn: () => GetMoviesTrendingByDay(),
    refetchOnWindowFocus: false,
  });

  return { isFetching, isLoading, data: data?.results };
};

export const useGetSeriesTrendingByDay = () => {
  const { isLoading, isFetching, data } = useQuery({
    queryKey: ["getSeriesTrendingByDay"],
    queryFn: () => GetSeriesTrendingByDay(),
    refetchOnWindowFocus: false,
  });

  return { isFetching, isLoading, data: data?.results };
};
