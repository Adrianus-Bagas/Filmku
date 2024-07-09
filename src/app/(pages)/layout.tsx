"use client";

import { useAtomValue } from "jotai";
import React, { Suspense } from "react";

import { isSearchAtom } from "../../store/app.store";

import { Bottombar, Topbar } from "@/components";
import { FloatButton } from "antd";

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
          <div className="min-h-screen bg-black text-white pb-20">
            {children}
          </div>
        </Suspense>
      ) : (
        <p>halo</p>
      )}
      <FloatButton.BackTop />
      <Bottombar />
    </>
  );
}
