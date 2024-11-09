import { axiosApi } from "@/utils";

export const AddReview = async ({
  tmdbId,
  userId,
  content,
  type,
}: {
  tmdbId: string;
  userId: string;
  content: string;
  type: "movies" | "series";
}) => {
  const result = await axiosApi({
    method: "post",
    url: `/review`,
    data: {
      tmdbId,
      userId,
      content,
      type,
    },
  });

  return result.data;
};

export const EditReview = async ({
  id,
  content,
}: {
  id: string;
  content: string;
}) => {
  const result = await axiosApi({
    method: "patch",
    url: `/review/${id}`,
    data: {
      content,
    },
  });

  return result.data;
};

export const DeleteReview = async (id: string) => {
  const result = await axiosApi({
    method: "delete",
    url: `/review/${id}`,
  });

  return result.data;
};
