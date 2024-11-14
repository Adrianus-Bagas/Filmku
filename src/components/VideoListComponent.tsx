"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import React from "react";

import { MovieVideoInterface, SeriesVideoInterface } from "@/interfaces";

export const VideoListComponent = ({
  videos,
  id,
  type,
  videoId,
  setVideoId,
}: {
  videos: MovieVideoInterface[] | SeriesVideoInterface[];
  id: string;
  type: "movies" | "series";
  videoId?: string;
  setVideoId?: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const router = useRouter();

  return (
    <>
      <div>
        {videos.map((item) => (
          <div
            key={item.id}
            className={`${(videoId === item.id || videoId === item.key) && "bg-gray-900"} flex justify-start gap-3 items-center cursor-pointer hover:bg-gray-900 transition duration-300 ease-in-out my-3 py-3 focus:bg-gray-900`}
            onClick={
              setVideoId
                ? () => setVideoId(item.key)
                : () => router.push(`/${type}/${id}/video/${item.id}`)
            }
          >
            <Image
              alt={item.name}
              className="w-[150px] md:w-[200px] ml-3"
              height={200}
              src={`https://img.youtube.com/vi/${item.key}/mqdefault.jpg`}
              width={200}
            />
            <div>
              <p className="text-white">{item.type}</p>
              <p className="text-white">{item.name}</p>
              <p className="text-white">Source: {item.site}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
