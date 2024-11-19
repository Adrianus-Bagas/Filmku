import { ResponseGetWatchlistInterface } from "@/interfaces";
import { axiosApi } from "@/utils";

export const AddToWatchlist = async ({
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
    url: `/watchlist`,
    data: {
      tmdbId,
      userId,
      type,
    },
  });

  return result.data;
};

export const DeleteFromWatchlist = async (id: string) => {
  const result = await axiosApi({
    method: "delete",
    url: `/watchlist/${id}`,
  });

  return result.data;
};

export const GetWatchlist =
  async (): Promise<ResponseGetWatchlistInterface> => {
    const result = await axiosApi({
      method: "get",
      url: "/watchlist",
    });

    return result.data;
  };

export const BulkRemoveWatchlist = async ({ ids }: { ids: string[] }) => {
  const result = await axiosApi({
    method: "post",
    url: `/watchlist/bulk-remove`,
    data: {
      ids,
    },
  });

  return result.data;
};
