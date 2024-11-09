"use client";

import { Spin } from "antd";
import { setCookie } from "cookies-next";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { GetUser, getToken } from "@/services/fetcher";

export default function Callback() {
  const params = useSearchParams();
  const code = params.get("code");
  const router = useRouter();

  useEffect(() => {
    if (code && typeof window !== "undefined") {
      getToken(code)
        .then((res) => {
          if (res.status === 200) {
            setCookie("google_token", res.data.access_token, {
              maxAge: 604800,
            });
            GetUser(res.data.access_token).then((resUser) => {
              const access_token = resUser.access_token;

              setCookie("access_token", access_token, { maxAge: 604800 });
              const routeFrom = localStorage.getItem("from");

              routeFrom ? router.push(routeFrom) : router.push("/home");
              localStorage.removeItem("from");
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      router.push("/home");
    }
  }, [code, router]);

  return (
    <>
      <Spin fullscreen spinning />
    </>
  );
}
