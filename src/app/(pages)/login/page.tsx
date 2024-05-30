"use client";

import React, { useEffect } from "react";
import { GoogleCircleFilled } from "@ant-design/icons";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";

import Logo from "@/assets/images/TheMovie (1).png";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    getCookie("access_token") && router.push("/home");
  }, [router]);

  return (
    <>
      {!getCookie("access_token") && (
        <div className="flex justify-center items-center h-screen px-3">
          <Card
            actions={[
              <div
                key="login-google"
                className="flex justify-between px-2 cursor-pointer"
              >
                <GoogleCircleFilled
                  className="text-3xl"
                  onClick={(event) => {
                    event.preventDefault();
                    window.location.href =
                      "http://localhost:3000/api/auth/callback/google";
                  }}
                />
                <p>Sign In With Google</p>
              </div>,
            ]}
            cover={<Image alt="example" className="p-1" src={Logo} />}
            style={{ width: 300 }}
          >
            <Meta
              className="text-center"
              description="Explore Your Movie"
              title="Filmku"
            />
          </Card>
        </div>
      )}
    </>
  );
}
