"use client";

import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import {
  PeopleCastMovieInterface,
  PeopleCastSeriesInterface,
} from "@/interfaces";
import { FilmIcon } from "@/assets/icons";

export const PeopleCreditCastComponent = ({
  currentPageMovies,
  setCurrentPageMovies,
  currentPageSeries,
  setCurrentPageSeries,
  data,
}: {
  currentPageMovies: number;
  setCurrentPageMovies: React.Dispatch<React.SetStateAction<number>>;
  currentPageSeries: number;
  setCurrentPageSeries: React.Dispatch<React.SetStateAction<number>>;
  data: {
    movie: PeopleCastMovieInterface[];
    tv: PeopleCastSeriesInterface[];
  };
}) => {
  const router = useRouter();
  const [view, setView] = useState<"movies" | "series">("movies");

  return (
    <>
      <div className="flex justify-center items-center gap-4 my-4">
        <div
          className={`${view === "movies" ? "bg-blue-500 text-white" : "bg-white text-gray-700"} border-[1px] w-fit p-2 rounded-lg text-xs border-gray-200 cursor-pointer`}
          onClick={() => {
            setView("movies");
          }}
        >
          Movies
        </div>
        <div
          className={`${view === "series" ? "bg-blue-500 text-white" : "bg-white text-gray-700"} border-[1px] w-fit p-2 rounded-lg text-xs border-gray-200 cursor-pointer`}
          onClick={() => {
            setView("series");
          }}
        >
          Series
        </div>
      </div>
      {view === "movies" && data.movie.length > 0 ? (
        <div>
          <div className="flex justify-between items-center text-sm text-white">
            <div
              className={`flex items-center gap-2 ${currentPageMovies === 1 && "cursor-not-allowed opacity-50"}`}
              onClick={() =>
                currentPageMovies > 1
                  ? setCurrentPageMovies((prev) => prev - 1)
                  : null
              }
            >
              <ArrowLeftOutlined />
              <p>Previous Page</p>
            </div>
            <div
              className={`flex items-center gap-2 ${(currentPageMovies - 1) * 3 + 3 >= data.movie.length && "cursor-not-allowed opacity-50"}`}
              onClick={() =>
                (currentPageMovies - 1) * 3 + 3 < data.movie.length
                  ? setCurrentPageMovies((prev) => prev + 1)
                  : null
              }
            >
              <p>Next Page</p>
              <ArrowRightOutlined />
            </div>
          </div>
          {data.movie
            .slice((currentPageMovies - 1) * 3, (currentPageMovies - 1) * 3 + 3)
            .map((item, index) => (
              <div
                key={index}
                className={`flex justify-between items-center my-3 py-3 cursor-pointer`}
                onClick={() => router.push(`/movies/${item.id}`)}
              >
                <div className="flex justify-start gap-3 items-center px-1">
                  {item.backdrop_path ? (
                    <Image
                      alt={item.title}
                      className="w-[150px] md:w-[200px]"
                      height={200}
                      src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
                      width={200}
                    />
                  ) : (
                    <div
                      key={index}
                      className="flex flex-col place-content-center items-center text-center shrink-0 gap-3 p-2 cursor-pointer w-[150px] md:w-[200px] h-[84.38px] bg-slate-500 rounded-lg"
                    >
                      <FilmIcon className="w-6 h-6" />
                    </div>
                  )}
                  <div>
                    <p className="text-white">{item.title}</p>
                    <p className="text-white">as {item.character}</p>
                    <p className="text-white text-xs">
                      {item.release_date
                        ? dayjs(item.release_date).format("DD MMM YYYY")
                        : "-"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      ) : view === "series" && data.tv.length > 0 ? (
        <div>
          <div className="flex justify-between items-center text-sm text-white">
            <div
              className={`flex items-center gap-2 ${currentPageSeries === 1 && "cursor-not-allowed opacity-50"}`}
              onClick={() =>
                currentPageSeries > 1
                  ? setCurrentPageSeries((prev) => prev - 1)
                  : null
              }
            >
              <ArrowLeftOutlined />
              <p>Previous Page</p>
            </div>
            <div
              className={`flex items-center gap-2 ${(currentPageSeries - 1) * 3 + 3 >= data.tv.length && "cursor-not-allowed opacity-50"}`}
              onClick={() =>
                (currentPageSeries - 1) * 3 + 3 < data.tv.length
                  ? setCurrentPageSeries((prev) => prev + 1)
                  : null
              }
            >
              <p>Next Page</p>
              <ArrowRightOutlined />
            </div>
          </div>
          {data.tv
            .slice((currentPageSeries - 1) * 3, (currentPageSeries - 1) * 3 + 3)
            .map((item, index) => (
              <div
                key={index}
                className={`flex justify-between items-center my-3 py-3 cursor-pointer`}
                onClick={() => router.push(`/series/${item.id}`)}
              >
                <div className="flex justify-start gap-3 items-center px-1">
                  {item.backdrop_path ? (
                    <Image
                      alt={item.name}
                      className="w-[150px] md:w-[200px]"
                      height={200}
                      src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
                      width={200}
                    />
                  ) : (
                    <div
                      key={index}
                      className="flex flex-col place-content-center items-center text-center shrink-0 gap-3 p-2 cursor-pointer w-[150px] md:w-[200px] h-[84.38px] bg-slate-500 rounded-lg"
                    >
                      <FilmIcon className="w-6 h-6" />
                    </div>
                  )}
                  <div>
                    <p className="text-white">{item.name}</p>
                    <p className="text-white">as {item.character}</p>
                    <p className="text-white text-xs">
                      {item.first_air_date
                        ? dayjs(item.first_air_date).format("DD MMM YYYY")
                        : "-"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="flex flex-col items-center opacity-50 text-white">
          <p>No Data Found</p>
        </div>
      )}
    </>
  );
};
