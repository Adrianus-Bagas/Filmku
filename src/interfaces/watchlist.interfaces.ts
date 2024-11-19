import {
  CardData,
  MovieDatabaseInterface,
  MovieListInterface,
  SeriesListInterface,
} from ".";

export interface ResponseGetWatchlistInterface {
  statusCode: number;
  data: MovieDatabaseInterface[];
  trendingMovies: MovieListInterface[];
  trendingSeries: SeriesListInterface[];
}

export interface WatchlistPageInterface {
  trendingMovies: CardData[];
  trendingSeries: CardData[];
}
