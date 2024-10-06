"use client";

import { Spin } from "antd";
import { useAtom, useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { DisplayCards } from "@/components";
import {
  MovieListInterface,
  PeopleListInterface,
  SeriesListInterface,
} from "@/interfaces";
import { useSearch } from "@/services/hooks";
import { homeAtom, searchAtom } from "@/store";

export default function Search() {
  const home = useAtomValue(homeAtom);
  const [search, setSearch] = useAtom(searchAtom);
  const { data: searchResult, isLoading } = useSearch(search.query);
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();

  useEffect(() => {
    if (home.trendingMovies.length === 0 || home.trendingSeries.length === 0) {
      router.replace("/home");
    }
  }, [router]);

  useEffect(() => {
    if (searchResult) {
      setSearch({
        ...search,
        MovieResults: (
          searchResult.filter(
            (i) => i.media_type === "movie",
          ) as MovieListInterface[]
        ).map((item) => {
          return {
            id: item.id,
            poster_path: item.poster_path,
            redirect: `/movies/${item.id}`,
            title: item.title,
            type: "movies",
          };
        }),
        SeriesResults: (
          searchResult.filter(
            (i) => i.media_type === "tv",
          ) as SeriesListInterface[]
        ).map((item) => {
          return {
            id: item.id,
            poster_path: item.poster_path,
            redirect: `/series/${item.id}`,
            title: item.name,
            type: "series",
          };
        }),
        PeopleResults: (
          searchResult.filter(
            (i) => i.media_type === "person",
          ) as PeopleListInterface[]
        ).map((item) => {
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
                  redirect="/search/people"
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
