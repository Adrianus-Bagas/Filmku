import { CardData, CarouselData } from "./app.interface";

export interface HomeInterface {
  carouselData: CarouselData[];
  trendingMovies: CardData[];
  upcomingMovies: CardData[];
  trendingSeries: CardData[];
  upcomingSeries: CardData[];
  recommendMoviesByWatchlist: CardData[];
  recommendMoviesByFavorite: CardData[];
  recommendMoviesByHistory: CardData[];
  recommendSeriesByWatchlist: CardData[];
  recommendSeriesByFavorite: CardData[];
  recommendSeriesByHistory: CardData[];
  recommendList: {
    title: string;
    data: CardData[];
  };
  openModalNotif: boolean;
  notifAlreadyShown: boolean;
}

export interface NotificationInterface {
  id: number;
  poster_path: string;
  title: string;
  text: string;
  type: "movies" | "series";
}
