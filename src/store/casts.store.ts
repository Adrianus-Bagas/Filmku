import { atom } from "jotai";

import { CastsPageInterface } from "@/interfaces";

export const initialCastsPageAtomValue: CastsPageInterface = {
  carouselData: [],
  trendingMovie: [],
  popular: [],
  trendingSeries: [],
};

export const castAtom = atom<CastsPageInterface>(initialCastsPageAtomValue);
