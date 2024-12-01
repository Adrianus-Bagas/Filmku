"use client";

import React from "react";
import { Modal } from "antd";
import { useAtomValue } from "jotai";
import Image from "next/image";

import { isMobileScreenAtom } from "@/store";
import Logo from "@/assets/images/TheMovie (1).png";

export const ModalAboutApp = ({
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const isMobileScreen = useAtomValue(isMobileScreenAtom);

  return (
    <>
      <Modal
        centered
        closable={false}
        footer={null}
        open={isModalOpen}
        title={<p className="text-center">About App</p>}
        width={isMobileScreen ? 300 : 500}
        onCancel={() => setIsModalOpen(false)}
      >
        <div className="flex justify-center items-center my-2">
          <Image alt="Filmku" className="w-[200px]" src={Logo} />
        </div>
        <p className="text-base md:text-lg text-justify">
          Hello, my name is Adrianus Bagas Tantyo Dananjaya, the developer of
          Filmku app. Filmku app is inspired by Vidio and IMDB, a movies
          platform app which shows information about movies or series like
          overview, credits, and release date. The signature from Filmku app is
          Schedules Menu, where users can find upcoming movies and series for
          the next 1 month in the form of Calendar UI. Filmku app is built using
          Typescript as Programming Language, Supabase as Database, Nest JS as
          Backend Framework, Next JS as Frontend Framework, and Ant Design as
          Components.
        </p>
      </Modal>
    </>
  );
};
