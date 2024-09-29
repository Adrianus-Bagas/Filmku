"use client";

import { ConfigProvider, Spin, Tabs } from "antd";
import dayjs from "dayjs";
import Image from "next/image";

import { FavoriteIcon, WatchlistsIcon } from "@/assets/icons";
import { MovieDetailInterface } from "@/interfaces";
import {
  useGetMoviesCredits,
  useGetMoviesSimilar,
  useGetMoviesVideos,
} from "@/services/hooks";
import {
  VideoListComponent,
  SimilarListComponent,
  CreditsListComponent,
} from "@/components";

export const DisplayDetail = ({ data }: { data: MovieDetailInterface }) => {
  const { data: videoData, isLoading: loadingVideo } = useGetMoviesVideos(
    data.id.toString(),
  );
  const { data: similarData, isLoading: loadingSimilar } = useGetMoviesSimilar(
    data.id.toString(),
  );
  const {
    dataCast,
    dataCrew,
    isLoading: loadingCredits,
  } = useGetMoviesCredits(data.id.toString());

  return (
    <>
      {loadingVideo || loadingSimilar || loadingCredits ? (
        <Spin fullscreen size="large" />
      ) : (
        <>
          <div className="mt-14 lg:mt-[72px]">
            <div className="relative h-[150px] lg:h-[500px] text-[#fff] bg-black">
              <Image
                alt={data.title}
                className="object-cover object-center h-[150px] lg:h-[500px] w-full"
                height={500}
                src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
                width={1000}
              />
              <div className="absolute top-0 left-0 bg-gradient-to-r from-black w-full h-full flex items-center">
                <div className="w-full lg:ml-20">
                  <p className="text-base text-center lg:text-3xl lg:text-start">
                    {data.title}
                  </p>
                  <p className="text-xs text-center lg:text-base lg:text-start lg:my-2">
                    {dayjs(data.release_date).year()} |{" "}
                    {data.genres.map((i) => i.name).join(",")}
                  </p>
                  <div className="hidden lg:inline-block lg:w-1/2 lg:my-3">
                    <p className="break-words">{data.overview}</p>
                  </div>
                  <div className="hidden lg:flex lg:gap-2 lg:my-2">
                    <div className="flex items-center p-3 bg-[#364d79] w-fit rounded-lg cursor-pointer transition duration-300 ease-in-out hover:opacity-70">
                      <FavoriteIcon className="h-3 w-3 fill-white" />
                      <p className="pl-3">Add to Favorites</p>
                    </div>
                    <div className="flex items-center p-3 bg-[#364d79] w-fit rounded-lg cursor-pointer transition duration-300 ease-in-out hover:opacity-70">
                      <WatchlistsIcon className="h-3 w-3 fill-white" />
                      <p className="pl-3">Add to Watchlist</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-justify text-sm p-2 lg:hidden">
            <p>{data.overview}</p>
            <div className="flex justify-center gap-2 my-2 lg:hidden">
              <div className="flex items-center p-3 bg-[#364d79] w-fit rounded-lg cursor-pointer transition duration-300 ease-in-out hover:opacity-70">
                <FavoriteIcon className="h-3 w-3 fill-white" />
                <p className="pl-3">Add to Favorites</p>
              </div>
              <div className="flex items-center p-3 bg-[#364d79] w-fit rounded-lg cursor-pointer transition duration-300 ease-in-out hover:opacity-70">
                <WatchlistsIcon className="h-3 w-3 fill-white" />
                <p className="pl-3">Add to Watchlist</p>
              </div>
            </div>
          </div>
          <div className="lg:px-10 lg:py-5">
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
                className="hidden lg:flex"
                items={["Videos", "Similar", "Credits"].map((item, index) => {
                  return {
                    label: <p className="font-bold">{item}</p>,
                    key: index.toString(),
                    children: (
                      <>
                        {item === "Videos" ? (
                          <VideoListComponent
                            movieId={data.id.toString()}
                            videos={videoData}
                          />
                        ) : item === "Similar" ? (
                          <SimilarListComponent similarData={similarData} />
                        ) : (
                          <CreditsListComponent
                            dataCast={dataCast}
                            dataCrew={dataCrew}
                          />
                        )}
                      </>
                    ),
                  };
                })}
                size="large"
                style={{ padding: "40px" }}
                tabBarStyle={{ height: "fit-content" }}
                tabPosition="left"
              />
              <Tabs
                centered
                className="lg:hidden"
                items={["Videos", "Similar", "Credits"].map((item, index) => {
                  return {
                    label: <p className="font-bold">{item}</p>,
                    key: index.toString(),
                    children: (
                      <>
                        {item === "Videos" ? (
                          <VideoListComponent
                            movieId={data.id.toString()}
                            videos={videoData}
                          />
                        ) : item === "Similar" ? (
                          <SimilarListComponent similarData={similarData} />
                        ) : (
                          <CreditsListComponent
                            dataCast={dataCast}
                            dataCrew={dataCrew}
                          />
                        )}
                      </>
                    ),
                  };
                })}
                size="middle"
                tabPosition="top"
              />
            </ConfigProvider>
          </div>
        </>
      )}
    </>
  );
};
