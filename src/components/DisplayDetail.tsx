"use client";

import React from "react";
import { ConfigProvider, Spin, Tabs } from "antd";
import dayjs from "dayjs";
import Image from "next/image";
import {
  CheckCircleFilled,
  CommentOutlined,
  LikeOutlined,
  MenuOutlined,
} from "@ant-design/icons";

import {
  CardData,
  MovieListInterface,
  ResponseMovieDetailInterface,
  ResponseSeriesDetailInterface,
  SeriesListInterface,
} from "@/interfaces";
import {
  VideoListComponent,
  SimilarListComponent,
  CreditsListComponent,
  ModalLogin,
  ModalConfirm,
  ModalReview,
  SeasonListComponent,
} from "@/components";

export const DisplayDetail = ({
  data,
  isIdle,
  isPending,
  isLoadingAdd,
  isLoadingDelete,
  handleWatchlistButton,
  handleFavoriteButton,
  handleReviewButton,
  openModalLogin,
  setOpenModalLogin,
  openModalWatchlist,
  setOpenModalWatchlist,
  openModalFavorite,
  setOpenModalFavorite,
  openModalReview,
  setOpenModalReview,
  type,
  content,
  setContent,
}: {
  data: ResponseMovieDetailInterface | ResponseSeriesDetailInterface;
  isPending: boolean;
  isIdle: boolean;
  isLoadingAdd: boolean;
  isLoadingDelete: boolean;
  handleWatchlistButton: () => void;
  handleFavoriteButton: () => void;
  handleReviewButton: (
    action: "add" | "edit" | "delete",
    reviewId?: string,
  ) => void;
  openModalLogin: boolean;
  setOpenModalLogin: React.Dispatch<React.SetStateAction<boolean>>;
  openModalWatchlist: boolean;
  setOpenModalWatchlist: React.Dispatch<React.SetStateAction<boolean>>;
  openModalFavorite: boolean;
  setOpenModalFavorite: React.Dispatch<React.SetStateAction<boolean>>;
  openModalReview: boolean;
  setOpenModalReview: React.Dispatch<React.SetStateAction<boolean>>;
  type: "movies" | "series";
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const similarCardData: CardData[] = data.similar.map((item) => {
    return {
      id: item.id,
      poster_path: item.poster_path,
      redirect: `/${type}/${item.id}`,
      title:
        type === "movies"
          ? (item as MovieListInterface).title
          : (item as SeriesListInterface).name,
      type,
    };
  });

  const AddFavoriteWatchlistComponent = () => {
    return (
      <>
        <div
          className="flex flex-col items-center gap-2 p-3 w-fit rounded-lg cursor-pointer transition duration-300 ease-in-out hover:opacity-70"
          onClick={() => setOpenModalFavorite(true)}
        >
          {data.favoriteId ? (
            <CheckCircleFilled className="text-xl sm:text-4xl" />
          ) : (
            <LikeOutlined className="text-xl sm:text-4xl" />
          )}
          <p className="text-[10px] sm:text-sm">Favorites</p>
        </div>
        <div
          className="flex flex-col items-center gap-2 p-3 w-fit rounded-lg cursor-pointer transition duration-300 ease-in-out hover:opacity-70"
          onClick={() => setOpenModalWatchlist(true)}
        >
          {data.watchlistId ? (
            <CheckCircleFilled className="text-xl sm:text-4xl" />
          ) : (
            <MenuOutlined className="text-xl sm:text-4xl" />
          )}
          <p className="text-[10px] sm:text-sm">Watchlist</p>
        </div>
        <div
          className="flex flex-col items-center gap-2 p-3 w-fit rounded-lg cursor-pointer transition duration-300 ease-in-out hover:opacity-70"
          onClick={() => setOpenModalReview(true)}
        >
          <CommentOutlined className="text-xl sm:text-4xl" />
          <p className="text-[10px] sm:text-sm">Reviews</p>
        </div>
      </>
    );
  };

  const listTabs =
    type === "movies"
      ? ["Videos", "Similar", "Credits"]
      : ["Videos", "Similar", "Credits", "Seasons"];

  const TabItems = () => {
    return listTabs.map((item, index) => {
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
            ) : item === "Credits" ? (
              <CreditsListComponent
                dataCast={data.credits.cast}
                dataCrew={data.credits.crew}
                type={type}
              />
            ) : (
              <SeasonListComponent
                seasons={(data as ResponseSeriesDetailInterface).detail.seasons}
                series_id={data.detail.id.toString()}
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
          <ModalReview
            content={content}
            handleReview={handleReviewButton}
            isModalOpen={openModalReview}
            reviewList={data.reviews}
            setContent={setContent}
            setIsModalOpen={setOpenModalReview}
          />
          <div className="mt-14 lg:mt-[72px]">
            <div className="relative h-[150px] lg:h-[500px] text-[#fff] bg-black">
              {data.detail.backdrop_path ? (
                <Image
                  alt={
                    type === "movies"
                      ? (data as ResponseMovieDetailInterface).detail.title
                      : (data as ResponseSeriesDetailInterface).detail.name
                  }
                  className="object-cover object-center h-[150px] lg:h-[500px] w-full"
                  height={500}
                  src={`https://image.tmdb.org/t/p/original${data.detail.backdrop_path}`}
                  width={1000}
                />
              ) : null}
              <div className="absolute top-0 left-0 bg-gradient-to-r from-black w-full h-full flex items-center">
                <div className="w-full lg:ml-20">
                  <p className="text-base text-center lg:text-3xl lg:text-start">
                    {type === "movies"
                      ? (data as ResponseMovieDetailInterface).detail.title
                      : (data as ResponseSeriesDetailInterface).detail.name}
                  </p>
                  <p className="text-xs text-center lg:text-base lg:text-start lg:my-2">
                    {dayjs(
                      type === "movies"
                        ? (data as ResponseMovieDetailInterface).detail
                            .release_date
                        : (data as ResponseSeriesDetailInterface).detail
                            .first_air_date,
                    ).year()}{" "}
                    {type === "series" &&
                      `- ${dayjs((data as ResponseSeriesDetailInterface).detail.last_air_date).year()}`}{" "}
                    | {data.detail.genres.map((i) => i.name).join(",")}
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
