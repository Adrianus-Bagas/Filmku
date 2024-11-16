"use client";

import { Spin } from "antd";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { DisplayCards } from "@/components";
import { useSearch } from "@/services/hooks";
import { searchAtom } from "@/store";

export default function Search() {
  const [search, setSearch] = useAtom(searchAtom);
  const { data: searchResult, isLoading } = useSearch(search.query);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    if (!search.query && !searchResult) {
      router.replace("/");
    }
  }, [search.query, router, searchResult]);

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

  return (
    <>
      {isLoading ? (
        <Spin fullscreen size="large" />
      ) : (
        <>
          {loading && <Spin fullscreen size="large" />}
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
        </>
      )}
    </>
  );
}
