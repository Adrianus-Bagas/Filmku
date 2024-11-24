"use client";

import { ArrowLeftOutlined } from "@ant-design/icons";
import { ConfigProvider, Drawer, Tabs, message } from "antd";
import { getCookie } from "cookies-next";
import { useAtomValue } from "jotai";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";

import { CollapseComponent, CreditsListComponent, EpisodeDrawer } from ".";

import { isMobileScreenAtom } from "@/store";
import { useGetSeriesSeasonPage } from "@/services/hooks";
import { FilmIcon } from "@/assets/icons";

export const DrawerSeries = ({
  seasonNumber,
  setSeasonNumber,
  series_id,
  title,
}: {
  seasonNumber: string;
  setSeasonNumber: React.Dispatch<React.SetStateAction<string>>;
  series_id: string;
  title: string;
}) => {
  const { data, isIdle, isPending, mutate } = useGetSeriesSeasonPage();
  const isMobileScreen = useAtomValue(isMobileScreenAtom);

  const [episodeNumber, setEpisodeNumber] = useState<string>("");

  useEffect(() => {
    if (series_id && seasonNumber) {
      mutate(
        {
          season_number: seasonNumber,
          series_id,
          user_token: getCookie("access_token") || "",
        },
        {
          onError: () => {
            message.info("Refresh...");
            window.location.reload();
          },
        },
      );
    }
  }, [series_id, seasonNumber]);

  const TabItems = () => {
    return ["Episodes", "Credits"].map((item, index) => {
      return {
        label: <p className="font-bold">{item}</p>,
        key: index.toString(),
        children: (
          <>
            {item === "Credits" ? (
              <CreditsListComponent
                dataCast={data ? data.credits.cast : []}
                dataCrew={data ? data.credits.crew : []}
              />
            ) : (
              <CollapseComponent
                episodes={data ? data.seasonDetail.episodes : []}
                setEpisodeNumber={setEpisodeNumber}
              />
            )}
          </>
        ),
      };
    });
  };

  return (
    <>
      <EpisodeDrawer
        episodeNumber={episodeNumber}
        seasonNumber={seasonNumber}
        series_id={series_id}
        setEpisodeNumber={setEpisodeNumber}
        title={title}
      />
      <Drawer
        closeIcon={<ArrowLeftOutlined className="text-[24px] text-white" />}
        loading={isIdle || isPending}
        open={!!seasonNumber}
        style={{ color: "white", backgroundColor: "black" }}
        title={
          <Marquee pauseOnHover speed={35}>
            <p className="text-white">
              {title} Season {seasonNumber}&emsp;&emsp;&emsp;&emsp;&emsp;
            </p>
          </Marquee>
        }
        width={isMobileScreen ? "100%" : "50%"}
        onClose={() => setSeasonNumber("")}
      >
        {data && (
          <>
            <div className="flex items-center gap-3">
              {data.seasonDetail.poster_path ? (
                <Image
                  alt={data.seasonDetail.name}
                  className="w-[150px] h-[250px] md:w-[250px] md:h-[350px] rounded-lg cursor-pointer flex justify-center"
                  height={450}
                  src={`https://image.tmdb.org/t/p/original${data.seasonDetail.poster_path}`}
                  width={300}
                />
              ) : (
                <div className="flex flex-col place-content-center items-center text-center shrink-0 gap-3 p-2 cursor-pointer w-[150px] h-[250px] md:w-[250px] md:h-[350px] bg-slate-500 rounded-lg">
                  <FilmIcon className="w-6 h-6" />
                </div>
              )}
              <p>{data.seasonDetail.overview}</p>
            </div>
            <div className="my-4">
              <ConfigProvider
                theme={{
                  token: {
                    lineWidth: 5,
                  },
                  components: {
                    Tabs: {
                      itemColor: "white",
                      itemSelectedColor: "#364d79",
                      itemHoverColor: "#364d79",
                      inkBarColor: "#364d79",
                      lineWidth: 5,
                    },
                  },
                }}
              >
                <Tabs
                  centered
                  items={TabItems()}
                  size="middle"
                  tabPosition="top"
                />
              </ConfigProvider>
            </div>
          </>
        )}
      </Drawer>
    </>
  );
};
