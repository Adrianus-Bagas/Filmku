"use client";

import React, { Suspense, useEffect } from "react";
import { FloatButton } from "antd";
import { usePathname } from "next/navigation";
import { useSetAtom } from "jotai";

import { Bottombar, Topbar } from "@/components";
import { initialSearchAtomValue, searchAtom } from "@/store";

export default function PageLayout({
  children,
}: {
  children: React.JSX.Element;
}) {
  const pathname = usePathname();
  const setSearch = useSetAtom(searchAtom);

  useEffect(() => {
    !pathname.includes("search") && setSearch(initialSearchAtomValue);
  }, [pathname]);

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
