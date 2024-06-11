"use client";

import { Spin } from "antd";

import { DisplayCarousel } from "@/components";
import { useEffect, useState } from "react";
import { CardData, CarouselData } from "@/interfaces/app.interface";
import { findGenres } from "@/utils/global";
import { movieGenre, seriesGenre } from "@/utils/constants";
import DisplayCards from "@/components/DisplayCards";
import {
  useGetMoviesTrendingByDay,
  useGetMoviesUpcoming,
} from "@/services/movies/hooks";
import {
  useGetSeriesTrendingByDay,
  useGetSeriesUpcoming,
} from "@/services/series/hooks";

export default function Home() {
  const { data: trendingMovie, isLoading: loadingMovie } =
    useGetMoviesTrendingByDay();
  const { data: trendingSeries, isLoading: loadingSeries } =
    useGetSeriesTrendingByDay();
  const { data: upcomingMovie, isLoading: loadingMovieUpcoming } =
    useGetMoviesUpcoming();
  const { data: upcomingSeries, isLoading: loadingSeriesUpcoming } =
    useGetSeriesUpcoming();
  const [carouselData, setCarouselData] = useState<CarouselData[]>([]);
  const [moviesCards, setMoviesCards] = useState<CardData[]>([]);
  const [seriesCards, setSeriesCards] = useState<CardData[]>([]);
  const [upcomingMoviesCards, setUpcomingMoviesCards] = useState<CardData[]>(
    [],
  );
  const [upcomingSeriesCards, setUpcomingSeriesCards] = useState<CardData[]>(
    [],
  );

  useEffect(() => {
    const getFirstTrendingMovie = trendingMovie
      ? trendingMovie[Math.floor(Math.random() * (9 - 0) + 0)]
      : {};
    const getSecondTrendingMovie = trendingMovie
      ? trendingMovie[Math.floor(Math.random() * (19 - 10) + 10)]
      : {};
    const getFirstTrendingSeries = trendingSeries
      ? trendingSeries[Math.floor(Math.random() * (9 - 0) + 0)]
      : {};
    const getSecondTrendingSeries = trendingSeries
      ? trendingSeries[Math.floor(Math.random() * (19 - 10) + 10)]
      : {};

    const dataCarousel = [
      {
        title: getFirstTrendingMovie?.title,
        overview: getFirstTrendingMovie?.overview,
        backdrop_path: getFirstTrendingMovie?.backdrop_path,
        genres: findGenres(
          movieGenre,
          getFirstTrendingMovie?.genre_ids as number[],
        ),
        redirect: "/movies/" + getFirstTrendingMovie?.id,
        media_type: getFirstTrendingMovie?.media_type,
      },
      {
        title: getSecondTrendingMovie?.title,
        overview: getSecondTrendingMovie?.overview,
        backdrop_path: getSecondTrendingMovie?.backdrop_path,
        genres: findGenres(
          movieGenre,
          getSecondTrendingMovie?.genre_ids as number[],
        ),
        redirect: "/movies/" + getSecondTrendingMovie?.id,
        media_type: getSecondTrendingMovie?.media_type,
      },
      {
        title: getFirstTrendingSeries?.name,
        overview: getFirstTrendingSeries?.overview,
        backdrop_path: getFirstTrendingSeries?.backdrop_path,
        genres: findGenres(
          seriesGenre,
          getFirstTrendingSeries?.genre_ids as number[],
        ),
        redirect: "/series/" + getFirstTrendingSeries?.id,
        media_type: getFirstTrendingSeries?.media_type,
      },
      {
        title: getSecondTrendingSeries?.name,
        overview: getSecondTrendingSeries?.overview,
        backdrop_path: getSecondTrendingSeries?.backdrop_path,
        genres: findGenres(
          seriesGenre,
          getSecondTrendingSeries?.genre_ids as number[],
        ),
        redirect: "/series/" + getSecondTrendingSeries?.id,
        media_type: getSecondTrendingSeries?.media_type,
      },
    ];
    const dataCardMovie: CardData[] = trendingMovie?.map((movie: any) => {
      return {
        poster_path: movie?.poster_path,
        redirect: "/movies/" + movie?.id,
      };
    });
    const dataCardSeries: CardData[] = trendingSeries?.map((series: any) => {
      return {
        poster_path: series?.poster_path,
        redirect: "/series/" + series?.id,
      };
    });
    const dataCardMovieUpcoming: CardData[] = upcomingMovie?.map(
      (movie: any) => {
        return {
          poster_path: movie?.poster_path,
          redirect: "/movies/" + movie?.id,
        };
      },
    );
    const dataCardSeriesUpcoming: CardData[] = upcomingSeries?.map(
      (series: any) => {
        return {
          poster_path: series?.poster_path,
          redirect: "/series/" + series?.id,
        };
      },
    );
    setCarouselData(dataCarousel);
    setMoviesCards(dataCardMovie.slice(0, 8));
    setSeriesCards(dataCardSeries.slice(0, 8));
    setUpcomingMoviesCards(dataCardMovieUpcoming.slice(0, 8));
    setUpcomingSeriesCards(dataCardSeriesUpcoming.slice(0, 8));
  }, [trendingMovie, trendingSeries]);

  return (
    <>
      {(loadingMovie ||
        loadingSeries ||
        loadingMovieUpcoming ||
        loadingSeriesUpcoming) && <Spin fullscreen size="large" />}
      <div>
        <DisplayCarousel carouselData={carouselData} />
        <DisplayCards
          title="Trending Movies Today"
          cardsData={moviesCards}
          redirect="/movies/trending"
        />
        <DisplayCards
          title="Trending Series Today"
          cardsData={seriesCards}
          redirect="/series/trending"
        />
        <DisplayCards
          title="Upcoming Movies"
          cardsData={upcomingMoviesCards}
          redirect="/movies/upcoming"
        />
        <DisplayCards
          title="Upcoming Series"
          cardsData={upcomingSeriesCards}
          redirect="/series/upcoming"
        />
      </div>
    </>
  );
}
