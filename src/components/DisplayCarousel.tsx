"use client";

import React from "react";
import { Carousel } from "antd";
import { CarouselData } from "@/interfaces/app.interface";
import { useRouter } from "next/navigation";

export const DisplayCarousel = ({
  carouselData,
}: {
  carouselData: CarouselData[];
}) => {
  const router = useRouter();
  return (
    <div className="mt-14 lg:mt-[72px]">
      <Carousel effect="fade" autoplay>
        {carouselData.map((data, index) => (
          <div
            key={index}
            className="relative h-[150px] lg:h-[350px] text-[#fff] bg-[#364d79]"
          >
            <img
              src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
              className="object-cover object-center h-[150px] lg:h-[350px] w-full"
            />
            <div className="absolute top-0 left-0 bg-gradient-to-r from-black w-full h-full flex items-center">
              <div className="ml-20">
                <p className="text-3xl">{data.title}</p>
                <p>
                  {data.media_type === "movie" ? "Movie" : "Series"} |{" "}
                  {data.genres}
                </p>
                <div className="w-1/2 my-5">
                  <p className="break-words">{data.overview}</p>
                </div>
                <div
                  className="bg-[#364d79] rounded-lg p-3 w-fit cursor-pointer"
                  onClick={() =>
                    router.push(
                      `${data.media_type === "Movie" ? "/movies/" : "/series/"}${data.redirect}`,
                    )
                  }
                >
                  Go To Details
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};
