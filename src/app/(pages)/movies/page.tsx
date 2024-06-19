"use client";

import { Spin } from "antd";

import { DisplayCarousel } from "@/components";
import { useEffect, useState } from "react";
import { CardData, CarouselData } from "@/interfaces/app.interface";
import { findGenres } from "@/utils/global";
import { movieGenre } from "@/utils/constants";
import DisplayCards from "@/components/DisplayCards";
import {
  useGetMoviesNowPlaying,
  useGetMoviesPopular,
  useGetMoviesTopRated,
} from "@/services/movies/hooks";

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
    const getFirstMovie = nowPlayingMovie
      ? nowPlayingMovie[Math.floor(Math.random() * (9 - 0) + 0)]
      : {};
    const getSecondMovie = popularMovie
      ? popularMovie[Math.floor(Math.random() * (19 - 10) + 10)]
      : {};
    const getThirdMovie = topRatedMovie
      ? topRatedMovie[Math.floor(Math.random() * (9 - 0) + 0)]
      : {};

    const dataCarousel = [
      {
        title: getFirstMovie?.title,
        overview: getFirstMovie?.overview,
        backdrop_path: getFirstMovie?.backdrop_path,
        genres: findGenres(movieGenre, getFirstMovie?.genre_ids as number[]),
        redirect: "/movies/" + getFirstMovie?.id,
        media_type: getFirstMovie?.media_type,
      },
      {
        title: getSecondMovie?.title,
        overview: getSecondMovie?.overview,
        backdrop_path: getSecondMovie?.backdrop_path,
        genres: findGenres(movieGenre, getSecondMovie?.genre_ids as number[]),
        redirect: "/movies/" + getSecondMovie?.id,
        media_type: getSecondMovie?.media_type,
      },
      {
        title: getThirdMovie?.title,
        overview: getThirdMovie?.overview,
        backdrop_path: getThirdMovie?.backdrop_path,
        genres: findGenres(movieGenre, getThirdMovie?.genre_ids as number[]),
        redirect: "/movies/" + getThirdMovie?.id,
        media_type: getThirdMovie?.media_type,
      },
    ];
    const dataCardMovieNowPlaying: CardData[] = nowPlayingMovie?.map(
      (movie: any) => {
        return {
          poster_path: movie?.poster_path,
          redirect: "/movies/" + movie?.id,
        };
      },
    );
    const dataCardMoviePopular: CardData[] = popularMovie?.map((movie: any) => {
      return {
        poster_path: movie?.poster_path,
        redirect: "/movies/" + movie?.id,
      };
    });
    const dataCardMovieTopRated: CardData[] = topRatedMovie?.map(
      (movie: any) => {
        return {
          poster_path: movie?.poster_path,
          redirect: "/movies/" + movie?.id,
        };
      },
    );
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
            title="Now Playing Movies"
            cardsData={nowPlayingMoviesCards}
            redirect="/movies/now_playing"
          />
          <DisplayCards
            title="Popular Movies"
            cardsData={popularMoviesCards}
            redirect="/movies/popular"
          />
          <DisplayCards
            title="Top Rated Movies"
            cardsData={topRatedMoviesCards}
            redirect="/movies/top_rated"
          />
        </div>
      )}
    </>
  );
}
