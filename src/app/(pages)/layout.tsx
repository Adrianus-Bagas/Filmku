"use client";

import { useAtomValue } from "jotai";
import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { isSearchAtom } from "../../store/app.store";

import { Bottombar, Topbar } from "@/components";

export default function PageLayout({
  children,
}: {
  children: React.JSX.Element;
}) {
  const isSearch = useAtomValue(isSearchAtom);
  const pathname = usePathname();
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  return (
    <>
      {pathname !== "/login" && <Topbar />}
      {!isSearch ? children : <p>halo</p>}
      {pathname !== "/login" && <Bottombar />}
    </>
  );
}
