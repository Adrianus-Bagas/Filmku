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
