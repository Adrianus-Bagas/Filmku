"use client";

import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Spin, message } from "antd";
import { getCookie } from "cookies-next";
import { useAtom } from "jotai";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { favoritesAtom } from "@/store/favorites.store";
import { useBulkDeleteFromFavorite, useGetFavorites } from "@/services/hooks";
import { CardData } from "@/interfaces";
import { ModalConfirm, RenderPosterListComponent } from "@/components";
import { FavoriteIcon, FilmIcon, SeriesIcon } from "@/assets/icons";

export default function Favorites() {
  const router = useRouter();

  const { data, isPending, isIdle, mutate } = useGetFavorites();
  const { mutate: deleteFromFavorite, isPending: isLoadingDeleteFavorite } =
    useBulkDeleteFromFavorite();

  const [favorites, setFavorites] = useAtom(favoritesAtom);

  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [favoriteId, setFavoriteId] = useState<string[]>([]);
  const [buttonMode, setButtonMode] = useState<"edit" | "delete">("edit");

  const handleFavoriteButton = () => {
    deleteFromFavorite(
      {
        ids: favoriteId,
      },
      {
        onSuccess: () => {
          setOpenModal(false);
          message.success("Delete Favorites Success");
          setFavoriteId([]);
          setButtonMode("edit");
          mutate();
        },
        onError: () => {
          message.error("Delete Favorites Failed");
        },
      },
    );
  };

  useEffect(() => {
    !openModal && setFavoriteId([]);
  }, [openModal]);

  useEffect(() => {
    !getCookie("access_token") && router.replace("/home");
  }, [router]);

  useEffect(() => {
    mutate();
  }, []);

  useEffect(() => {
    if (data) {
      const dataCardTrendingMovie: CardData[] = data.trendingMovies.map(
        (item) => {
          return {
            id: item.id,
            title: item.title,
            poster_path: item.poster_path,
            redirect: `/movies/${item.id}`,
            type: "movies",
          };
        },
      );
      const dataCardTrendingSeries: CardData[] = data.trendingSeries.map(
        (item) => {
          return {
            id: item.id,
            title: item.name,
            poster_path: item.poster_path,
            redirect: `/series/${item.id}`,
            type: "series",
          };
        },
      );

      setFavorites({
        ...favorites,
        trendingMovies: dataCardTrendingMovie,
        trendingSeries: dataCardTrendingSeries,
      });
    }
  }, [data]);

  return (
    <>
      {isPending ||
      isIdle ||
      isLoadingDeleteFavorite ||
      !getCookie("access_token") ? (
        <Spin fullscreen size="large" />
      ) : (
        <>
          {loading && <Spin fullscreen size="large" />}
          <ModalConfirm
            openModal={openModal}
            setOpenModal={setOpenModal}
            onConfirm={handleFavoriteButton}
          />
          <div className="w-screen md:px-10 px-3 mt-14 lg:mt-[72px]">
            <div className="py-5 font-bold md:text-xl">
              <p>Your Favorites</p>
            </div>
            {data && data.data.length > 0 ? (
              <div>
                <div className="flex justify-between items-center text-sm">
                  <div
                    className={`flex items-center gap-2 ${currentPage === 1 && "cursor-not-allowed opacity-50"}`}
                    onClick={() =>
                      currentPage > 1
                        ? setCurrentPage((prev) => prev - 1)
                        : null
                    }
                  >
                    <ArrowLeftOutlined />
                    <p>Previous Page</p>
                  </div>
                  <div
                    className={`flex items-center gap-2 ${(currentPage - 1) * 3 + 3 >= data.data.length && "cursor-not-allowed opacity-50"}`}
                    onClick={() =>
                      (currentPage - 1) * 3 + 3 < data.data.length
                        ? setCurrentPage((prev) => prev + 1)
                        : null
                    }
                  >
                    <p>Next Page</p>
                    <ArrowRightOutlined />
                  </div>
                </div>
                <div
                  className="flex justify-end m-3 cursor-pointer"
                  onClick={() => {
                    if (favoriteId.length > 0 && buttonMode === "delete") {
                      setOpenModal(true);
                    } else if (
                      favoriteId.length === 0 &&
                      buttonMode === "delete"
                    ) {
                      setButtonMode("edit");
                    } else {
                      setButtonMode("delete");
                    }
                  }}
                >
                  {buttonMode === "edit" ? (
                    <EditOutlined className="text-xl" />
                  ) : (
                    <DeleteOutlined className="text-xl" />
                  )}
                </div>
                {data.data
                  .slice((currentPage - 1) * 3, (currentPage - 1) * 3 + 3)
                  .map((item) => (
                    <div
                      key={item.id}
                      className={`${favoriteId.includes(item.id) && "bg-gray-900"} flex justify-between items-center my-3 py-3 cursor-pointer`}
                      onClick={() =>
                        buttonMode === "edit"
                          ? router.push(`/${item.type}/${item.tmdbId}`)
                          : favoriteId.includes(item.id)
                            ? setFavoriteId([
                                ...favoriteId.filter(
                                  (value) => value !== item.id,
                                ),
                              ])
                            : setFavoriteId([...favoriteId, item.id])
                      }
                    >
                      <div className="flex justify-start gap-3 items-center px-1">
                        {buttonMode === "delete" && (
                          <div
                            className={`border-[1px] border-white w-3 h-3 ${favoriteId.includes(item.id) && "bg-white"}`}
                          />
                        )}
                        <Image
                          alt={item.title}
                          className="w-[150px] md:w-[200px] ml-3"
                          height={200}
                          src={`https://image.tmdb.org/t/p/original${item.backdropPath}`}
                          width={200}
                        />
                        <div>
                          <p className="text-white">{item.title}</p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="flex flex-col items-center opacity-50">
                <FavoriteIcon className="w-10 h-10 fill-white" />
                <p>You have no favorites</p>
                <p>Find interesting movies and series here</p>
                <div className="flex justify-between gap-4 items-center my-4">
                  <div
                    className="flex justify-center gap-2 border-2 rounded-md p-2 cursor-pointer"
                    onClick={() => router.push("/movies")}
                  >
                    <FilmIcon className="w-6 h-6" />
                    <p>Movies</p>
                  </div>
                  <div
                    className="flex justify-center gap-2 border-2 rounded-md p-2 cursor-pointer"
                    onClick={() => router.push("/series")}
                  >
                    <SeriesIcon className="w-6 h-6 flex justify-center" />
                    <p>Series</p>
                  </div>
                </div>
              </div>
            )}
            <div className="py-5 font-bold md:text-xl">
              <p>Top Chart Movie Today</p>
            </div>
            <div className="flex gap-2 lg:gap-4 overflow-x-auto items-center">
              {favorites.trendingMovies.map((item) => (
                <React.Fragment key={item.id}>
                  <RenderPosterListComponent
                    data={item}
                    setLoading={setLoading}
                    title="Top Chart Movie Today"
                  />
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="w-screen md:px-10 px-3">
            <div className="py-5 font-bold md:text-xl">
              <p>Top Chart Series Today</p>
            </div>
            <div className="flex gap-2 lg:gap-4 overflow-x-auto items-center">
              {favorites.trendingSeries.map((item) => (
                <React.Fragment key={item.id}>
                  <RenderPosterListComponent
                    data={item}
                    setLoading={setLoading}
                    title="Top Chart Series Today"
                  />
                </React.Fragment>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
