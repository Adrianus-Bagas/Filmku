"use client";

import React, { Suspense, useEffect } from "react";
import { FloatButton } from "antd";
import { usePathname } from "next/navigation";
import { useSetAtom } from "jotai";

import { Bottombar, Topbar } from "@/components";
import {
  initialSearchAtomValue,
  isMobileScreenAtom,
  searchAtom,
} from "@/store";

export default function PageLayout({
  children,
}: {
  children: React.JSX.Element;
}) {
  const pathname = usePathname();
  const setSearch = useSetAtom(searchAtom);
  const setIsMobileScreen = useSetAtom(isMobileScreenAtom);

  useEffect(() => {
    !pathname.includes("search") && setSearch(initialSearchAtomValue);
  }, [pathname]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobileScreen(window.innerWidth < 768);

      window.addEventListener("resize", () => {
        setIsMobileScreen(window.innerWidth < 768);
      });

      return () => {
        window.removeEventListener("resize", () => {});
      };
    }
  }, []);

  return (
    <>
      <Suspense fallback={<></>}>
        <Topbar />
        <div className="min-h-screen bg-black text-white pb-20">
          <>{children}</>
        </div>
        <FloatButton.BackTop />
        <Bottombar />
      </Suspense>
    </>
  );
}
