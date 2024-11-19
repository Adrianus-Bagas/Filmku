import { useMutation } from "@tanstack/react-query";

import { BulkRemoveHistory, GetHistories } from "./fetcher";

export const useGetHistories = () => {
  const { data, mutate, isPending, isIdle } = useMutation({
    mutationFn: () => GetHistories(),
  });

  return { data, mutate, isPending, isIdle };
};

export const useBulkDeleteFromHistory = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: ({ ids }: { ids: string[] }) => BulkRemoveHistory({ ids }),
  });

  return { mutate, isPending };
};
