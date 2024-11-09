import { atom } from "jotai";

import { SearchInterface } from "@/interfaces";
import { UserInterface } from "@/interfaces/user.interfaces";

export const initialSearchAtomValue: SearchInterface = {
  query: "",
  MovieResults: [],
  SeriesResults: [],
  PeopleResults: [],
};
export const initialUserAtomValue: UserInterface = {
  email: "",
  Favorite: [],
  fullName: "",
  History: [],
  id: "",
  image: "",
  Watchlist: [],
};

export const userAtom = atom<UserInterface>(initialUserAtomValue);

export const totalImageLoadedAtom = atom<number>(0);

export const searchAtom = atom<SearchInterface>(initialSearchAtomValue);
export const isOnRecommendationPageAtom = atom<boolean>(false);
