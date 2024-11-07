"use client";

import { Spin } from "antd";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";

import { DisplayCarousel, DisplayCards } from "@/components";
import { CardData } from "@/interfaces";
import { findGenres, movieGenre } from "@/utils";
import { useGetMovies } from "@/services/hooks";
import { movieAtom } from "@/store";

export default function Movie() {
  const { data: movieList, isLoading } = useGetMovies();

  const [movie, setMovie] = useAtom(movieAtom);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getFirstMovie =
      movieList.nowPlaying[Math.floor(Math.random() * (9 - 0) + 0)];
    const getSecondMovie =
      movieList.popular[Math.floor(Math.random() * (19 - 10) + 10)];
    const getThirdMovie =
      movieList.topRated[Math.floor(Math.random() * (9 - 0) + 0)];

    const dataCarousel = [
      {
        title: getFirstMovie?.title,
        overview: getFirstMovie?.overview,
        backdrop_path: getFirstMovie?.backdrop_path,
        genres: findGenres(movieGenre, getFirstMovie?.genre_ids as number[]),
        redirect: "/movies/" + getFirstMovie?.id,
        media_type: "movie",
      },
      {
        title: getSecondMovie?.title,
        overview: getSecondMovie?.overview,
        backdrop_path: getSecondMovie?.backdrop_path,
        genres: findGenres(movieGenre, getSecondMovie?.genre_ids as number[]),
        redirect: "/movies/" + getSecondMovie?.id,
        media_type: "movie",
      },
      {
        title: getThirdMovie?.title,
        overview: getThirdMovie?.overview,
        backdrop_path: getThirdMovie?.backdrop_path,
        genres: findGenres(movieGenre, getThirdMovie?.genre_ids as number[]),
        redirect: "/movies/" + getThirdMovie?.id,
        media_type: "movie",
      },
    ];
    const dataCardMovieNowPlaying: CardData[] = movieList.nowPlaying?.map(
      (movie) => {
        return {
          id: movie.id,
          title: movie.title,
          poster_path: movie?.poster_path,
          redirect: "/movies/" + movie?.id,
          type: "movies",
        };
      },
    );
    const dataCardMoviePopular: CardData[] = movieList.popular?.map((movie) => {
      return {
        id: movie.id,
        title: movie.title,
        poster_path: movie?.poster_path,
        redirect: "/movies/" + movie?.id,
        type: "movies",
      };
    });
    const dataCardMovieTopRated: CardData[] = movieList.topRated?.map(
      (movie) => {
        return {
          id: movie.id,
          title: movie.title,
          poster_path: movie?.poster_path,
          redirect: "/movies/" + movie?.id,
          type: "movies",
        };
      },
    );

    setMovie({
      ...movie,
      carouselData: dataCarousel,
      nowPlaying: dataCardMovieNowPlaying,
      popular: dataCardMoviePopular,
      topRated: dataCardMovieTopRated,
    });
  }, [movieList]);

  return (
    <>
      {isLoading ? (
        <Spin fullscreen size="large" />
      ) : (
        <>
          {loading && <Spin fullscreen size="large" />}
          <DisplayCarousel
            carouselData={movie.carouselData}
            setLoading={setLoading}
          />
          <DisplayCards
            cardsData={movie.nowPlaying}
            redirect="/movies/now_playing"
            setLoading={setLoading}
            title="Now Playing Movies"
          />
          <DisplayCards
            cardsData={movie.popular}
            redirect="/movies/popular"
            setLoading={setLoading}
            title="Popular Movies"
          />
          <DisplayCards
            cardsData={movie.topRated}
            redirect="/movies/top_rated"
            setLoading={setLoading}
            title="Top Rated Movies"
          />
        </>
      )}
    </>
  );
}
