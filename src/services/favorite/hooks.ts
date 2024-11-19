import { useMutation } from "@tanstack/react-query";

import {
  AddToFavorite,
  BulkRemoveFavorite,
  DeleteFromFavorite,
  GetFavorites,
} from "./fetcher";

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

export const useGetFavorites = () => {
  const { data, mutate, isPending, isIdle } = useMutation({
    mutationFn: () => GetFavorites(),
  });

  return { data, mutate, isPending, isIdle };
};

export const useBulkDeleteFromFavorite = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: ({ ids }: { ids: string[] }) => BulkRemoveFavorite({ ids }),
  });

  return { mutate, isPending };
};
