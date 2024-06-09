import { GenreData } from "@/interfaces/app.interface";

export const findGenres = (genreType: GenreData[], genres: number[]) => {
  const genresName = genres?.map((genre) => {
    const findGenre = genreType.find((i) => i.id === genre);
    return findGenre?.name;
  });
  return genresName?.join(", ");
};
