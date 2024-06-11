"use client";

import React from "react";
import { Carousel } from "antd";
import { CarouselData } from "@/interfaces/app.interface";
import Link from "next/link";

export const DisplayCarousel = ({
  carouselData,
}: {
  carouselData: CarouselData[];
}) => {
  return (
    <div className="mt-14 lg:mt-[72px]">
      <Carousel effect="fade" autoplay>
        {carouselData.map((data, index) => (
          <div
            key={index}
            className="relative h-[150px] lg:h-[350px] text-[#fff] bg-[#364d79] cursor-pointer"
          >
            <Link href={data.redirect}>
              <img
                src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
                className="object-cover object-center h-[150px] lg:h-[350px] w-full"
              />
            </Link>
            <div className="absolute top-0 left-0 bg-gradient-to-r from-black w-full h-full flex items-center">
              <div className="w-full lg:ml-20">
                <p className="text-base text-center lg:text-3xl lg:text-start">
                  {data.title}
                </p>
                <p className="text-xs text-center lg:text-base lg:text-start">
                  {data.media_type === "movie" ? "Movie" : "Series"} |{" "}
                  {data.genres}
                </p>
                <div className="hidden lg:inline-block lg:w-1/2 lg:my-5">
                  <p className="break-words">{data.overview}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};
