"use client";

import { UserOutlined } from "@ant-design/icons";
import { Avatar, ConfigProvider, Select } from "antd";
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
      <ConfigProvider
        theme={{
          components: {
            Select: {
              lineWidth: 1,
            },
          },
        }}
      >
        <Select
          options={[
            { value: "cast", label: "Cast" },
            { value: "crew", label: "Crew" },
          ]}
          style={{ width: 120, marginBottom: "8px", marginLeft: "8px" }}
          value={view}
          onChange={(value) => setView(value)}
        />
      </ConfigProvider>
      <div className="px-2 flex justify-center items-center text-[#fff]">
        <div className="grid grid-cols-3 gap-2 md:grid-cols-6">
          {view === "cast"
            ? dataCast.map((data) => (
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
                      !data.profile_path
                        ? { backgroundColor: "gray" }
                        : undefined
                    }
                  />
                  <p>
                    {data.name} as {data.character}
                  </p>
                </div>
              ))
            : dataCrew.map((data) => (
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
                      !data.profile_path
                        ? { backgroundColor: "gray" }
                        : undefined
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
