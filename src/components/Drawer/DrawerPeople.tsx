"use client";

import { ArrowLeftOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, ConfigProvider, Drawer, Tabs, message } from "antd";
import { useAtomValue } from "jotai";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import {
  PeopleCreditCastComponent,
  PeopleCreditCrewComponent,
} from "../Display";

import { isMobileScreenAtom } from "@/store";
import { useGetPeopleDetailPage } from "@/services/hooks";

export const DrawerPeople = ({
  people_id,
  setPeopleId,
}: {
  people_id: string;
  setPeopleId: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { data, isIdle, isPending, mutate } = useGetPeopleDetailPage();
  const isMobileScreen = useAtomValue(isMobileScreenAtom);

  const [currentPageCastMovies, setCurrentPageCastMovies] = useState<number>(1);
  const [currentPageCastSeries, setCurrentPageCastSeries] = useState<number>(1);
  const [currentPageCrewMovies, setCurrentPageCrewMovies] = useState<number>(1);
  const [currentPageCrewSeries, setCurrentPageCrewSeries] = useState<number>(1);

  const TabItems = () => {
    return ["Casts", "Crews"].map((item, index) => {
      return {
        label: <p className="font-bold">{item}</p>,
        key: index.toString(),
        children: (
          <>
            {item === "Casts" ? (
              <PeopleCreditCastComponent
                currentPageMovies={currentPageCastMovies}
                currentPageSeries={currentPageCastSeries}
                data={
                  data
                    ? data.cast
                    : {
                        movie: [],
                        tv: [],
                      }
                }
                setCurrentPageMovies={setCurrentPageCastMovies}
                setCurrentPageSeries={setCurrentPageCastSeries}
              />
            ) : (
              <PeopleCreditCrewComponent
                currentPageMovies={currentPageCrewMovies}
                currentPageSeries={currentPageCrewSeries}
                data={
                  data
                    ? data.crew
                    : {
                        movie: [],
                        tv: [],
                      }
                }
                setCurrentPageMovies={setCurrentPageCrewMovies}
                setCurrentPageSeries={setCurrentPageCrewSeries}
              />
            )}
          </>
        ),
      };
    });
  };

  useEffect(() => {
    if (people_id) {
      mutate(
        {
          people_id,
        },
        {
          onError: () => {
            message.info("Refresh...");
            window.location.reload();
          },
        },
      );
    }
  }, [people_id]);

  return (
    <>
      <Drawer
        closeIcon={<ArrowLeftOutlined className="text-[24px] text-white" />}
        loading={isIdle || isPending}
        open={!!people_id}
        style={{ color: "white", backgroundColor: "black" }}
        title={<p className="text-white">Detail Person</p>}
        width={isMobileScreen ? "100%" : "50%"}
        onClose={() => {
          setPeopleId("");
          setCurrentPageCastMovies(1);
          setCurrentPageCastSeries(1);
          setCurrentPageCrewMovies(1);
          setCurrentPageCrewSeries(1);
        }}
      >
        {data && (
          <>
            <div className="min-h-[250px] md:min-h-[350px]">
              {data.detail.profile_path ? (
                <Image
                  alt={data.detail.name}
                  className={`${data.detail.biography && "float-left"} pr-2 w-[150px] h-[250px] md:w-[250px] md:h-[350px] rounded-lg flex justify-center`}
                  height={450}
                  src={`https://image.tmdb.org/t/p/original${data.detail.profile_path}`}
                  width={300}
                />
              ) : (
                <div
                  className={`${data.detail.biography && "float-left"} flex flex-col place-content-center items-center text-center shrink-0 gap-3 p-2 cursor-pointer w-[150px] h-[250px] md:w-[250px] md:h-[350px] bg-slate-500 rounded-lg`}
                >
                  <Avatar
                    icon={<UserOutlined />}
                    size={64}
                    style={{ backgroundColor: "gray" }}
                  />
                  <p>{data.detail.name}</p>
                </div>
              )}
              <p className="text-justify clear-right">
                {data.detail.biography}
              </p>
            </div>
            <div className="my-4">
              <ConfigProvider
                theme={{
                  token: {
                    lineWidth: 5,
                  },
                  components: {
                    Tabs: {
                      itemColor: "white",
                      itemSelectedColor: "#364d79",
                      itemHoverColor: "#364d79",
                      inkBarColor: "#364d79",
                      lineWidth: 5,
                    },
                  },
                }}
              >
                <Tabs
                  centered
                  items={TabItems()}
                  size="middle"
                  tabPosition="top"
                />
              </ConfigProvider>
            </div>
          </>
        )}
      </Drawer>
    </>
  );
};
