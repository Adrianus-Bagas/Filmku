"use client";

import { Spin } from "antd";

import {
  useGetMoviesTrendingByDay,
  useGetSeriesTrendingByDay,
} from "@/services/trending/hooks";
import { DisplayCarousel } from "@/components";
import { useEffect, useState } from "react";
import { CarouselData } from "@/interfaces/app.interface";
import { findGenres } from "@/utils/global";
import { movieGenre, seriesGenre } from "@/utils/constants";

export default function Home() {
  const { data: trendingMovie, isLoading: loadingMovie } =
    useGetMoviesTrendingByDay();
  const { data: trendingSeries, isLoading: loadingSeries } =
    useGetSeriesTrendingByDay();
  const [carouselData, setCarouselData] = useState<CarouselData[]>([]);

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
        redirect: getFirstTrendingMovie?.id,
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
        redirect: getSecondTrendingMovie?.id,
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
        redirect: getFirstTrendingSeries?.id,
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
        redirect: getSecondTrendingSeries?.id,
        media_type: getSecondTrendingSeries?.media_type,
      },
    ];
    setCarouselData(dataCarousel);
    console.log(dataCarousel);
  }, [trendingMovie, trendingSeries]);

  return (
    <>
      {(loadingMovie || loadingSeries) && <Spin fullscreen size="large" />}
      <div>
        <DisplayCarousel carouselData={carouselData} />
      </div>
    </>
  );
}
