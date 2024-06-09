"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Avatar, Input, Popover, Spin } from "antd";
import {
  ArrowLeftOutlined,
  CaretDownOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useAtom } from "jotai";
import { deleteCookie, getCookie } from "cookies-next";

import { menu } from "@/utils/constants";
import Logo from "@/assets/images/TheMovie (1).png";
import { isSearchAtom } from "@/store/app.store";
import { FavoriteIcon, LogoutIcon, WatchlistsIcon } from "@/assets/icons";
import { useGetUser } from "@/services/user/hooks";
import {
  authGoogleUrl,
  clientId,
  redirectUri,
  responseType,
  scope,
  state,
} from "@/config";
import { signOut } from "@/services/auth/fetcher";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

export const Topbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isSearch, setIsSearch] = useAtom(isSearchAtom);
  const { data: dataUser, isFetching } = useGetUser();
  const [greeting, setGreeting] = useState<string>("");
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    const hour = dayjs().get("hours");
    if (hour > 17) {
      setGreeting("Good Evening");
    } else if (hour > 10) {
      setGreeting("Good Afternoon");
    } else if (hour > 6) {
      setGreeting("Good Morning");
    } else {
      setGreeting("It's Sleep Time");
    }
    setMounted(true);
  }, []);

  const LogoImage = ({ className }: { className?: string }) => {
    return (
      <Image
        alt="Filmku"
        className={className}
        src={Logo}
        onClick={() => {
          router.push("/home");
          setIsSearch(false);
        }}
      />
    );
  };

  const PopOverProfile = () => {
    return (
      <Popover
        className="cursor-pointer"
        content={
          getCookie("access_token") ? (
            <div className="grid grid-rows-3 gap-3">
              <div
                className="cursor-pointer flex items-center hover:opacity-50"
                onClick={() => {
                  deleteCookie("access_token");
                  window.location.reload();
                }}
              >
                <FavoriteIcon className="w-3 h-3" />
                <p className="pl-3">Favorites</p>
              </div>
              <div
                className="cursor-pointer flex items-center hover:opacity-50"
                onClick={() => {
                  deleteCookie("access_token");
                  window.location.reload();
                }}
              >
                <WatchlistsIcon className="w-3 h-3" />
                <p className="pl-3">Watchlist</p>
              </div>
              <div
                className="cursor-pointer flex items-center hover:opacity-50"
                onClick={() => {
                  signOut(getCookie("google_token") ?? "").then(() => {
                    deleteCookie("access_token");
                    deleteCookie("google_token");
                    window.location.reload();
                  });
                }}
              >
                <LogoutIcon className="w-3 h-3" />
                <p className="pl-3">Logout</p>
              </div>
            </div>
          ) : (
            <div
              className="cursor-pointer flex items-center hover:opacity-50"
              onClick={() => {
                router.push(
                  `${authGoogleUrl}?client_id=${clientId}&scope=${scope}&response_type=${responseType}&redirect_uri=${redirectUri}&state=${state}`,
                );
              }}
            >
              <LogoutIcon className="w-6 h-6" />
              <p className="pl-3">Login With Google</p>
            </div>
          )
        }
        title={
          dataUser ? (
            <div>
              <p>{greeting}</p>
              <p>{dataUser?.data?.fullName}</p>
            </div>
          ) : (
            ""
          )
        }
        trigger="click"
      >
        <div className="flex justify-center items-center gap-2">
          <Avatar
            src={dataUser ? dataUser?.data?.image : undefined}
            icon={!dataUser ? <UserOutlined /> : undefined}
            style={!dataUser ? { backgroundColor: "gray" } : undefined}
          />
          <p className="text-white hidden lg:inline-block">
            {dataUser?.data?.fullName?.split(" ")?.slice(0, 1) || "Login"}
          </p>
          <CaretDownOutlined className="text-white hidden lg:inline-block" />
        </div>
      </Popover>
    );
  };

  return (
    <>
      {mounted && (
        <>
          {isFetching && <Spin spinning fullscreen></Spin>}
          {isSearch ? (
            <div className="py-3 w-full bg-black top-0 fixed z-10 lg:hidden flex items-center justify-between px-3">
              <ArrowLeftOutlined
                className="text-[24px] pr-3 text-white"
                onClick={() => setIsSearch(false)}
              />
              <Input.Search
                placeholder="Search In Filmku"
                onSearch={(value) => console.log(value)}
              />
            </div>
          ) : (
            <div className="py-3 w-full bg-black top-0 fixed z-10 lg:hidden flex items-center justify-between px-3">
              <LogoImage className="w-[100px] cursor-pointer" />
              <div className="flex justify-center items-center">
                <SearchOutlined
                  className="text-[24px] pr-3 text-white"
                  onClick={() => setIsSearch(true)}
                />
                <PopOverProfile />
              </div>
            </div>
          )}
          <div className="w-full py-2 bg-black top-0 fixed z-10 hidden lg:flex lg:justify-between lg:items-center lg:px-3">
            <div className="flex items-center">
              <LogoImage className="w-[200px] px-3 cursor-pointer" />
              {menu.map((i, index) => (
                <div
                  key={index}
                  className={`${i.path === pathname && pathname !== "/" ? "opacity-100" : "opacity-50"} bg-black p-3`}
                >
                  <p
                    className="text-white px-3 cursor-pointer hover:opacity-50"
                    onClick={() => router.push(i.path)}
                  >
                    {i.name}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex justify-center items-center">
              <Input.Search
                className="pr-10"
                placeholder="Search In Filmku"
                onSearch={(value) => console.log(value)}
              />
              <PopOverProfile />
            </div>
          </div>
        </>
      )}
    </>
  );
};
