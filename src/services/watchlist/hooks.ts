import { useMutation } from "@tanstack/react-query";

import {
  AddToWatchlist,
  BulkRemoveWatchlist,
  DeleteFromWatchlist,
  GetWatchlist,
} from "./fetcher";

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

export const useGetWatchlist = () => {
  const { data, mutate, isPending, isIdle } = useMutation({
    mutationFn: () => GetWatchlist(),
  });

  return { data, mutate, isPending, isIdle };
};

export const useBulkDeleteFromWatchlist = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: ({ ids }: { ids: string[] }) => BulkRemoveWatchlist({ ids }),
  });

  return { mutate, isPending };
};
