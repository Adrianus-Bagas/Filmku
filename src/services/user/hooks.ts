import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";

import { GetUserData } from "./fetcher";

import { UserInterface } from "@/interfaces/user.interfaces";

export const useGetUser = () => {
  const { isLoading, isFetching, data } = useQuery<UserInterface>({
    queryKey: ["getUserData"],
    queryFn: () => GetUserData(),
    refetchOnWindowFocus: false,
    enabled: !!getCookie("access_token"),
  });

  return { isFetching, isLoading, data };
};
