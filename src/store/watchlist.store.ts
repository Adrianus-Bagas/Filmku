import { atom } from "jotai";

import { WatchlistPageInterface } from "@/interfaces";

export const initialWatchlistPageAtomValue: WatchlistPageInterface = {
  trendingMovies: [],
  trendingSeries: [],
};

export const watchlistAtom = atom<WatchlistPageInterface>(
  initialWatchlistPageAtomValue,
);
