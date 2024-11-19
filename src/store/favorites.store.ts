import { atom } from "jotai";

import { FavoritesPageInterface } from "@/interfaces";

export const initialFavoritesPageAtomValue: FavoritesPageInterface = {
  trendingMovies: [],
  trendingSeries: [],
};

export const favoritesAtom = atom<FavoritesPageInterface>(
  initialFavoritesPageAtomValue,
);
