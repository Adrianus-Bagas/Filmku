import dayjs, { Dayjs } from "dayjs";
import { atom } from "jotai";

import {
  MovieListInterface,
  MoviePageInterface,
  RequestParamMovieSchedule,
  RequestParamSeriesSchedule,
  SeriesListInterface,
} from "@/interfaces";

export const initialMoviePageAtomValue: MoviePageInterface = {
  carouselData: [],
  nowPlaying: [],
  popular: [],
  topRated: [],
};

export const movieAtom = atom<MoviePageInterface>(initialMoviePageAtomValue);

export const paramsScheduleMovieAtom = atom<RequestParamMovieSchedule>({
  primary_release_date_gte: dayjs().startOf("month").format("YYYY-MM-DD"),
  primary_release_date_lte: dayjs()
    .startOf("month")
    .add(2, "month")
    .format("YYYY-MM-DD"),
});

export const paramsScheduleSeriesAtom = atom<RequestParamSeriesSchedule>({
  first_on_air_date_gte: dayjs().startOf("month").format("YYYY-MM-DD"),
  first_on_air_date_lte: dayjs()
    .startOf("month")
    .add(2, "month")
    .format("YYYY-MM-DD"),
});

export const valueAtom = atom<Dayjs>(dayjs());
export const valueSelectAtom = atom<Dayjs>(dayjs());

export const filteredMovieScheduleAtom = atom<MovieListInterface[]>([]);
export const filteredSeriesScheduleAtom = atom<SeriesListInterface[]>([]);
