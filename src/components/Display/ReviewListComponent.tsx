"use client";

import React from "react";
import { Avatar, ConfigProvider, List } from "antd";
import { UserOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { Input } from "antd";
import { useAtomValue } from "jotai";

import { ReviewListInterface } from "@/interfaces";
import { userAtom } from "@/store";

const { TextArea } = Input;

export const ReviewListComponent = ({
  reviewList,
}: {
  reviewList: ReviewListInterface[];
}) => {
  const user = useAtomValue(userAtom);

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 shrink-0">
        <div>
          <Avatar
            icon={!user.image ? <UserOutlined /> : undefined}
            size={50}
            src={user.image ? user.image : undefined}
            style={!user.image ? { backgroundColor: "gray" } : undefined}
          />
        </div>
        <ConfigProvider
          theme={{
            components: {
              Input: {
                lineWidth: 1,
              },
            },
          }}
        >
          <TextArea autoSize placeholder="Add Comment" />
        </ConfigProvider>
      </div>
      <List
        dataSource={reviewList}
        itemLayout="vertical"
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
                <p className="text-white text-[10px]">
                  {dayjs(item.updated_at).format("DD/MM/YYYY HH:mm")}
                </p>
              }
              title={
                <p className="text-white text-[10px]">
                  @{item.author_details.username}
                </p>
              }
            />
            <p className="text-white text-xs text-justify">{item.content}</p>
          </List.Item>
        )}
      />
    </div>
  );
};
