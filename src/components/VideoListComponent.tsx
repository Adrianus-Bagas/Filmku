"use client";

import { MovieVideoInterface } from "@/interfaces/movies.interfaces";
import { useRouter } from "next/navigation";

export default function VideoListComponent({
  videos,
  movieId,
  videoId,
}: {
  videos: MovieVideoInterface[];
  movieId: string;
  videoId?: string;
}) {
  const router = useRouter();
  return (
    <>
      <div>
        {videos.map((item) => (
          <div
            key={item.id}
            className={`${videoId === item.id && "bg-gray-900"} flex justify-start gap-3 items-center cursor-pointer hover:bg-gray-900 transition duration-300 ease-in-out my-3 py-3 focus:bg-gray-900`}
            onClick={() => router.push(`/movies/${movieId}/video/${item.id}`)}
          >
            <img
              className="w-[150px] md:w-[200px] ml-3"
              src={`https://img.youtube.com/vi/${item.key}/mqdefault.jpg`}
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
}
