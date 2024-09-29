import { atom } from "jotai";

import { HomeInterface } from "@/interfaces";

export const initialHomeAtomValue: HomeInterface = {
  carouselData: [],
  trendingMovies: [],
  upcomingMovies: [],
  trendingSeries: [],
  upcomingSeries: [],
  recommendMoviesByWatchlist: [],
  recommendMoviesByFavorite: [],
  recommendMoviesByHistory: [],
  recommendSeriesByWatchlist: [],
  recommendSeriesByFavorite: [],
  recommendSeriesByHistory: [],
  recommendList: {
    title: "",
    data: [],
  },
  openModalNotif: false,
  notifAlreadyShown: false,
};

export const homeAtom = atom<HomeInterface>({
  carouselData: [],
  trendingMovies: [],
  upcomingMovies: [],
  trendingSeries: [],
  upcomingSeries: [],
  recommendMoviesByWatchlist: [],
  recommendMoviesByFavorite: [],
  recommendMoviesByHistory: [],
  recommendSeriesByWatchlist: [],
  recommendSeriesByFavorite: [],
  recommendSeriesByHistory: [],
  recommendList: {
    title: "",
    data: [],
  },
  openModalNotif: false,
  notifAlreadyShown: false,
});
