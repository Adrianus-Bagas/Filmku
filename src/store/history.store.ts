import { atom } from "jotai";

import { HistoriesPageInterface } from "@/interfaces";

export const initialHistoriesPageAtomValue: HistoriesPageInterface = {
  trendingMovies: [],
  trendingSeries: [],
};

export const historiesAtom = atom<HistoriesPageInterface>(
  initialHistoriesPageAtomValue,
);
