import { useQuery } from "@tanstack/react-query";

import { GetCastsPage } from "./fetcher";

import {
  MovieCastInterface,
  PeopleListInterface,
  SeriesCastInterface,
} from "@/interfaces";

export const useGetCasts = () => {
  const { isLoading, isFetching, data } = useQuery<{
    popular: {
      title: string;
      data: PeopleListInterface[];
    };
    trendingMovie: {
      title: string;
      data: MovieCastInterface[];
    };
    trendingSeries: {
      title: string;
      data: SeriesCastInterface[];
    };
  }>({
    queryKey: ["getCastsPage"],
    queryFn: () => GetCastsPage(),
    refetchOnWindowFocus: false,
  });

  return {
    isFetching,
    isLoading,
    data: data || {
      popular: {
        title: "",
        data: [],
      },
      trendingMovie: {
        title: "",
        data: [],
      },
      trendingSeries: {
        title: "",
        data: [],
      },
    },
  };
};
