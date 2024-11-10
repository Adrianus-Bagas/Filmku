"use client";

import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { useState } from "react";

import { MovieCastInterface, MovieCrewInterface } from "@/interfaces";

export const CreditsListComponent = ({
  dataCast,
  dataCrew,
}: {
  dataCast: MovieCastInterface[];
  dataCrew: MovieCrewInterface[];
}) => {
  const [view, setView] = useState<"cast" | "crew">("cast");

  return (
    <>
      <div className="flex justify-center items-center gap-4">
        <div
          className={`${view === "cast" ? "bg-blue-500 text-white" : "bg-white text-gray-700"} border-[1px] w-fit p-2 rounded-lg text-xs border-gray-200 cursor-pointer`}
          onClick={() => {
            setView("cast");
          }}
        >
          Casts
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
                className="flex flex-col items-center text-center"
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
                  {data.name} as {data.character}
                </p>
              </div>
            ))}
          {view === "crew" &&
            dataCrew.map((data) => (
              <div
                key={data.id}
                className="flex flex-col items-center text-center"
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
                  {data.name} as {data.job}
                </p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};
