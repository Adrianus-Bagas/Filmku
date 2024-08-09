"use client";

import React from "react";
import type { CalendarProps } from "antd";
import { Badge, Calendar, Spin } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useGetMoviesSchedule } from "@/services/movies/hooks";
import { useAtom, useAtomValue } from "jotai";
import {
  paramsScheduleMovieAtom,
  paramsScheduleSeriesAtom,
  valueAtom,
  valueSelectAtom,
} from "@/store/movies.store";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import dayLocaleData from "dayjs/plugin/localeData";
import { useGetSeriesSchedule } from "@/services/series/hooks";

dayjs.extend(dayLocaleData);

export default function Schedules() {
  const paramsMovie = useAtomValue(paramsScheduleMovieAtom);
  const paramsSeries = useAtomValue(paramsScheduleSeriesAtom);
  const [value, setValue] = useAtom(valueAtom);
  const [selectedValue, setSelectedValue] = useAtom(valueSelectAtom);
  const { data: movieList, isLoading: loadingMovie } =
    useGetMoviesSchedule(paramsMovie);
  const { data: seriesList, isLoading: loadingSeries } =
    useGetSeriesSchedule(paramsSeries);

  const dateCellRender = (value: Dayjs) => {
    const filteredMovie = movieList.filter(
      (i) =>
        dayjs(i.release_date).format("DD/MM/YYYY") ===
        value.format("DD/MM/YYYY"),
    );
    const filteredSeries = seriesList.filter(
      (i) =>
        dayjs(i.first_air_date).format("DD/MM/YYYY") ===
        value.format("DD/MM/YYYY"),
    );
    return (
      <div className="flex flex-col justify-center gap-2 items-center">
        {filteredMovie.length > 0 && (
          <Badge
            color="red"
            count={filteredMovie.length}
            title={`${filteredMovie.length} New Movie${filteredMovie.length > 1 ? "s" : ""}`}
          />
        )}
        {filteredSeries.length > 0 && (
          <Badge
            color="green"
            count={filteredSeries.length}
            title={`${filteredSeries.length} New Serie${filteredSeries.length > 1 ? "s" : ""}`}
          />
        )}
      </div>
    );
  };

  const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
    if (typeof document !== "undefined") {
      const cellDate = document.querySelector(
        "[title=" + CSS.escape(current.format("YYYY-MM-DD")) + "]",
      );
      if (cellDate) {
        if (current.format("DDMMYYYY") === selectedValue.format("DDMMYYYY")) {
          cellDate.classList.add("ant-picker-cell-selected");
        } else {
          cellDate.classList.remove("ant-picker-cell-selected");
        }
      }
    }
    if (info.type === "date") return dateCellRender(current);
    return info.originNode;
  };

  return (
    <>
      {loadingMovie || loadingSeries ? (
        <Spin size="large" fullscreen />
      ) : (
        <>
          <div className="mt-14 lg:mt-[72px]">
            <Calendar
              cellRender={cellRender}
              headerRender={({ value, onChange }) => {
                return (
                  <>
                    <div className="flex justify-center gap-2 p-2 lg: text-lg">
                      {value.month() > dayjs().month() && (
                        <ArrowLeftOutlined
                          className="cursor-pointer"
                          onClick={() => onChange(value.subtract(1, "month"))}
                        />
                      )}
                      <p>
                        {value.localeData().months(value)} {value.year()}
                      </p>
                      {value.month() <= dayjs().month() && (
                        <ArrowRightOutlined
                          className="cursor-pointer"
                          onClick={() => onChange(value.add(1, "month"))}
                        />
                      )}
                    </div>
                  </>
                );
              }}
              validRange={[
                dayjs(paramsMovie.primary_release_date_gte),
                dayjs(paramsMovie.primary_release_date_lte),
              ]}
              value={value}
              onSelect={(date, { source }) => {
                if (source === "date") {
                  setSelectedValue(date);
                }
                setValue(date);
              }}
            />
          </div>
        </>
      )}
    </>
  );
}
