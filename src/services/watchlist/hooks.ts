import { useMutation } from "@tanstack/react-query";

import { AddToWatchlist, DeleteFromWatchlist } from "./fetcher";

export const useAddToWatchlist = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: ({
      tmdbId,
      userId,
      type,
    }: {
      tmdbId: string;
      userId: string;
      type: "movies" | "series";
    }) => AddToWatchlist({ tmdbId, userId, type }),
  });

  return { mutate, isPending };
};

export const useDeleteFromWatchlist = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => DeleteFromWatchlist(id),
  });

  return { mutate, isPending };
};
