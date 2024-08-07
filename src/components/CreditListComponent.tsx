"use client";

import {
  MovieCastInterface,
  MovieCrewInterface,
} from "@/interfaces/movies.interfaces";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Select } from "antd";
import { useState } from "react";

export default function CreditsListComponent({
  dataCast,
  dataCrew,
}: {
  dataCast: MovieCastInterface[];
  dataCrew: MovieCrewInterface[];
}) {
  const [view, setView] = useState<"cast" | "crew">("cast");

  return (
    <>
      <Select
        style={{ width: 120, marginBottom: "8px", marginLeft: "8px" }}
        onChange={(value) => setView(value)}
        options={[
          { value: "cast", label: "Cast" },
          { value: "crew", label: "Crew" },
        ]}
        value={view}
      />
      <div className="px-2 flex justify-center items-center text-[#fff]">
        <div className="grid grid-cols-3 gap-2 md:grid-cols-6">
          {view === "cast"
            ? dataCast.map((data) => (
                <div
                  className="flex flex-col items-center text-center"
                  key={data.id}
                >
                  <Avatar
                    size={64}
                    src={
                      data.profile_path
                        ? `https://image.tmdb.org/t/p/original${data.profile_path}`
                        : undefined
                    }
                    icon={!data.profile_path ? <UserOutlined /> : undefined}
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
                  className="flex flex-col items-center text-center"
                  key={data.id}
                >
                  <Avatar
                    size={64}
                    src={
                      data.profile_path
                        ? `https://image.tmdb.org/t/p/original${data.profile_path}`
                        : undefined
                    }
                    icon={!data.profile_path ? <UserOutlined /> : undefined}
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
}
