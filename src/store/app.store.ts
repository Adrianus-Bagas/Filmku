import { atom } from "jotai";

import { SearchInterface } from "@/interfaces";

export const initialSearchAtomValue: SearchInterface = {
  query: "",
  MovieResults: [],
  SeriesResults: [],
  PeopleResults: [],
};

export const totalImageLoadedAtom = atom<number>(0);

export const searchAtom = atom<SearchInterface>(initialSearchAtomValue);
export const isOnRecommendationPageAtom = atom<boolean>(false);
