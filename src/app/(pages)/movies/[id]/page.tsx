"use client";

import { Spin } from "antd";
import { useEffect } from "react";
import { getCookie } from "cookies-next";

import { DisplayDetail } from "@/components";
import { useGetMoviesDetailPage } from "@/services/hooks";

export default function DetailMovies({
  params: { id },
}: {
  params: { id: string };
}) {
  const { data, mutate, isIdle, isPending } = useGetMoviesDetailPage();

  useEffect(() => {
    mutate({
      movie_id: id,
      user_token: getCookie("access_token") || "",
    });
  }, []);

  return (
    <>
      {isIdle ? (
        <Spin fullscreen size="large" />
      ) : data ? (
        <DisplayDetail data={data} isIdle={isIdle} isPending={isPending} />
      ) : (
        <Spin fullscreen size="large" />
      )}
    </>
  );
}
