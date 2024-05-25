"use client";

import { useAtomValue } from "jotai";
import React from "react";

import { isSearchAtom } from "../store/app.store";

export default function PageLayout({
  children,
}: {
  children: React.JSX.Element;
}) {
  const isSearch = useAtomValue(isSearchAtom);

  return <>{!isSearch ? children : <p>halo</p>}</>;
}
