import { useQuery } from "@tanstack/react-query";

import { GetMoviesTrendingByDay } from "./fetcher";

export const useGetMoviesTrendingByDay = () => {
  const { isLoading, isFetching, data } = useQuery({
    queryKey: ["getMoviesTrendingByDay"],
    queryFn: () => GetMoviesTrendingByDay(),
    refetchOnWindowFocus: false,
  });

  return { isFetching, isLoading, data };
};
