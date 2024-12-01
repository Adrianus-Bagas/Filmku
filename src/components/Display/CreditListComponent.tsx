"use client";

import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { useState } from "react";

import { DrawerPeople } from "../Drawer";

import {
  MovieCastInterface,
  MovieCrewInterface,
  SeriesCastInterface,
  SeriesCrewInterface,
  SeriesGuestStarEpisodeInterface,
} from "@/interfaces";

export const CreditsListComponent = ({
  dataCast,
  dataCrew,
  isGuestStar,
}: {
  dataCast:
    | MovieCastInterface[]
    | SeriesCastInterface[]
    | SeriesGuestStarEpisodeInterface[];
  dataCrew: MovieCrewInterface[] | SeriesCrewInterface[];
  isGuestStar?: boolean;
}) => {
  const [view, setView] = useState<"cast" | "crew">("cast");
  const [peopleId, setPeopleId] = useState<string>("");

  return (
    <>
      <DrawerPeople people_id={peopleId} setPeopleId={setPeopleId} />
      <div className="flex justify-center items-center gap-4 my-4">
        <div
          className={`${view === "cast" ? "bg-blue-500 text-white" : "bg-white text-gray-700"} border-[1px] w-fit p-2 rounded-lg text-xs border-gray-200 cursor-pointer`}
          onClick={() => {
            setView("cast");
          }}
        >
          {isGuestStar ? "Guest Stars" : "Casts"}
        </div>
        <div
          className={`${view === "crew" ? "bg-blue-500 text-white" : "bg-white text-gray-700"} border-[1px] w-fit p-2 rounded-lg text-xs border-gray-200 cursor-pointer`}
          onClick={() => {
            setView("crew");
          }}
        >
          Crews
        </div>
      </div>
      <div className="px-2 flex justify-center items-center text-[#fff]">
        <div className="grid grid-cols-3 gap-2 md:grid-cols-6">
          {view === "cast" &&
            dataCast.map((data) => (
              <div
                key={data.id}
                className="flex flex-col items-center text-center cursor-pointer"
                onClick={() => setPeopleId(data.id.toString())}
              >
                <Avatar
                  icon={!data.profile_path ? <UserOutlined /> : undefined}
                  size={64}
                  src={
                    data.profile_path
                      ? `https://image.tmdb.org/t/p/original${data.profile_path}`
                      : undefined
                  }
                  style={
                    !data.profile_path ? { backgroundColor: "gray" } : undefined
                  }
                />
                <p>
                  {data.name} as{" "}
                  {(data as MovieCastInterface).character !== undefined
                    ? (data as MovieCastInterface).character
                    : (data as SeriesCastInterface).roles
                        .map((item) => item.character)
                        .join(", ")}
                </p>
              </div>
            ))}
          {view === "crew" &&
            dataCrew.map((data) => (
              <div
                key={data.id}
                className="flex flex-col items-center text-center"
                onClick={() => setPeopleId(data.id.toString())}
              >
                <Avatar
                  icon={!data.profile_path ? <UserOutlined /> : undefined}
                  size={64}
                  src={
                    data.profile_path
                      ? `https://image.tmdb.org/t/p/original${data.profile_path}`
                      : undefined
                  }
                  style={
                    !data.profile_path ? { backgroundColor: "gray" } : undefined
                  }
                />
                <p>
                  {data.name} as{" "}
                  {(data as MovieCrewInterface).job !== undefined
                    ? (data as MovieCrewInterface).job
                    : (data as SeriesCrewInterface).jobs
                        .map((item) => item.job)
                        .join(", ")}
                </p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
