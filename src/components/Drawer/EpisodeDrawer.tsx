"use client";

import { ArrowLeftOutlined } from "@ant-design/icons";
import { ConfigProvider, Drawer, Tabs, message } from "antd";
import { getCookie } from "cookies-next";
import { useAtomValue } from "jotai";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import dayjs from "dayjs";

import {
  CreditsListComponent,
  SimilarListComponent,
  VideoListComponent,
} from "../Display";

import { isMobileScreenAtom } from "@/store";
import {
  useGetSeriesEpisodePage,
  useGetSeriesEpisodeVideoPage,
} from "@/services/hooks";
import { CardData } from "@/interfaces";

export const EpisodeDrawer = ({
  seasonNumber,
  episodeNumber,
  setEpisodeNumber,
  series_id,
  title,
}: {
  seasonNumber: string;
  episodeNumber: string;
  setEpisodeNumber: React.Dispatch<React.SetStateAction<string>>;
  series_id: string;
  title: string;
}) => {
  const { data, isIdle, isPending, mutate } = useGetSeriesEpisodePage();
  const {
    data: listVideoAndSimilar,
    isPending: isPendingVideo,
    mutate: getVideos,
  } = useGetSeriesEpisodeVideoPage();
  const isMobileScreen = useAtomValue(isMobileScreenAtom);
  const [videoId, setVideoId] = useState<string>("");

  const similarCardData: CardData[] = listVideoAndSimilar
    ? listVideoAndSimilar.similar.map((item) => {
        return {
          id: item.id,
          poster_path: item.poster_path,
          redirect: `series/${item.id}`,
          title: item.name,
          type: "series",
        };
      })
    : [];

  useEffect(() => {
    if (series_id && seasonNumber && episodeNumber) {
      mutate(
        {
          season_number: seasonNumber,
          series_id,
          episode_number: episodeNumber,
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
  }, [series_id, seasonNumber, episodeNumber]);

  useEffect(() => {
    if (videoId) {
      getVideos(
        {
          season_number: seasonNumber,
          series_id,
          episode_number: episodeNumber,
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
  }, [videoId]);

  const listTabs = videoId
    ? ["Videos", "Credits", "Similar"]
    : ["Videos", "Credits"];

  const TabItems = () => {
    return listTabs.map((item, index) => {
      return {
        label: <p className="font-bold">{item}</p>,
        key: index.toString(),
        children: (
          <>
            {item === "Credits" ? (
              <CreditsListComponent
                isGuestStar
                dataCast={data ? data.episodeDetail.guest_stars : []}
                dataCrew={data ? data.episodeDetail.crew : []}
              />
            ) : item === "Similar" ? (
              <SimilarListComponent similarData={similarCardData} />
            ) : (
              <VideoListComponent
                id={series_id}
                setVideoId={setVideoId}
                type="series"
                videoId={videoId}
                videos={data ? data.videos : []}
              />
            )}
          </>
        ),
      };
    });
  };

  return (
    <>
      <Drawer
        closeIcon={<ArrowLeftOutlined className="text-[24px] text-white" />}
        loading={isIdle || isPending || isPendingVideo}
        open={!!episodeNumber}
        style={{ color: "white", backgroundColor: "black" }}
        styles={{
          body: {
            padding: 0,
          },
        }}
        title={
          <Marquee pauseOnHover speed={35}>
            <p className="text-white">
              {title} Season {seasonNumber} Episode {episodeNumber}
              &emsp;&emsp;&emsp;&emsp;&emsp;
            </p>
          </Marquee>
        }
        width={isMobileScreen ? "100%" : "50%"}
        onClose={() => {
          setEpisodeNumber("");
          setVideoId("");
        }}
      >
        {data && (
          <>
            <div className="relative h-[200px] lg:h-[300px] text-[#fff] bg-black">
              {videoId ? (
                <iframe
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  className="lg:my-3 w-full h-[200px] lg:h-[300px]"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title="Embedded youtube"
                />
              ) : data.episodeDetail.still_path ? (
                <Image
                  alt={data.episodeDetail.name}
                  className="object-cover object-center h-[200px] lg:h-[300px] w-full"
                  height={500}
                  src={`https://image.tmdb.org/t/p/original${data.episodeDetail.still_path}`}
                  width={1000}
                />
              ) : null}
              {!videoId && (
                <div className="absolute top-0 left-0 bg-gradient-to-r from-black w-full h-full flex items-center">
                  <div className="w-full">
                    <p className="text-base text-center lg:text-3xl">
                      {data.episodeDetail.name}
                    </p>
                    <p className="text-xs text-center lg:text-base">
                      {dayjs(data.episodeDetail.air_date).format(
                        "DD MMMM YYYY",
                      )}{" "}
                      | {data.episodeDetail.runtime} minutes
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="text-justify text-sm p-2 lg:text-base">
              <p>{data.episodeDetail.overview}</p>
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
