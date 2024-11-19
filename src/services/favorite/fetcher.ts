import { ResponseGetFavoritesInterface } from "@/interfaces";
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

export const GetFavorites =
  async (): Promise<ResponseGetFavoritesInterface> => {
    const result = await axiosApi({
      method: "get",
      url: "/favorite",
    });

    return result.data;
  };

export const BulkRemoveFavorite = async ({ ids }: { ids: string[] }) => {
  const result = await axiosApi({
    method: "post",
    url: `/favorite/bulk-remove`,
    data: {
      ids,
    },
  });

  return result.data;
};
