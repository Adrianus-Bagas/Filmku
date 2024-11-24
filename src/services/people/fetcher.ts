import { ResponsePeopleDetailInterface } from "@/interfaces";
import { axiosApiMovie } from "@/utils";

export const GetPeopleDetailPage = async ({
  people_id,
}: {
  people_id: string;
}): Promise<ResponsePeopleDetailInterface> => {
  const result = await axiosApiMovie({
    method: "get",
    url: `/people/${people_id}`,
  });

  return result.data;
};
