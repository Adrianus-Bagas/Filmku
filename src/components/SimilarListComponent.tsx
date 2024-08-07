"use client";

import { MovieListInterface } from "@/interfaces/movies.interfaces";
import { useRouter } from "next/navigation";

export default function SimilarListComponent({
  similarData,
}: {
  similarData: MovieListInterface[];
}) {
  const router = useRouter();

  return (
    <>
      <div className="px-2 flex justify-center items-center">
        <div className="grid grid-cols-3 gap-2 md:grid-cols-6">
          {similarData.map((data, index) => (
            <img
              key={index}
              src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
              className="w-[100px] h-[150px] md:w-[150px] md:h-[200px] rounded-lg cursor-pointer"
              onClick={() => router.push(`/movies/${data.id}`)}
              alt={data.title}
            />
          ))}
        </div>
      </div>
    </>
  );
}
