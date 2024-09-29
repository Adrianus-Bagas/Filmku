"use client";

import { Modal, Rate } from "antd";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";

import { MovieListInterface, SeriesListInterface } from "@/interfaces";

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
        closable
        footer={null}
        open={openModal}
        title={title}
        onCancel={() => setOpenModal(false)}
      >
        <div className="overflow-y-scroll">
          {movieList.map((i) => (
            <div
              key={i.id}
              className="flex gap-2 items-center my-2 cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100"
            >
              <Image
                alt={i.title}
                className="w-[100px] h-[150px] md:w-[150px] md:h-[200px] rounded-lg cursor-pointer"
                height={200}
                src={`https://image.tmdb.org/t/p/original${i.poster_path}`}
                width={150}
                onClick={() => router.push(`/movies/${i.id}`)}
              />
              <div>
                <p>{i.title}</p>
                <Rate allowHalf disabled value={i.vote_average / 2} />
              </div>
            </div>
          ))}
          {seriesList.map((i) => (
            <div
              key={i.id}
              className="flex gap-2 items-center my-2 cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100"
            >
              <Image
                alt={i.name}
                className="w-[100px] h-[150px] md:w-[150px] md:h-[200px] rounded-lg cursor-pointer"
                height={200}
                src={`https://image.tmdb.org/t/p/original${i.poster_path}`}
                width={150}
                onClick={() => router.push(`/series/${i.id}`)}
              />
              <div>
                <p>{i.name}</p>
                <Rate allowHalf disabled value={i.vote_average / 2} />
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
};

export { ModalScheduleComponent };
