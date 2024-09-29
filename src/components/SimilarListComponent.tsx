"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

import { CardData, MovieListInterface } from "@/interfaces";

export const SimilarListComponent = ({
  similarData,
  title,
}: {
  similarData: MovieListInterface[] | CardData[];
  title?: string;
}) => {
  const router = useRouter();

  return (
    <>
      <div className="px-2 flex flex-col justify-center items-center">
        <div className="py-5 font-bold md:text-xl">
          <p>{title}</p>
        </div>
        <div className="grid grid-cols-3 gap-2 md:grid-cols-6">
          {similarData.map((data, index) => (
            <Image
              key={index}
              alt={data.title}
              className="w-[100px] h-[150px] md:w-[150px] md:h-[200px] rounded-lg cursor-pointer"
              height={200}
              src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
              width={150}
              onClick={() => router.push(`/movies/${data.id}`)}
            />
          ))}
        </div>
      </div>
    </>
  );
};
