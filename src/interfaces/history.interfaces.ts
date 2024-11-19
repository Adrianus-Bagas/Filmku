import {
  CardData,
  MovieDatabaseInterface,
  MovieListInterface,
  SeriesListInterface,
} from ".";

export interface ResponseGetHistoriesInterface {
  statusCode: number;
  data: MovieDatabaseInterface[];
  trendingMovies: MovieListInterface[];
  trendingSeries: SeriesListInterface[];
}

export interface HistoriesPageInterface {
  trendingMovies: CardData[];
  trendingSeries: CardData[];
}
