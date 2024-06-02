"use client";

import { useAtomValue } from "jotai";
import React from "react";

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
      {!isSearch ? children : <p>halo</p>}
      <Bottombar />
    </>
  );
}
