"use client";

import { useAtomValue } from "jotai";
import React, { Suspense } from "react";

import { isSearchAtom } from "../../store/app.store";

import { Bottombar, Topbar } from "@/components";

export default function PageLayout({
  children,
}: {
  children: React.JSX.Element;
}) {
  const isSearch = useAtomValue(isSearchAtom);

  return (
    <>
      <Topbar />
      {!isSearch ? (
        <Suspense fallback={<></>}>
          <div className="min-h-screen bg-[#364d79] text-white pb-20">
            {children}
          </div>
        </Suspense>
      ) : (
        <p>halo</p>
      )}
      <Bottombar />
    </>
  );
}
