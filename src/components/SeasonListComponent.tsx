"use client";

import Image from "next/image";
import dayjs from "dayjs";
import React from "react";

import { SeriesSeasonInterface } from "@/interfaces";
import { FilmIcon } from "@/assets/icons";

export const SeasonListComponent = ({
  seasons,
  setSeasonNumber,
}: {
  seasons: SeriesSeasonInterface[];
  setSeasonNumber: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <>
      <div>
        {seasons.map((item) => (
          <div
            key={item.id}
            className={`flex justify-start gap-3 items-center cursor-pointer hover:bg-gray-900 transition duration-300 ease-in-out my-3 p-3 focus:bg-gray-900`}
            onClick={() => setSeasonNumber(item.season_number.toString())}
          >
            {item.poster_path ? (
              <Image
                alt={item.name}
                className="w-[150px] h-[250px] md:w-[250px] md:h-[350px] rounded-lg cursor-pointer flex justify-center"
                height={450}
                src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                width={300}
              />
            ) : (
              <div
                key={item.id}
                className="flex flex-col place-content-center items-center text-center shrink-0 gap-3 p-2 cursor-pointer w-[150px] h-[250px] md:w-[250px] md:h-[350px] bg-slate-500 rounded-lg"
              >
                <FilmIcon className="w-6 h-6" />
              </div>
            )}
            <div>
              <p className="text-white text-base font-bold">
                {item.name} ({dayjs(item.air_date).year()})
              </p>
              <p className="text-white">{item.overview}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
