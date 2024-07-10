"use client";

import { MovieVideoInterface } from "@/interfaces/movies.interfaces";

export default function VideoListComponent({
  videos,
}: {
  videos: MovieVideoInterface[];
}) {
  return (
    <>
      <div>
        {videos.map((item) => (
          <div
            key={item.id}
            className="flex justify-start gap-3 items-center cursor-pointer hover:bg-gray-900 transition duration-300 ease-in-out my-3 py-3"
          >
            <img
              className="w-[100px] md:w-[200px] ml-3"
              src={`https://img.youtube.com/vi/${item.key}/mqdefault.jpg`}
            />
            <div>
              <p className="text-white">{item.name}</p>
              <p className="text-white">Source: {item.site}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
