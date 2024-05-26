"use client";

import React, { useEffect } from "react";
import { GithubFilled, GoogleCircleFilled } from "@ant-design/icons";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Logo from "@/assets/images/TheMovie (1).png";

export default function LoginPage() {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/home");
    }
  }, [status, router]);

  return (
    <>
      {status === "unauthenticated" && (
        <div className="flex justify-center items-center h-screen px-3">
          <Card
            actions={[
              <div
                key="login-google"
                className="flex justify-between px-2 cursor-pointer"
              >
                <GoogleCircleFilled
                  className="text-3xl"
                  onClick={() => signIn("google")}
                />
                <p>Sign In With Google</p>
              </div>,
              <div
                key="login-github"
                className="flex justify-between px-2 cursor-pointer"
              >
                <GithubFilled
                  className="text-3xl"
                  onClick={() => signIn("github")}
                />
                <p>Sign In With Github</p>
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
