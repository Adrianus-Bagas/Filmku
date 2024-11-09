import { useMutation } from "@tanstack/react-query";

import { AddReview, DeleteReview, EditReview } from "./fetcher";

export const useAddReview = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: ({
      tmdbId,
      userId,
      content,
      type,
    }: {
      tmdbId: string;
      userId: string;
      content: string;
      type: "movies" | "series";
    }) => AddReview({ tmdbId, userId, content, type }),
  });

  return { mutate, isPending };
};

export const useEditReview = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: ({ id, content }: { id: string; content: string }) =>
      EditReview({ id, content }),
  });

  return { mutate, isPending };
};

export const useDeleteReview = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => DeleteReview(id),
  });

  return { mutate, isPending };
};
