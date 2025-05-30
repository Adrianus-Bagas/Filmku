import { CardData, CarouselData, GenreData } from "./app.interface";

export interface MoviePageInterface {
  carouselData: CarouselData[];
  nowPlaying: CardData[];
  popular: CardData[];
  topRated: CardData[];
}

export interface BelongToCollectionInterface {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

export interface ProductionCompaniesInterface {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface ProductionCountriesInterface {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguagesInterface {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface MovieListInterface {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: string;
  vote_average: number;
  vote_count: number;
  media_type: string;
}

export interface MovieDetailInterface {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: BelongToCollectionInterface;
  budget: number;
  genres: GenreData[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompaniesInterface[];
  production_countries: ProductionCountriesInterface[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguagesInterface[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieVideoInterface {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}

export interface MovieCreditInterface {
  id: number;
  cast: MovieCastInterface[];
  crew: MovieCreditInterface[];
}

export interface MovieCastInterface {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface MovieCrewInterface {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  credit_id: string;
  department: string;
  job: string;
}

export interface RequestParamMovieSchedule {
  primary_release_date_gte?: string;
  primary_release_date_lte?: string;
  original_language?: string;
}

export interface RecommendedMoviesInterface {
  title: string;
  data: MovieListInterface[];
}

export interface ReviewListInterface {
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string;
    rating: number;
  };
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}

export interface ResponseMovieDetailInterface {
  detail: MovieDetailInterface;
  videos: MovieVideoInterface[];
  similar: MovieListInterface[];
  credits: {
    cast: MovieCastInterface[];
    crew: MovieCrewInterface[];
  };
  reviews: ReviewListInterface[];
  favoriteId: string | null;
  watchlistId: string | null;
}

export interface ResponseMovieVideosInterface {
  videos: MovieVideoInterface[];
  similar: MovieListInterface[];
}
