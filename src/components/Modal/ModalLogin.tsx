"use client";

import { Modal } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

import {
  authGoogleUrl,
  clientId,
  redirectUri,
  responseType,
  scope,
  state,
} from "@/config";
import { LogoutIcon } from "@/assets/icons";

export const ModalLogin = ({
  openModalLogin,
  setOpenModalLogin,
}: {
  openModalLogin: boolean;
  setOpenModalLogin: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();

  return (
    <>
      <Modal
        centered
        closable={false}
        footer={null}
        open={openModalLogin}
        width={300}
        onCancel={() => {
          localStorage.removeItem("from");
          setOpenModalLogin(false);
        }}
      >
        <div className="flex flex-col items-center">
          <div
            className="flex items-center p-3 bg-[#364d79] w-fit rounded-lg cursor-pointer transition duration-300 ease-in-out hover:opacity-70"
            onClick={() => {
              router.push(
                `${authGoogleUrl}?client_id=${clientId}&scope=${scope}&response_type=${responseType}&redirect_uri=${redirectUri}&state=${state}`,
              );
            }}
          >
            <LogoutIcon className="w-6 h-6" fill="white" />
            <p className="pl-3 text-white">Login With Google</p>
          </div>
        </div>
      </Modal>
    </>
  );
};
