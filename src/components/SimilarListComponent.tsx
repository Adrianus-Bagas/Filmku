"use client";

import React from "react";

import { RenderPosterListComponent } from ".";

import { CardData } from "@/interfaces";

export const SimilarListComponent = ({
  similarData,
  setLoading,
  title,
}: {
  similarData: CardData[];
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
}) => {
  return (
    <>
      <div className="px-2 flex flex-col justify-center items-center">
        <div className="py-5 font-bold md:text-xl text-center">
          <p>{title}</p>
        </div>
        <div className="grid grid-cols-3 gap-2 md:grid-cols-6">
          {similarData.map((data) => (
            <RenderPosterListComponent
              key={data.id}
              data={data}
              setLoading={setLoading}
              title={title || ""}
            />
          ))}
        </div>
      </div>
    </>
  );
};
