import { ResponseGetHistoriesInterface } from "@/interfaces";
import { axiosApi } from "@/utils";

export const GetHistories =
  async (): Promise<ResponseGetHistoriesInterface> => {
    const result = await axiosApi({
      method: "get",
      url: "/history",
    });

    return result.data;
  };

export const BulkRemoveHistory = async ({ ids }: { ids: string[] }) => {
  const result = await axiosApi({
    method: "post",
    url: `/history/bulk-remove`,
    data: {
      ids,
    },
  });

  return result.data;
};
