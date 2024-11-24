import { MovieListInterface } from "./movies.interfaces";

export interface PeopleListInterface {
  id: number;
  name: string;
  original_name: string;
  media_type: string;
  adult: boolean;
  popularity: string;
  gender: string;
  known_for_department: string;
  profile_path: string;
  known_for: MovieListInterface[];
}

export interface PeopleDetailInterface {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday: string;
  gender: number;
  homepage: string;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
}

export interface PeopleCastMovieInterface {
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
  video: boolean;
  vote_average: number;
  vote_count: number;
  character: string;
  credit_id: string;
  order: number;
  media_type: string;
}

export interface PeopleCastSeriesInterface {
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
  character: string;
  credit_id: string;
  episode_count: number;
  media_type: string;
}

export interface PeopleCrewMovieInterface {
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
  video: boolean;
  vote_average: number;
  vote_count: number;
  credit_id: string;
  department: string;
  job: string;
  media_type: string;
}

export interface PeopleCrewSeriesInterface {
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
  credit_id: string;
  department: string;
  episode_count: number;
  job: string;
  media_type: string;
}

export interface ResponsePeopleDetailInterface {
  detail: PeopleDetailInterface;
  cast: {
    movie: PeopleCastMovieInterface[];
    tv: PeopleCastSeriesInterface[];
  };
  crew: {
    movie: PeopleCrewMovieInterface[];
    tv: PeopleCrewSeriesInterface[];
  };
}
