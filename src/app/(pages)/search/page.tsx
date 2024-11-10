"use client";

import { Spin } from "antd";
import { useAtom, useAtomValue } from "jotai";
import { useEffect, useState } from "react";

import { DisplayCards } from "@/components";
import { useSearch } from "@/services/hooks";
import { homeAtom, searchAtom } from "@/store";
import {
  ActionIcon,
  CastsIcon,
  CrimeIcon,
  FamilyIcon,
  FilmIcon,
  HistoryIcon,
  MusicIcon,
  NewsIcon,
  RomanceIcon,
  ScifiIcon,
  SeriesIcon,
} from "@/assets/icons";

export default function Search() {
  const home = useAtomValue(homeAtom);
  const [search, setSearch] = useAtom(searchAtom);
  const { data: searchResult, isLoading } = useSearch(search.query);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (home.trendingMovies.length === 0 || home.trendingSeries.length === 0) {
      setLoading(false);
    }
  }, [home]);

  useEffect(() => {
    if (searchResult) {
      setSearch({
        ...search,
        MovieResults: searchResult.movies.map((item) => {
          return {
            id: item.id,
            poster_path: item.poster_path,
            redirect: `/movies/${item.id}`,
            title: item.title,
            type: "movies",
          };
        }),
        SeriesResults: searchResult.series.map((item) => {
          return {
            id: item.id,
            poster_path: item.poster_path,
            redirect: `/series/${item.id}`,
            title: item.name,
            type: "series",
          };
        }),
        PeopleResults: searchResult.people.map((item) => {
          return {
            id: item.id,
            poster_path: item.profile_path,
            redirect: `/casts/${item.id}`,
            title: item.name,
            type: "people",
          };
        }),
      });
    }
  }, [searchResult]);

  const listCircle = [
    {
      icon: <FilmIcon className="w-5 h-5 fill-white" />,
      title: "Movies",
    },
    {
      icon: <SeriesIcon className="w-5 h-5 fill-white" />,
      title: "Series",
    },
    {
      icon: <CastsIcon className="w-5 h-5 fill-white" />,
      title: "Casts",
    },
    {
      icon: <ActionIcon className="w-5 h-5 fill-white" />,
      title: "Action",
    },
    {
      icon: <CrimeIcon className="w-5 h-5 fill-white" />,
      title: "Crime",
    },
    {
      icon: <FamilyIcon className="w-5 h-5 fill-white" />,
      title: "Family",
    },
    {
      icon: <HistoryIcon className="w-5 h-5 fill-white" />,
      title: "History",
    },
    {
      icon: <MusicIcon className="w-5 h-5 fill-white" />,
      title: "Music",
    },
    {
      icon: <NewsIcon className="w-5 h-5 fill-white" />,
      title: "News",
    },
    {
      icon: <RomanceIcon className="w-5 h-5 fill-white" />,
      title: "Romance",
    },
    {
      icon: <ScifiIcon className="w-5 h-5 fill-white" />,
      title: "Science Fiction",
    },
    {
      icon: <NewsIcon className="w-5 h-5 fill-white" />,
      title: "News",
    },
  ];

  return (
    <>
      {isLoading ? (
        <Spin fullscreen size="large" />
      ) : (
        <>
          {loading && <Spin fullscreen size="large" />}
          {search.MovieResults.length === 0 &&
          search.PeopleResults.length === 0 &&
          search.SeriesResults.length === 0 ? (
            <div className="mt-14 lg:mt-[72px] lg:hidden">
              {home.trendingMovies.length > 0 &&
              home.trendingSeries.length > 0 ? (
                <>
                  <DisplayCards
                    cardsData={home.trendingMovies}
                    redirect="/movies/trending"
                    setLoading={setLoading}
                    title="Top Chart Movies"
                  />
                  <DisplayCards
                    cardsData={home.trendingSeries}
                    redirect="/series/trending"
                    setLoading={setLoading}
                    title="Top Chart Series"
                  />
                </>
              ) : (
                <div className="grid grid-cols-4 p-2 gap-3 place-items-center">
                  {listCircle.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center place-content-center cursor-pointer gap-2 self-start"
                    >
                      <div className="rounded-full w-12 bg-gray-700 flex flex-col items-center place-content-center h-12">
                        {item.icon}
                      </div>
                      <p className="text-xs text-center w-14">{item.title}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="mt-14 lg:mt-[72px]">
              {search.MovieResults.length > 0 && (
                <DisplayCards
                  cardsData={search.MovieResults}
                  redirect={{
                    pathname: "/search/movies",
                    query: {
                      searchfor: search.query,
                    },
                  }}
                  setLoading={setLoading}
                  title={`Movies that Related to '${search.query}'`}
                />
              )}
              {search.SeriesResults.length > 0 && (
                <DisplayCards
                  cardsData={search.SeriesResults}
                  redirect={{
                    pathname: "/search/series",
                    query: {
                      searchfor: search.query,
                    },
                  }}
                  setLoading={setLoading}
                  title={`Series that Related to '${search.query}'`}
                />
              )}
              {search.PeopleResults.length > 0 && (
                <DisplayCards
                  cardsData={search.PeopleResults}
                  redirect={{
                    pathname: "/search/people",
                    query: {
                      searchfor: search.query,
                    },
                  }}
                  setLoading={setLoading}
                  title={`People that Related to '${search.query}'`}
                />
              )}
            </div>
          )}
        </>
      )}
    </>
  );
}
