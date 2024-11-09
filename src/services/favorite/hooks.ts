import { useMutation } from "@tanstack/react-query";

import { AddToFavorite, DeleteFromFavorite } from "./fetcher";

export const useAddToFavorite = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: ({
      tmdbId,
      userId,
      type,
    }: {
      tmdbId: string;
      userId: string;
      type: "movies" | "series";
    }) => AddToFavorite({ tmdbId, userId, type }),
  });

  return { mutate, isPending };
};

export const useDeleteFromFavorite = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => DeleteFromFavorite(id),
  });

  return { mutate, isPending };
};
