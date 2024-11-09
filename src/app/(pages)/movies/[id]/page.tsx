"use client";

import { Spin, message } from "antd";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { useAtomValue } from "jotai";

import { DisplayDetail } from "@/components";
import {
  useGetMoviesDetailPage,
  useAddToWatchlist,
  useDeleteFromWatchlist,
} from "@/services/hooks";
import { userAtom } from "@/store";
import {
  useAddToFavorite,
  useDeleteFromFavorite,
} from "@/services/favorite/hooks";

export default function DetailMovies({
  params: { id },
}: {
  params: { id: string };
}) {
  const [openModalLogin, setOpenModalLogin] = useState<boolean>(false);
  const [openModalWatchlist, setOpenModalWatchlist] = useState<boolean>(false);
  const [openModalFavorite, setOpenModalFavorite] = useState<boolean>(false);

  const { data, mutate, isIdle, isPending } = useGetMoviesDetailPage();
  const { mutate: addToWatchlist, isPending: isLoadingAddWatchlist } =
    useAddToWatchlist();
  const { mutate: deleteFromWatchlist, isPending: isLoadingDeleteWatchlist } =
    useDeleteFromWatchlist();
  const { mutate: addToFavorite, isPending: isLoadingAddFavorite } =
    useAddToFavorite();
  const { mutate: deleteFromFavorite, isPending: isLoadingDeleteFavorite } =
    useDeleteFromFavorite();

  const user = useAtomValue(userAtom);

  const handleWatchlistButton = () => {
    if (!getCookie("access_token")) {
      localStorage.setItem("from", `/movies/${id}`);
      setOpenModalLogin(true);
    } else {
      if (data) {
        data.watchlistId
          ? deleteFromWatchlist(data.watchlistId, {
              onSuccess: () => {
                setOpenModalWatchlist(false);
                mutate(
                  {
                    movie_id: id,
                    user_token: getCookie("access_token") || "",
                  },
                  {
                    onSuccess: () => {
                      message.success("Delete from Watchlist Success");
                    },
                  },
                );
              },
              onError: () => {
                message.error("Delete from Watchlist Failed");
              },
            })
          : addToWatchlist(
              {
                tmdbId: id,
                userId: user.id,
                type: "movies",
              },
              {
                onSuccess: () => {
                  setOpenModalWatchlist(false);
                  mutate(
                    {
                      movie_id: id,
                      user_token: getCookie("access_token") || "",
                    },
                    {
                      onSuccess: () => {
                        message.success("Add to Watchlist Success");
                      },
                    },
                  );
                },
                onError: () => {
                  message.error("Add to Watchlist Failed");
                },
              },
            );
      }
    }
  };

  const handleFavoriteButton = () => {
    if (!getCookie("access_token")) {
      localStorage.setItem("from", `/movies/${id}`);
      setOpenModalLogin(true);
    } else {
      if (data) {
        data.favoriteId
          ? deleteFromFavorite(data.favoriteId, {
              onSuccess: () => {
                setOpenModalFavorite(false);
                mutate(
                  {
                    movie_id: id,
                    user_token: getCookie("access_token") || "",
                  },
                  {
                    onSuccess: () => {
                      message.success("Delete from Favorites Success");
                    },
                  },
                );
              },
              onError: () => {
                message.error("Delete from Favorites Failed");
              },
            })
          : addToFavorite(
              {
                tmdbId: id,
                userId: user.id,
                type: "movies",
              },
              {
                onSuccess: () => {
                  setOpenModalFavorite(false);
                  mutate(
                    {
                      movie_id: id,
                      user_token: getCookie("access_token") || "",
                    },
                    {
                      onSuccess: () => {
                        message.success("Add to Favorites Success");
                      },
                    },
                  );
                },
                onError: () => {
                  message.error("Add to Favorites Failed");
                },
              },
            );
      }
    }
  };

  useEffect(() => {
    mutate({
      movie_id: id,
      user_token: getCookie("access_token") || "",
    });
  }, []);

  return (
    <>
      {isIdle ||
      isPending ||
      isLoadingAddWatchlist ||
      isLoadingDeleteWatchlist ||
      isLoadingAddFavorite ||
      isLoadingDeleteFavorite ? (
        <Spin fullscreen size="large" />
      ) : data ? (
        <DisplayDetail
          data={data}
          handleFavoriteButton={handleFavoriteButton}
          handleWatchlistButton={handleWatchlistButton}
          isIdle={isIdle}
          isLoadingAdd={isLoadingAddWatchlist || isLoadingAddFavorite}
          isLoadingDelete={isLoadingDeleteWatchlist || isLoadingDeleteFavorite}
          isPending={isPending}
          openModalFavorite={openModalFavorite}
          openModalLogin={openModalLogin}
          openModalWatchlist={openModalWatchlist}
          setOpenModalFavorite={setOpenModalFavorite}
          setOpenModalLogin={setOpenModalLogin}
          setOpenModalWatchlist={setOpenModalWatchlist}
        />
      ) : (
        <Spin fullscreen size="large" />
      )}
    </>
  );
}
