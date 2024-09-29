"use client";

import { useAtomValue } from "jotai";

import { SimilarListComponent } from "@/components";
import { homeAtom } from "@/store";

export default function RecommendationsMovies() {
  const home = useAtomValue(homeAtom);

  return (
    <>
      <div className="mt-12 lg:mt-[72px]">
        <SimilarListComponent
          similarData={home.recommendList.data}
          title={home.recommendList.title}
        />
      </div>
    </>
  );
}
