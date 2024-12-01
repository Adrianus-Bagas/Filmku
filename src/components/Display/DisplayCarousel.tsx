"use client";

import { Carousel } from "antd";
import Link from "next/link";
import Image from "next/image";
import React from "react";

import { CarouselData } from "@/interfaces";

export const DisplayCarousel = ({
  carouselData,
  setLoading,
}: {
  carouselData: CarouselData[];
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="mt-14 lg:mt-[72px]">
      <Carousel autoplay effect="fade">
        {carouselData.map((data, index) => (
          <div
            key={index}
            className="relative h-[150px] lg:h-[500px] text-[#fff] bg-[#364d79] cursor-pointer"
          >
            <Link href={data.redirect}>
              {data.backdrop_path ? (
                <Image
                  alt={data.title}
                  className="object-cover object-center h-[150px] lg:h-[500px] w-full"
                  height={500}
                  src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
                  width={1000}
                  onLoad={() => setLoading(false)}
                />
              ) : null}
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
            </Link>
          </div>
        ))}
      </Carousel>
    </div>
  );
};
