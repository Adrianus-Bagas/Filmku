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
  useAddToFavorite,
  useDeleteFromFavorite,
  useAddReview,
  useEditReview,
  useDeleteReview,
} from "@/services/hooks";
import { userAtom } from "@/store";

export default function DetailMovies({
  params: { id },
}: {
  params: { id: string };
}) {
  const [openModalLogin, setOpenModalLogin] = useState<boolean>(false);
  const [openModalWatchlist, setOpenModalWatchlist] = useState<boolean>(false);
  const [openModalFavorite, setOpenModalFavorite] = useState<boolean>(false);
  const [openModalReview, setOpenModalReview] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");

  const { data, mutate, isIdle, isPending } = useGetMoviesDetailPage();
  const { mutate: addToWatchlist, isPending: isLoadingAddWatchlist } =
    useAddToWatchlist();
  const { mutate: deleteFromWatchlist, isPending: isLoadingDeleteWatchlist } =
    useDeleteFromWatchlist();
  const { mutate: addToFavorite, isPending: isLoadingAddFavorite } =
    useAddToFavorite();
  const { mutate: deleteFromFavorite, isPending: isLoadingDeleteFavorite } =
    useDeleteFromFavorite();
  const { mutate: addReview, isPending: isLoadingAddReview } = useAddReview();
  const { mutate: editReview, isPending: isLoadingEditReview } =
    useEditReview();
  const { mutate: deleteReview, isPending: isLoadingDeleteReview } =
    useDeleteReview();

  const user = useAtomValue(userAtom);

  const handleWatchlistButton = () => {
    if (!getCookie("access_token")) {
      localStorage.setItem("from", `/movies/${id}`);
      setOpenModalWatchlist(false);
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
      setOpenModalFavorite(false);
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

  const handleReview = (
    action: "add" | "edit" | "delete",
    reviewId?: string,
  ) => {
    if (!getCookie("access_token")) {
      localStorage.setItem("from", `/movies/${id}`);
      setOpenModalLogin(true);
    } else {
      switch (action) {
        case "add": {
          addReview(
            {
              content,
              tmdbId: id,
              type: "movies",
              userId: user.id,
            },
            {
              onSuccess: () => {
                setContent("");
                mutate(
                  {
                    movie_id: id,
                    user_token: getCookie("access_token") || "",
                  },
                  {
                    onSuccess: () => {
                      message.success("Add Review Success");
                    },
                  },
                );
              },
              onError: () => {
                message.error("Add Review Error");
              },
            },
          );
          break;
        }
        case "edit": {
          if (reviewId) {
            editReview(
              {
                id: reviewId,
                content,
              },
              {
                onSuccess: () => {
                  setContent("");
                  mutate(
                    {
                      movie_id: id,
                      user_token: getCookie("access_token") || "",
                    },
                    {
                      onSuccess: () => {
                        message.success("Edit Review Success");
                      },
                    },
                  );
                },
                onError: () => {
                  message.error("Edit Review Error");
                },
              },
            );
          }
          break;
        }
        case "delete": {
          if (reviewId) {
            deleteReview(reviewId, {
              onSuccess: () => {
                setContent("");
                mutate(
                  {
                    movie_id: id,
                    user_token: getCookie("access_token") || "",
                  },
                  {
                    onSuccess: () => {
                      message.success("Delete Review Success");
                    },
                  },
                );
              },
              onError: () => {
                message.error("Delete Review Error");
              },
            });
          }
          break;
        }
        default:
          break;
      }
    }
  };

  useEffect(() => {
    mutate(
      {
        movie_id: id,
        user_token: getCookie("access_token") || "",
      },
      {
        onError: () => {
          message.info("Refresh...");
          window.location.reload();
        },
      },
    );
  }, []);

  return (
    <>
      {isIdle ||
      isPending ||
      isLoadingAddWatchlist ||
      isLoadingDeleteWatchlist ||
      isLoadingAddFavorite ||
      isLoadingDeleteFavorite ||
      isLoadingAddReview ||
      isLoadingEditReview ||
      isLoadingDeleteReview ? (
        <Spin fullscreen size="large" />
      ) : data ? (
        <DisplayDetail
          content={content}
          data={data}
          handleFavoriteButton={handleFavoriteButton}
          handleReviewButton={handleReview}
          handleWatchlistButton={handleWatchlistButton}
          isIdle={isIdle}
          isLoadingAdd={isLoadingAddWatchlist || isLoadingAddFavorite}
          isLoadingDelete={isLoadingDeleteWatchlist || isLoadingDeleteFavorite}
          isPending={isPending}
          openModalFavorite={openModalFavorite}
          openModalLogin={openModalLogin}
          openModalReview={openModalReview}
          openModalWatchlist={openModalWatchlist}
          setContent={setContent}
          setOpenModalFavorite={setOpenModalFavorite}
          setOpenModalLogin={setOpenModalLogin}
          setOpenModalReview={setOpenModalReview}
          setOpenModalWatchlist={setOpenModalWatchlist}
          type="movies"
        />
      ) : (
        <Spin fullscreen size="large" />
      )}
    </>
  );
}
