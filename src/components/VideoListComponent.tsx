"use client";

import { MovieVideoInterface } from "@/interfaces/movies.interfaces";
import { List } from "antd";

export default function VideoListComponent({
  videos,
}: {
  videos: MovieVideoInterface[];
}) {
  return (
    <>
      <List
        className="relative"
        itemLayout="vertical"
        size="large"
        dataSource={videos}
        renderItem={(item) => (
          <List.Item
            className="cursor-pointer hover:bg-gray-900 transition duration-300 ease-in-out"
            key={item.id}
            extra={
              <img
                width={200}
                src={`https://img.youtube.com/vi/${item.key}/mqdefault.jpg`}
              />
            }
          >
            <List.Item.Meta
              className="text-center md:text-left"
              title={<p className="text-white">{item.name}</p>}
              description={<p className="text-white">Source: {item.site}</p>}
            />
          </List.Item>
        )}
      />
    </>
  );
}
