import { useMutation } from "@tanstack/react-query";

import { AddToWatchlist } from "./fetcher";

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
