import { atom } from "jotai";

import { SeriesPageInterface } from "@/interfaces";

export const initialSeriesPageAtomValue: SeriesPageInterface = {
  carouselData: [],
  nowPlaying: [],
  popular: [],
  topRated: [],
};

export const seriesAtom = atom<SeriesPageInterface>(initialSeriesPageAtomValue);
