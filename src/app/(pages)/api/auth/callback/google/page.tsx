"use client";

import { GetUser, getToken } from "@/services/auth/fetcher";
import { Spin } from "antd";
import { setCookie } from "cookies-next";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Callback() {
  const params = useSearchParams();
  const code = params.get("code");
  const router = useRouter();

  useEffect(() => {
    if (code) {
      getToken(code)
        .then((res) => {
          if (res.status === 200) {
            GetUser(res.data.access_token).then((resUser) => {
              const access_token = resUser.access_token;
              setCookie("access_token", access_token);
              router.push("/home");
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
      <Spin spinning fullscreen></Spin>
    </>
  );
}
