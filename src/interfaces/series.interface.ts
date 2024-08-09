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
}
