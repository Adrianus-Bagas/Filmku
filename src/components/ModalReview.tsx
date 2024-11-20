"use client";

import React, { useState } from "react";
import { Avatar, Drawer, List, Modal } from "antd";
import dayjs from "dayjs";
import { Input } from "antd";
import { useAtomValue } from "jotai";
import {
  ArrowLeftOutlined,
  DeleteOutlined,
  EditOutlined,
  MoreOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { ModalConfirm } from "./ModalConfirm";

import { isMobileScreenAtom, userAtom } from "@/store";
import { ReviewListInterface } from "@/interfaces";

const { TextArea } = Input;

export const ModalReview = ({
  isModalOpen,
  setIsModalOpen,
  reviewList,
  content,
  setContent,
  handleReview,
}: {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  reviewList: ReviewListInterface[];
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  handleReview: (action: "add" | "edit" | "delete", reviewId?: string) => void;
}) => {
  const user = useAtomValue(userAtom);
  const isMobileScreen = useAtomValue(isMobileScreenAtom);

  const [isMyReview, setIsMyReview] = useState<boolean>(false);
  const [isAddReview, setIsAddReview] = useState<boolean>(false);
  const [reviewId, setReviewId] = useState<string>("");
  const [openModalConfirm, setOpenModalConfirm] = useState<string>("");
  const [openEditDrawer, setOpenEditDrawer] = useState<boolean>(false);

  return (
    <>
      <Drawer
        closeIcon={<ArrowLeftOutlined className="text-[24px] text-black" />}
        footer={null}
        open={isModalOpen}
        width={isMobileScreen ? "100%" : "50%"}
        onClose={() => setIsModalOpen(false)}
      >
        <Modal
          centered
          closable={false}
          footer={null}
          open={!!reviewId}
          width={isMobileScreen ? "50%" : "25%"}
          onCancel={() => setReviewId("")}
        >
          <div className="flex justify-evenly items-center my-2">
            <div
              className="cursor-pointer mx-2 p-2 flex flex-col items-center gap-2 transition duration-300 ease-in-out hover:opacity-70 hover:bg-gray-300"
              onClick={() => {
                setOpenEditDrawer(true);
                setContent(
                  reviewList.find((item) => item.id === reviewId)?.content ||
                    "",
                );
              }}
            >
              <div className="text-lg">
                <EditOutlined />
              </div>
              <p>Edit</p>
            </div>
            <div
              className="cursor-pointer mx-2 p-2 flex flex-col items-center gap-2 transition duration-300 ease-in-out hover:opacity-70 hover:bg-gray-300"
              onClick={() => setOpenModalConfirm("delete")}
            >
              <div className="text-lg">
                <DeleteOutlined />
              </div>
              <p>Delete</p>
            </div>
          </div>
        </Modal>
        <Modal
          centered
          closable={false}
          footer={null}
          open={openEditDrawer}
          styles={{
            body: {
              padding: 0,
            },
          }}
          onCancel={() => {
            setOpenEditDrawer(false);
            setContent("");
          }}
        >
          <div className="mt-4 p-2">
            <TextArea
              rows={5}
              value={content}
              onChange={(event) => setContent(event.target.value)}
              onSubmit={() => setOpenModalConfirm("edit")}
            />
            <div
              className="bg-blue-500 mt-4 text-white border-[1px] w-fit p-2 rounded-lg text-xs border-gray-200 cursor-pointer transition duration-300 ease-in-out hover:opacity-70"
              onClick={() => setOpenModalConfirm("edit")}
            >
              Send New Review
            </div>
          </div>
        </Modal>
        <div>
          <div className="flex items-center gap-2">
            <div
              className={`${isAddReview ? "bg-blue-500 text-white" : "bg-white text-gray-700"} border-[1px] w-fit p-2 rounded-lg text-xs border-gray-200 cursor-pointer`}
              onClick={() => {
                setIsAddReview((prev) => !prev);
                isMyReview && setIsMyReview(false);
              }}
            >
              Add Review
            </div>
            <div
              className={`${isMyReview ? "bg-blue-500 text-white" : "bg-white text-gray-700"} border-[1px] w-fit p-2 rounded-lg text-xs border-gray-200 cursor-pointer`}
              onClick={() => {
                setIsMyReview((prev) => !prev);
                setContent("");
                isAddReview && setIsAddReview(false);
              }}
            >
              My Reviews
            </div>
          </div>
          {isAddReview ? (
            <div className="mt-4">
              <TextArea
                rows={5}
                value={content}
                onChange={(event) => setContent(event.target.value)}
                onSubmit={() => handleReview("add")}
              />
              <div
                className="bg-blue-500 mt-4 text-white border-[1px] w-fit p-2 rounded-lg text-xs border-gray-200 cursor-pointer transition duration-300 ease-in-out hover:opacity-70"
                onClick={() => handleReview("add")}
              >
                Send Review
              </div>
            </div>
          ) : (
            <List
              dataSource={
                isMyReview
                  ? reviewList.filter(
                      (item) => item.author_details.username === user.email,
                    )
                  : reviewList
              }
              extra={<MoreOutlined className="text-4xl" />}
              itemLayout="vertical"
              pagination={
                reviewList.length > 5
                  ? {
                      pageSize: 5,
                      position: "top",
                      align: "center",
                    }
                  : undefined
              }
              renderItem={(item) => (
                <List.Item key={item.id}>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        icon={
                          !item.author_details.avatar_path ? (
                            <UserOutlined />
                          ) : undefined
                        }
                        src={
                          item.author_details.avatar_path
                            ? item.author_details.avatar_path.includes("google")
                              ? item.author_details.avatar_path
                              : `https://image.tmdb.org/t/p/original${item.author_details.avatar_path}`
                            : undefined
                        }
                        style={
                          !item.author_details.avatar_path
                            ? { backgroundColor: "gray" }
                            : undefined
                        }
                      />
                    }
                    description={
                      <p className="text-[10px]">
                        {dayjs(item.updated_at).format("DD/MM/YYYY HH:mm")}{" "}
                        {item.updated_at !== item.created_at && "(Edited)"}
                      </p>
                    }
                    title={
                      <div className="flex justify-between">
                        <p className="text-[10px]">
                          @{item.author_details.username}
                        </p>
                        {item.author_details.username === user.email && (
                          <div
                            className="cursor-pointer"
                            onClick={() => setReviewId(item.id)}
                          >
                            <MoreOutlined />
                          </div>
                        )}
                      </div>
                    }
                  />
                  <p className="text-xs text-justify">{item.content}</p>
                </List.Item>
              )}
            />
          )}
        </div>
        <ModalConfirm
          openModal={
            openModalConfirm === "edit" || openModalConfirm === "delete"
          }
          setOpenModal={() => setOpenModalConfirm("")}
          onConfirm={() =>
            handleReview(
              openModalConfirm as "add" | "edit" | "delete",
              reviewId,
            )
          }
        />
      </Drawer>
    </>
  );
};
