"use client";

import { CardData } from "@/interfaces/app.interface";
import { ArrowRightOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

export default function DisplayCards({
  cardsData,
  title,
  redirect,
  setLoading,
}: {
  cardsData: CardData[];
  title: string;
  redirect: string;
  setLoading: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();

  return (
    <>
      <div className="w-screen md:px-10 px-3">
        <div className="py-5 font-bold md:text-xl">
          <p>{title}</p>
        </div>
        <div className="flex gap-2 lg:gap-4 overflow-x-auto items-center">
          {cardsData.map((data, index) => (
            <img
              key={index}
              src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
              className="w-[75px] h-[100px] md:w-[150px] md:h-[200px] rounded-lg cursor-pointer"
              onClick={() => router.push(data.redirect)}
              onLoad={() => setLoading(true)}
            />
          ))}
          <Link
            href={redirect}
            className="bg-white rounded-full h-5 lg:h-10 w-5 lg:w-10 cursor-pointer flex justify-center items-center p-2"
          >
            <ArrowRightOutlined
              style={{ color: "black" }}
              className="text-[8px] lg:text-base"
            />
          </Link>
        </div>
      </div>
    </>
  );
}
