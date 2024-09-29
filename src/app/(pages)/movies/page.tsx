"use client";

import { Spin } from "antd";
import { useEffect, useState } from "react";

import { DisplayCarousel, DisplayCards } from "@/components";
import { CardData, CarouselData } from "@/interfaces";
import { findGenres, movieGenre } from "@/utils";
import {
  useGetMoviesNowPlaying,
  useGetMoviesPopular,
  useGetMoviesTopRated,
} from "@/services/hooks";

export default function Movie() {
  const { data: nowPlayingMovie, isLoading: loadingMovieNowPlaying } =
    useGetMoviesNowPlaying();
  const { data: popularMovie, isLoading: loadingMoviePopular } =
    useGetMoviesPopular();
  const { data: topRatedMovie, isLoading: loadingMovieTopRated } =
    useGetMoviesTopRated();
  const [carouselData, setCarouselData] = useState<CarouselData[]>([]);
  const [nowPlayingMoviesCards, setNowPlayingMoviesCards] = useState<
    CardData[]
  >([]);
  const [popularMoviesCards, setPopularMoviesCards] = useState<CardData[]>([]);
  const [topRatedMoviesCards, setTopRatedMoviesCards] = useState<CardData[]>(
    [],
  );

  useEffect(() => {
    const getFirstMovie =
      nowPlayingMovie[Math.floor(Math.random() * (9 - 0) + 0)];
    const getSecondMovie =
      popularMovie[Math.floor(Math.random() * (19 - 10) + 10)];
    const getThirdMovie =
      topRatedMovie[Math.floor(Math.random() * (9 - 0) + 0)];

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
    const dataCardMovieNowPlaying: CardData[] = nowPlayingMovie?.map(
      (movie) => {
        return {
          id: movie.id,
          title: movie.title,
          poster_path: movie?.poster_path,
          redirect: "/movies/" + movie?.id,
        };
      },
    );
    const dataCardMoviePopular: CardData[] = popularMovie?.map((movie) => {
      return {
        id: movie.id,
        title: movie.title,
        poster_path: movie?.poster_path,
        redirect: "/movies/" + movie?.id,
      };
    });
    const dataCardMovieTopRated: CardData[] = topRatedMovie?.map((movie) => {
      return {
        id: movie.id,
        title: movie.title,
        poster_path: movie?.poster_path,
        redirect: "/movies/" + movie?.id,
      };
    });

    setCarouselData(dataCarousel);
    setNowPlayingMoviesCards(dataCardMovieNowPlaying.slice(0, 8));
    setPopularMoviesCards(dataCardMoviePopular.slice(0, 8));
    setTopRatedMoviesCards(dataCardMovieTopRated.slice(0, 8));
  }, [nowPlayingMovie, popularMovie, topRatedMovie]);

  return (
    <>
      {loadingMovieNowPlaying || loadingMoviePopular || loadingMovieTopRated ? (
        <Spin fullscreen size="large" />
      ) : (
        <div>
          <DisplayCarousel carouselData={carouselData} />
          <DisplayCards
            cardsData={nowPlayingMoviesCards}
            redirect="/movies/now_playing"
            title="Now Playing Movies"
          />
          <DisplayCards
            cardsData={popularMoviesCards}
            redirect="/movies/popular"
            title="Popular Movies"
          />
          <DisplayCards
            cardsData={topRatedMoviesCards}
            redirect="/movies/top_rated"
            title="Top Rated Movies"
          />
        </div>
      )}
    </>
  );
}
