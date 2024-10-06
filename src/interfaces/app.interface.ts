export interface CarouselData {
  title: string;
  overview: string;
  backdrop_path: string;
  media_type: string;
  genres: string;
  redirect: string;
}

export interface CardData {
  id: number;
  title: string;
  poster_path: string;
  redirect: string;
  type: "movies" | "series" | "people";
}

export interface GenreData {
  id: number;
  name: string;
}

export interface SearchInterface {
  query: string;
  MovieResults: CardData[];
  SeriesResults: CardData[];
  PeopleResults: CardData[];
}
