import { CardData, CarouselData, ReviewListInterface } from ".";

export interface SeriesPageInterface {
  carouselData: CarouselData[];
  nowPlaying: CardData[];
  popular: CardData[];
  topRated: CardData[];
}

export interface RequestParamSeriesSchedule {
  first_on_air_date_gte?: string;
  first_on_air_date_lte?: string;
  original_language?: string;
}

export interface SeriesListInterface {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
  media_type: string;
}

export interface RecommendedSeriesInterface {
  title: string;
  data: SeriesListInterface[];
}

export interface SeriesVideoInterface {
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

export interface SeriesCastInterface {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  roles: {
    credit_id: string;
    character: string;
    episode_count: number;
  }[];
  total_episode_count: number;
  order: number;
}

export interface SeriesCrewInterface {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  jobs: {
    credit_id: string;
    job: string;
    episode_count: number;
  }[];
  department: string;
  total_episode_count: number;
}

export interface SeriesSeasonInterface {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
}

export interface SeriesDetailInterface {
  adult: boolean;
  backdrop_path: string;
  created_by: {
    id: number;
    credit_id: string;
    name: string;
    original_name: string;
    gender: number;
    profile_path: string;
  }[];
  episode_run_time: number[];
  first_air_date: string;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: {
    id: number;
    name: string;
    overview: string;
    vote_average: number;
    vote_count: number;
    air_date: string;
    episode_number: number;
    episode_type: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string;
  };
  name: string;
  next_episode_to_air: string;
  networks: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  seasons: SeriesSeasonInterface[];
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}

export interface ResponseSeriesDetailInterface {
  detail: SeriesDetailInterface;
  videos: SeriesVideoInterface[];
  similar: SeriesListInterface[];
  credits: {
    cast: SeriesCastInterface[];
    crew: SeriesCrewInterface[];
  };
  reviews: ReviewListInterface[];
  favoriteId: string | null;
  watchlistId: string | null;
}

export interface ResponseSeriesVideosInterface {
  similar: SeriesListInterface[];
  videos: SeriesVideoInterface[];
}
