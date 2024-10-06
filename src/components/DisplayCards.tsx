"use client";

import { ArrowRightOutlined } from "@ant-design/icons";
import { useAtom, useSetAtom } from "jotai";
import Link from "next/link";
import React from "react";
import { Url } from "next/dist/shared/lib/router/router";

import { RenderPosterListComponent } from ".";

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
  redirect: Url;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [home, setHome] = useAtom(homeAtom);
  const setIsOnRecommendationPage = useSetAtom(isOnRecommendationPageAtom);

  return (
    <>
      <div className="w-screen md:px-10 px-3">
        <div className="py-5 font-bold md:text-xl">
          <p>{title}</p>
        </div>
        <div className="flex gap-2 lg:gap-4 overflow-x-auto items-center">
          {cardsData.slice(0, 8).map((data) => (
            <React.Fragment key={data.id}>
              <RenderPosterListComponent
                data={data}
                setLoading={setLoading}
                title={title}
              />
            </React.Fragment>
          ))}
          {cardsData.length > 8 && (
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
          )}
        </div>
      </div>
    </>
  );
};
