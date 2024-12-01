"use client";

import { Modal } from "antd";
import React from "react";

export const ModalConfirm = ({
  openModal,
  setOpenModal,
  onConfirm,
}: {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm: () => void;
}) => {
  return (
    <>
      <Modal
        centered
        closable={false}
        footer={
          <div className="flex flex-col items-center">
            <div className="flex gap-2 text-white">
              <div
                className="flex justify-center items-center p-2 bg-red-500 w-10 rounded-lg cursor-pointer transition duration-300 ease-in-out hover:opacity-70"
                onClick={() => setOpenModal(false)}
              >
                <p>No</p>
              </div>
              <div
                className="flex justify-center items-center p-2 bg-green-500 w-10 rounded-lg cursor-pointer transition duration-300 ease-in-out hover:opacity-70"
                onClick={onConfirm}
              >
                <p>Yes</p>
              </div>
            </div>
          </div>
        }
        open={openModal}
        width={300}
        onCancel={() => setOpenModal(false)}
      >
        <div className="flex flex-col items-center">
          <p>Are you sure to continue this activity ?</p>
        </div>
      </Modal>
    </>
  );
};
