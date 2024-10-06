"use client";

import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Spin } from "antd";

import { SimilarListComponent } from ".";

import { homeAtom } from "@/store";

export const ShowMoreComponent = () => {
  const home = useAtomValue(homeAtom);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (home.recommendList.data.length === 0) {
      router.replace("/home");
    }
  }, [home]);

  return (
    <>
      {loading && <Spin fullscreen size="large" />}
      <div className="mt-12 lg:mt-[72px]">
        <SimilarListComponent
          setLoading={setLoading}
          similarData={home.recommendList.data}
          title={home.recommendList.title}
        />
      </div>
    </>
  );
};
