import { axios } from "@/utils/axios";

export const GetMoviesTrendingByDay = async () => {
  const res = await axios({
    method: "get",
    url: "/trending/movie/day",
  });

  return res.data;
};
