import { useMutation } from "@tanstack/react-query";

import { GetPeopleDetailPage } from "./fetcher";

export const useGetPeopleDetailPage = () => {
  const { mutate, data, isIdle, isPending } = useMutation({
    mutationFn: ({ people_id }: { people_id: string }) =>
      GetPeopleDetailPage({ people_id }),
  });

  return { mutate, data, isIdle, isPending };
};
