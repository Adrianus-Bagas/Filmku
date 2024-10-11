"use client";

import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

import { CardData } from "@/interfaces";
import { FilmIcon } from "@/assets/icons";

export const RenderPosterListComponent = ({
  data,
  title,
  setLoading,
}: {
  data: CardData;
  title: string;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const searchName = useSearchParams();

  useEffect(() => {
    if (setLoading && title.includes("People")) {
      setLoading(false);
    }
  }, [title, setLoading]);

  return (
    <>
      {title.includes("People") ? (
        searchName.get("searchfor") ? (
          <>
            <div
              key={data.id}
              className="flex flex-col place-content-center items-center text-center shrink-0 gap-3 p-2 cursor-pointer w-[100px] h-[150px] md:w-[130px] md:h-[200px] bg-slate-500 rounded-lg"
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
        )
      ) : data.poster_path ? (
        <Image
          key={data.id}
          alt={data.title}
          className="w-[100px] h-[150px] md:w-[130px] md:h-[200px] rounded-lg cursor-pointer"
          height={200}
          src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
          width={150}
          onClick={() => router.push(data.redirect)}
          onLoad={() => (setLoading ? setLoading(false) : null)}
        />
      ) : (
        <div
          key={data.id}
          className="flex flex-col place-content-center items-center text-center shrink-0 gap-3 p-2 cursor-pointer w-[100px] h-[150px] md:w-[130px] md:h-[200px] bg-slate-500 rounded-lg"
        >
          <FilmIcon className="w-6 h-6" />
          <p>{data.title}</p>
        </div>
      )}
    </>
  );
};
