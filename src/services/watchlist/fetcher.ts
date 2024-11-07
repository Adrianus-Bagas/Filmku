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
