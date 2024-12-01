"use client";

import React, { useState } from "react";
import { Modal, Spin } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { NotificationInterface } from "@/interfaces";

export const ModalNotification = ({
  isModalOpen,
  setIsModalOpen,
  notification,
}: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  notification: NotificationInterface;
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <>
      <Modal
        centered
        closable={false}
        footer={null}
        open={isModalOpen}
        width={300}
        onCancel={() => setIsModalOpen(false)}
      >
        {loading && <Spin fullscreen size="large" />}
        <div className="flex flex-col items-center gap-2">
          <p className="text-lg text-center">
            {notification.text.toUpperCase()}
          </p>
          <p className="text-lg text-center">{notification.title}</p>
          <Image
            alt={notification.title}
            className="w-[250px] h-[350px] md:w-[250px] md:h-[350px] rounded-lg cursor-pointer flex justify-center"
            height={450}
            src={`https://image.tmdb.org/t/p/original${notification.poster_path}`}
            width={300}
            onClick={() =>
              router.push(`/${notification.type}/${notification.id}`)
            }
            onLoad={() => setLoading(false)}
          />
        </div>
      </Modal>
    </>
  );
};
