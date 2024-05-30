"use client";

import { useAtomValue } from "jotai";
import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getCookie } from "cookies-next";

import { isSearchAtom } from "../../store/app.store";

import { Bottombar, Topbar } from "@/components";

export default function PageLayout({
  children,
}: {
  children: React.JSX.Element;
}) {
  const isSearch = useAtomValue(isSearchAtom);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    getCookie("access_token") && router.push("/home");
  }, [router]);

  return (
    <>
      {pathname !== "/login" && <Topbar />}
      {!isSearch ? children : <p>halo</p>}
      {pathname !== "/login" && <Bottombar />}
    </>
  );
}
