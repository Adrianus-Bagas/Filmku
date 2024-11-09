"use client";

import React from "react";
import { ConfigProvider, Spin, Tabs } from "antd";
import dayjs from "dayjs";
import Image from "next/image";

import { FavoriteIcon, WatchlistsIcon } from "@/assets/icons";
import { CardData, ResponseMovieDetailInterface } from "@/interfaces";
import {
  VideoListComponent,
  SimilarListComponent,
  CreditsListComponent,
  ModalLogin,
  ModalConfirm,
} from "@/components";

export const DisplayDetail = ({
  data,
  isIdle,
  isPending,
  isLoadingAdd,
  isLoadingDelete,
  handleWatchlistButton,
  handleFavoriteButton,
  openModalLogin,
  setOpenModalLogin,
  openModalWatchlist,
  setOpenModalWatchlist,
  openModalFavorite,
  setOpenModalFavorite,
}: {
  data: ResponseMovieDetailInterface;
  isPending: boolean;
  isIdle: boolean;
  isLoadingAdd: boolean;
  isLoadingDelete: boolean;
  handleWatchlistButton: () => void;
  handleFavoriteButton: () => void;
  openModalLogin: boolean;
  setOpenModalLogin: React.Dispatch<React.SetStateAction<boolean>>;
  openModalWatchlist: boolean;
  setOpenModalWatchlist: React.Dispatch<React.SetStateAction<boolean>>;
  openModalFavorite: boolean;
  setOpenModalFavorite: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const similarCardData: CardData[] = data.similar.map((item) => {
    return {
      id: item.id,
      poster_path: item.poster_path,
      redirect: `movies/${item.id}`,
      title: item.title,
      type: "movies",
    };
  });

  const AddFavoriteWatchlistComponent = () => {
    return (
      <>
        <div
          className="flex items-center p-3 bg-[#364d79] w-fit rounded-lg cursor-pointer transition duration-300 ease-in-out hover:opacity-70"
          onClick={() => setOpenModalFavorite(true)}
        >
          <FavoriteIcon className="h-3 w-3 fill-white" />
          <p className="pl-2">
            {data.favoriteId ? "Remove from\n Favorites" : "Add to\n Favorites"}
          </p>
        </div>
        <div
          className="flex items-center p-3 bg-[#364d79] w-fit rounded-lg cursor-pointer transition duration-300 ease-in-out hover:opacity-70"
          onClick={() => setOpenModalWatchlist(true)}
        >
          <WatchlistsIcon className="h-3 w-3 fill-white" />
          <p className="pl-2">
            {data.watchlistId
              ? "Remove from\n Watchlist"
              : "Add to\n Watchlist"}
          </p>
        </div>
      </>
    );
  };

  const TabItems = () => {
    return ["Videos", "Similar", "Credits"].map((item, index) => {
      return {
        label: <p className="font-bold">{item}</p>,
        key: index.toString(),
        children: (
          <>
            {item === "Videos" ? (
              <VideoListComponent
                movieId={data.detail.id.toString()}
                videos={data.videos}
              />
            ) : item === "Similar" ? (
              <SimilarListComponent similarData={similarCardData} />
            ) : (
              <CreditsListComponent
                dataCast={data.credits.cast}
                dataCrew={data.credits.crew}
              />
            )}
          </>
        ),
      };
    });
  };

  return (
    <>
      {isPending || isIdle || isLoadingAdd || isLoadingDelete ? (
        <Spin fullscreen size="large" />
      ) : (
        <>
          <ModalLogin
            openModalLogin={openModalLogin}
            setOpenModalLogin={setOpenModalLogin}
          />
          <ModalConfirm
            openModal={openModalWatchlist}
            setOpenModal={setOpenModalWatchlist}
            onConfirm={handleWatchlistButton}
          />
          <ModalConfirm
            openModal={openModalFavorite}
            setOpenModal={setOpenModalFavorite}
            onConfirm={handleFavoriteButton}
          />
          <div className="mt-14 lg:mt-[72px]">
            <div className="relative h-[150px] lg:h-[500px] text-[#fff] bg-black">
              <Image
                alt={data.detail.title}
                className="object-cover object-center h-[150px] lg:h-[500px] w-full"
                height={500}
                src={`https://image.tmdb.org/t/p/original${data.detail.backdrop_path}`}
                width={1000}
              />
              <div className="absolute top-0 left-0 bg-gradient-to-r from-black w-full h-full flex items-center">
                <div className="w-full lg:ml-20">
                  <p className="text-base text-center lg:text-3xl lg:text-start">
                    {data.detail.title}
                  </p>
                  <p className="text-xs text-center lg:text-base lg:text-start lg:my-2">
                    {dayjs(data.detail.release_date).year()} |{" "}
                    {data.detail.genres.map((i) => i.name).join(",")}
                  </p>
                  <div className="hidden lg:inline-block lg:w-1/2 lg:my-3">
                    <p className="break-words">{data.detail.overview}</p>
                  </div>
                  <div className="hidden lg:flex lg:gap-2 lg:my-2">
                    <AddFavoriteWatchlistComponent />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-justify text-sm p-2 lg:hidden">
            <p>{data.detail.overview}</p>
            <div className="flex w-full justify-center gap-2 my-2 lg:hidden">
              <AddFavoriteWatchlistComponent />
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
                items={TabItems()}
                size="large"
                style={{ padding: "40px" }}
                tabBarStyle={{ height: "fit-content" }}
                tabPosition="left"
              />
              <Tabs
                centered
                className="lg:hidden"
                items={TabItems()}
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
