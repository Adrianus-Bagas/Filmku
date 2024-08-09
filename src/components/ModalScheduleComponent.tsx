"use client";

import { MovieListInterface } from "@/interfaces/movies.interfaces";
import { SeriesListInterface } from "@/interfaces/series.interface";
import { Modal, Rate } from "antd";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

const ModalScheduleComponent = ({
  movieList,
  seriesList,
  openModal,
  setOpenModal,
  title,
}: {
  movieList: MovieListInterface[];
  seriesList: SeriesListInterface[];
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  title: string;
}) => {
  const router = useRouter();
  return (
    <>
      <Modal
        centered
        title={title}
        open={openModal}
        footer={null}
        closable
        onCancel={() => setOpenModal(false)}
      >
        <div className="overflow-y-scroll">
          {movieList.map((i) => (
            <div
              key={i.id}
              className="flex gap-2 items-center my-2 cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100"
            >
              <img
                src={`https://image.tmdb.org/t/p/original${i.poster_path}`}
                className="w-[100px] h-[150px] md:w-[150px] md:h-[200px] rounded-lg cursor-pointer"
                onClick={() => router.push(`/movies/${i.id}`)}
              />
              <div>
                <p>{i.title}</p>
                <Rate disabled value={i.vote_average / 2} allowHalf />
              </div>
            </div>
          ))}
          {seriesList.map((i) => (
            <div
              key={i.id}
              className="flex gap-2 items-center my-2 cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100"
            >
              <img
                src={`https://image.tmdb.org/t/p/original${i.poster_path}`}
                className="w-[100px] h-[150px] md:w-[150px] md:h-[200px] rounded-lg cursor-pointer"
                onClick={() => router.push(`/series/${i.id}`)}
              />
              <div>
                <p>{i.name}</p>
                <Rate disabled value={i.vote_average / 2} allowHalf />
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
};

export { ModalScheduleComponent };
