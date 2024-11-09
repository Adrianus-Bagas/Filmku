import { axiosApi } from "@/utils";

export const AddToFavorite = async ({
  tmdbId,
  userId,
  type,
}: {
  tmdbId: string;
  userId: string;
  type: "movies" | "series";
}) => {
  const result = await axiosApi({
    method: "post",
    url: `/favorite`,
    data: {
      tmdbId,
      userId,
      type,
    },
  });

  return result.data;
};

export const DeleteFromFavorite = async (id: string) => {
  const result = await axiosApi({
    method: "delete",
    url: `/favorite/${id}`,
  });

  return result.data;
};
