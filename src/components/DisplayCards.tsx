"use client";

import { ArrowRightOutlined, UserOutlined } from "@ant-design/icons";
import { useAtom, useSetAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React from "react";
import { Avatar } from "antd";

import { isOnRecommendationPageAtom, homeAtom } from "@/store";
import { CardData } from "@/interfaces";

export const DisplayCards = ({
  cardsData,
  title,
  redirect,
  setLoading,
}: {
  cardsData: CardData[];
  title: string;
  redirect: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const [home, setHome] = useAtom(homeAtom);
  const setIsOnRecommendationPage = useSetAtom(isOnRecommendationPageAtom);

  const RenderImage = ({ data }: { data: CardData }) => {
    return (
      <>
        {title.includes("People") ? (
          <>
            <div
              key={data.id}
              className="lg:hidden flex items-center text-center shrink-0 gap-3 p-2 cursor-pointer w-[200px] h-[100px] bg-slate-800 rounded-lg"
            >
              <Avatar
                icon={!data.poster_path ? <UserOutlined /> : undefined}
                size={64}
                src={
                  data.poster_path
                    ? `https://image.tmdb.org/t/p/original${data.poster_path}`
                    : undefined
                }
                style={
                  !data.poster_path ? { backgroundColor: "gray" } : undefined
                }
              />
              <p className="text-sm text-ellipsis overflow-hidden">
                {data.title}
              </p>
            </div>
            <div
              key={data.id}
              className="hidden lg:flex lg:flex-col place-content-center items-center text-center shrink-0 gap-3 p-2 cursor-pointer w-[100px] h-[150px] md:w-[130px] md:h-[200px] bg-slate-500 rounded-lg"
            >
              <Avatar
                icon={!data.poster_path ? <UserOutlined /> : undefined}
                size={64}
                src={
                  data.poster_path
                    ? `https://image.tmdb.org/t/p/original${data.poster_path}`
                    : undefined
                }
                style={
                  !data.poster_path ? { backgroundColor: "gray" } : undefined
                }
              />
              <p className="text-sm text-ellipsis overflow-hidden">
                {data.title}
              </p>
            </div>
          </>
        ) : (
          <Image
            key={data.id}
            alt={data.title}
            className="w-[100px] h-[150px] md:w-[130px] md:h-[200px] rounded-lg cursor-pointer"
            height={200}
            src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
            width={150}
            onClick={() => router.push(data.redirect)}
            onLoad={() => setLoading(false)}
          />
        )}
      </>
    );
  };

  return (
    <>
      <div className="w-screen md:px-10 px-3">
        <div className="py-5 font-bold md:text-xl">
          <p>{title}</p>
        </div>
        <div className="flex gap-2 lg:gap-4 overflow-x-auto items-center">
          {cardsData.slice(0, 8).map((data) => (
            <React.Fragment key={data.id}>
              <RenderImage data={data} />
            </React.Fragment>
          ))}
          <Link
            className="bg-white rounded-full h-5 lg:h-8 w-5 lg:w-8 cursor-pointer flex justify-center items-center p-2"
            href={redirect}
          >
            <ArrowRightOutlined
              className="text-sm lg:text-lg"
              style={{ color: "black" }}
              onClick={() => {
                setIsOnRecommendationPage(true);
                setHome({
                  ...home,
                  recommendList: {
                    title,
                    data: cardsData,
                  },
                });
              }}
            />
          </Link>
        </div>
      </div>
    </>
  );
};
