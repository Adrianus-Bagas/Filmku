"use client";

import { Spin } from "antd";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";

import { DisplayCarousel, DisplayCards } from "@/components";
import { CardData } from "@/interfaces";
import { findGenres, seriesGenre } from "@/utils";
import { useGetSeries } from "@/services/hooks";
import { seriesAtom } from "@/store";

export default function Series() {
  const { data: seriesList, isLoading } = useGetSeries();

  const [series, setSeries] = useAtom(seriesAtom);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getFirstSeries =
      seriesList.nowPlaying[Math.floor(Math.random() * (9 - 0) + 0)];
    const getSecondSeries =
      seriesList.popular[Math.floor(Math.random() * (19 - 10) + 10)];
    const getThirdSeries =
      seriesList.topRated[Math.floor(Math.random() * (9 - 0) + 0)];

    const dataCarousel = [
      {
        title: getFirstSeries?.name,
        overview: getFirstSeries?.overview,
        backdrop_path: getFirstSeries?.backdrop_path,
        genres: findGenres(seriesGenre, getFirstSeries?.genre_ids as number[]),
        redirect: "/series/" + getFirstSeries?.id,
        media_type: "series",
      },
      {
        title: getSecondSeries?.name,
        overview: getSecondSeries?.overview,
        backdrop_path: getSecondSeries?.backdrop_path,
        genres: findGenres(seriesGenre, getSecondSeries?.genre_ids as number[]),
        redirect: "/series/" + getSecondSeries?.id,
        media_type: "series",
      },
      {
        title: getThirdSeries?.name,
        overview: getThirdSeries?.overview,
        backdrop_path: getThirdSeries?.backdrop_path,
        genres: findGenres(seriesGenre, getThirdSeries?.genre_ids as number[]),
        redirect: "/series/" + getThirdSeries?.id,
        media_type: "series",
      },
    ];
    const dataCardSeriesNowPlaying: CardData[] = seriesList.nowPlaying?.map(
      (series) => {
        return {
          id: series.id,
          title: series.name,
          poster_path: series?.poster_path,
          redirect: "/series/" + series?.id,
          type: "series",
        };
      },
    );
    const dataCardSeriesPopular: CardData[] = seriesList.popular?.map(
      (series) => {
        return {
          id: series.id,
          title: series.name,
          poster_path: series?.poster_path,
          redirect: "/series/" + series?.id,
          type: "series",
        };
      },
    );
    const dataCardSeriesTopRated: CardData[] = seriesList.topRated?.map(
      (series) => {
        return {
          id: series.id,
          title: series.name,
          poster_path: series?.poster_path,
          redirect: "/series/" + series?.id,
          type: "series",
        };
      },
    );

    setSeries({
      ...series,
      carouselData: dataCarousel,
      nowPlaying: dataCardSeriesNowPlaying,
      popular: dataCardSeriesPopular,
      topRated: dataCardSeriesTopRated,
    });
  }, [seriesList]);

  return (
    <>
      {isLoading ? (
        <Spin fullscreen size="large" />
      ) : (
        <>
          {loading && <Spin fullscreen size="large" />}
          <DisplayCarousel
            carouselData={series.carouselData}
            setLoading={setLoading}
          />
          <DisplayCards
            cardsData={series.nowPlaying}
            redirect="/series/now_playing"
            setLoading={setLoading}
            title="Now Playing Series"
          />
          <DisplayCards
            cardsData={series.popular}
            redirect="/series/popular"
            setLoading={setLoading}
            title="Popular Series"
          />
          <DisplayCards
            cardsData={series.topRated}
            redirect="/series/top_rated"
            setLoading={setLoading}
            title="Top Rated Series"
          />
        </>
      )}
    </>
  );
}
