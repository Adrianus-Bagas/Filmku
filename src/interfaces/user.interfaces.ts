import { MovieDatabaseInterface } from ".";

export interface UserInterface {
  id: string;
  fullName: string;
  email: string;
  image: string;
  Favorite: MovieDatabaseInterface[];
  History: MovieDatabaseInterface[];
  Watchlist: MovieDatabaseInterface[];
}
