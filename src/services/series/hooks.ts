import { useQuery } from "@tanstack/react-query";
import { GetSeriesTrendingByDay, GetSeriesUpcoming } from "./fetcher";

export const useGetSeriesTrendingByDay = () => {
  const { isLoading, isFetching, data } = useQuery({
    queryKey: ["getSeriesTrendingByDay"],
    queryFn: () => GetSeriesTrendingByDay(),
    refetchOnWindowFocus: false,
  });

  return { isFetching, isLoading, data: data?.results ?? [] };
};

export const useGetSeriesUpcoming = () => {
  const { isLoading, isFetching, data } = useQuery({
    queryKey: ["getSeriesUpcoming"],
    queryFn: () => GetSeriesUpcoming(),
    refetchOnWindowFocus: false,
  });

  return { isFetching, isLoading, data: data?.results ?? [] };
};
