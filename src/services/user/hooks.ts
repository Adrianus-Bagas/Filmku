import { useQuery } from "@tanstack/react-query";
import { GetUser } from "./fetcher";
import { getCookie } from "cookies-next";

export const useGetUser = () => {
  const { isLoading, isFetching, data } = useQuery({
    queryKey: ["getUser"],
    queryFn: () => GetUser(),
    refetchOnWindowFocus: false,
    enabled: !!getCookie("access_token"),
  });

  return { isFetching, isLoading, data };
};
