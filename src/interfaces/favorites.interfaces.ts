import {
  CardData,
  MovieDatabaseInterface,
  MovieListInterface,
  SeriesListInterface,
} from ".";

export interface ResponseGetFavoritesInterface {
  statusCode: number;
  data: MovieDatabaseInterface[];
  trendingMovies: MovieListInterface[];
  trendingSeries: SeriesListInterface[];
}

export interface FavoritesPageInterface {
  trendingMovies: CardData[];
  trendingSeries: CardData[];
}
