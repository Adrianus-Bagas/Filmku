"use client";

import DisplayDetail from "@/components/DisplayDetail";
import { MovieDetailInterface } from "@/interfaces/movies.interfaces";
import { useGetMoviesDetail } from "@/services/movies/hooks";
import { Spin } from "antd";

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
