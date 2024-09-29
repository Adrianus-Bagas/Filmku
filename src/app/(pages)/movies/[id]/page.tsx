"use client";

import { Spin } from "antd";

import { DisplayDetail } from "@/components";
import { MovieDetailInterface } from "@/interfaces";
import { useGetMoviesDetail } from "@/services/hooks";

export default function DetailMovies({ params }: { params: { id: string } }) {
  const { data, isLoading } = useGetMoviesDetail(params.id);

  return (
    <>
      {isLoading ? (
        <Spin fullscreen size="large" />
      ) : data ? (
        <DisplayDetail data={data as MovieDetailInterface} />
      ) : null}
    </>
  );
}
