"use client";

import { Spin } from "antd";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { useAtom } from "jotai";

import { DisplayCarousel, DisplayCards, ModalNotification } from "@/components";
import {
  CardData,
  CarouselData,
  MovieListInterface,
  SeriesListInterface,
} from "@/interfaces";
import { findGenres, movieGenre, seriesGenre } from "@/utils";
import { useGetHome, useGetNotification } from "@/services/hooks";
import { homeAtom } from "@/store";

export default function Home() {
  const { data: homeList, isLoading: loadingHomeList } = useGetHome(
    getCookie("access_token") ?? "",
  );
  const { data: notification, isLoading: loadingNotification } =
    useGetNotification();
  const [home, setHome] = useAtom(homeAtom);
  const [loading, setLoading] = useState<boolean>(true);

  const getCardData = (
    isMovie: boolean,
    dataMovie: MovieListInterface[],
    dataSeries: SeriesListInterface[],
  ): CardData[] => {
    return isMovie
      ? dataMovie.map((movie) => {
          return {
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            redirect: "/movies/" + movie.id,
            type: "movies",
          };
        })
      : dataSeries.map((series) => {
          return {
            id: series.id,
            title: series.name,
            poster_path: series.poster_path,
            redirect: "/series/" + series.id,
            type: "series",
          };
        });
  };

  const getCarouselData = (
    trendingMovies: MovieListInterface[],
    trendingSeries: SeriesListInterface[],
  ): CarouselData[] => {
    return [
      ...trendingMovies.map((i) => {
        return {
          title: i?.title,
          overview: i?.overview,
          backdrop_path: i?.backdrop_path,
          genres: findGenres(movieGenre, i?.genre_ids as number[]),
          redirect: "/movies/" + i?.id,
          media_type: "movie",
        };
      }),
      ...trendingSeries.map((i) => {
        return {
          title: i?.name,
          overview: i?.overview,
          backdrop_path: i?.backdrop_path,
          genres: findGenres(seriesGenre, i?.genre_ids as number[]),
          redirect: "/series/" + i?.id,
          media_type: i?.media_type,
        };
      }),
    ];
  };

  useEffect(() => {
    if (homeList) {
      const getFirstTrendingMovie =
        homeList.trendingMovies[Math.floor(Math.random() * (9 - 0) + 0)];
      const getSecondTrendingMovie =
        homeList.trendingMovies[Math.floor(Math.random() * (19 - 10) + 10)];
      const getFirstTrendingSeries =
        homeList.trendingSeries[Math.floor(Math.random() * (9 - 0) + 0)];
      const getSecondTrendingSeries =
        homeList.trendingSeries[Math.floor(Math.random() * (19 - 10) + 10)];

      setHome({
        ...home,
        carouselData: getCarouselData(
          [getFirstTrendingMovie, getSecondTrendingMovie],
          [getFirstTrendingSeries, getSecondTrendingSeries],
        ),
        trendingMovies: getCardData(true, homeList.trendingMovies, []),
        trendingSeries: getCardData(false, [], homeList.trendingSeries),
        upcomingMovies: getCardData(true, homeList.upcomingMovies, []),
        upcomingSeries: getCardData(false, [], homeList.upcomingSeries),
        recommendMoviesByFavorite: getCardData(
          true,
          homeList.recommendMoviesByFavorite.data,
          [],
        ),
        recommendMoviesByHistory: getCardData(
          true,
          homeList.recommendMoviesByHistory.data,
          [],
        ),
        recommendMoviesByWatchlist: getCardData(
          true,
          homeList.recommendMoviesByWatchlist.data,
          [],
        ),
        recommendSeriesByFavorite: getCardData(
          false,
          [],
          homeList.recommendSeriesByFavorite.data,
        ),
        recommendSeriesByHistory: getCardData(
          false,
          [],
          homeList.recommendSeriesByHistory.data,
        ),
        recommendSeriesByWatchlist: getCardData(
          false,
          [],
          homeList.recommendSeriesByWatchlist.data,
        ),
      });
    }
  }, [homeList]);

  useEffect(() => {
    if (
      notification &&
      home.carouselData.length > 0 &&
      !home.notifAlreadyShown
    ) {
      setHome({
        ...home,
        openModalNotif: true,
        notifAlreadyShown: true,
      });
    }
  }, [notification, home]);

  return (
    <>
      {loadingHomeList || loadingNotification ? (
        <Spin fullscreen size="large" />
      ) : (
        <>
          {loading && <Spin fullscreen size="large" />}
          <DisplayCarousel
            carouselData={home.carouselData}
            setLoading={setLoading}
          />
          <DisplayCards
            cardsData={home.trendingMovies}
            redirect="/movies/trending"
            setLoading={setLoading}
            title="Trending Movies Today"
          />
          {home.recommendMoviesByHistory.length > 0 && (
            <DisplayCards
              cardsData={home.recommendMoviesByHistory}
              redirect="/movies/recommendations"
              setLoading={setLoading}
              title={homeList?.recommendMoviesByHistory.title || ""}
            />
          )}
          <DisplayCards
            cardsData={home.trendingSeries}
            redirect="/series/trending"
            setLoading={setLoading}
            title="Trending Series Today"
          />
          {home.recommendSeriesByHistory.length > 0 && (
            <DisplayCards
              cardsData={home.recommendSeriesByHistory}
              redirect="/series/recommendations"
              setLoading={setLoading}
              title={homeList?.recommendSeriesByHistory.title || ""}
            />
          )}
          <DisplayCards
            cardsData={home.upcomingMovies}
            redirect="/movies/upcoming"
            setLoading={setLoading}
            title="Upcoming Movies"
          />
          {home.recommendMoviesByWatchlist.length > 0 && (
            <DisplayCards
              cardsData={home.recommendMoviesByWatchlist}
              redirect="/movies/recommendations"
              setLoading={setLoading}
              title={homeList?.recommendMoviesByWatchlist.title || ""}
            />
          )}
          <DisplayCards
            cardsData={home.upcomingSeries}
            redirect="/series/upcoming"
            setLoading={setLoading}
            title="Upcoming Series (Air in the next 7 days)"
          />
          {home.recommendSeriesByFavorite.length > 0 && (
            <DisplayCards
              cardsData={home.recommendSeriesByFavorite}
              redirect="/series/recommendations"
              setLoading={setLoading}
              title={homeList?.recommendSeriesByFavorite.title || ""}
            />
          )}
          {notification && (
            <ModalNotification
              isModalOpen={home.openModalNotif}
              notification={notification}
              setIsModalOpen={() => setHome({ ...home, openModalNotif: false })}
            />
          )}
        </>
      )}
    </>
  );
}
