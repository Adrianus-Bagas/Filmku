import type { CSSProperties } from "react";
import type { CollapseProps } from "antd";

import React from "react";
import { Collapse, theme } from "antd";
import Image from "next/image";
import dayjs from "dayjs";

import { SeriesEpisodesInterface } from "@/interfaces";
import { FilmIcon } from "@/assets/icons";

export const CollapseComponent = ({
  episodes,
  setEpisodeNumber,
}: {
  episodes: SeriesEpisodesInterface[];
  setEpisodeNumber: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { token } = theme.useToken();

  const getItems: (panelStyle: CSSProperties) => CollapseProps["items"] = (
    panelStyle,
  ) => {
    return episodes.map((item) => {
      return {
        key: item.id,
        label: `Episode ${item.episode_number} : ${item.name}`,
        children: (
          <>
            <div className="flex flex-col gap-3">
              {item.still_path ? (
                <Image
                  alt={item.name}
                  className="object-cover object-center h-[150px] lg:h-[300px] w-full"
                  height={500}
                  src={`https://image.tmdb.org/t/p/original${item.still_path}`}
                  width={1000}
                />
              ) : (
                <div
                  key={item.id}
                  className="flex flex-col place-content-center items-center text-center shrink-0 gap-3 p-2 cursor-pointer w-[295.33px] lg:w-[560px] h-[150px] lg:h-[300px] bg-slate-500 rounded-lg"
                >
                  <FilmIcon className="w-6 h-6" />
                </div>
              )}
              <div>
                <p>
                  Air Date :{" "}
                  {item.air_date
                    ? dayjs(item.air_date).format("DD MMMM YYYY")
                    : "-"}
                </p>
                <p>
                  Runtime : {item.runtime ? `${item.runtime} minutes` : "-"}
                </p>
                <p>Overview : {item.overview ? item.overview : "-"}</p>
              </div>
              <div
                className="bg-blue-500 mt-2 text-white border-[1px] w-fit p-2 rounded-lg text-xs border-gray-200 cursor-pointer transition duration-300 ease-in-out hover:opacity-70"
                onClick={() => setEpisodeNumber(item.episode_number.toString())}
              >
                Watch Now
              </div>
            </div>
          </>
        ),
        style: panelStyle,
      };
    });
  };

  const panelStyle: React.CSSProperties = {
    borderRadius: token.borderRadiusLG,
    border: "none",
    backgroundColor: "white",
    marginTop: "4px",
  };

  return <Collapse accordion bordered={false} items={getItems(panelStyle)} />;
};
