"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import dayjs from "dayjs";

import { SeriesSeasonInterface } from "@/interfaces";

export const SeasonListComponent = ({
  seasons,
  series_id,
}: {
  seasons: SeriesSeasonInterface[];
  series_id: string;
}) => {
  const router = useRouter();

  return (
    <>
      <div>
        {seasons.map((item) => (
          <div
            key={item.id}
            className={`flex justify-start gap-3 items-center cursor-pointer hover:bg-gray-900 transition duration-300 ease-in-out my-3 p-3 focus:bg-gray-900`}
            onClick={() =>
              router.push(`/series/${series_id}/season/${item.season_number}`)
            }
          >
            <Image
              alt={item.name}
              className="w-[150px] h-[250px] md:w-[250px] md:h-[350px] rounded-lg cursor-pointer flex justify-center"
              height={450}
              src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
              width={300}
            />
            <div>
              <p className="text-white text-base font-bold">
                {item.name} ({dayjs(item.air_date).format("DD/MM/YYYY")})
              </p>
              <p className="text-white">{item.overview}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
