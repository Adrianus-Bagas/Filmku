"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Avatar, Input, Popover } from "antd";
import {
  ArrowLeftOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useAtom } from "jotai";
import { deleteCookie, getCookie } from "cookies-next";

import { menu } from "@/utils/constants";
import Logo from "@/assets/images/TheMovie (1).png";
import { isSearchAtom } from "@/store/app.store";
import { LogoutIcon } from "@/assets/icons";
import { useGetUser } from "@/services/user/hooks";

export const Topbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isSearch, setIsSearch] = useAtom(isSearchAtom);
  const { data: dataUser } = useGetUser();

  console.log(dataUser);

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
            <div className="grid grid-rows-4 gap-3">
              <div
                className="cursor-pointer flex items-center hover:opacity-50"
                onClick={() => {
                  deleteCookie("access_token");
                  window.location.reload();
                }}
              >
                <LogoutIcon className="w-3 h-3" />
                <p className="pl-3">Favorites</p>
              </div>
              <div
                className="cursor-pointer flex items-center hover:opacity-50"
                onClick={() => {
                  deleteCookie("access_token");
                  window.location.reload();
                }}
              >
                <LogoutIcon className="w-3 h-3" />
                <p className="pl-3">Watchlist</p>
              </div>
              <div
                className="cursor-pointer flex items-center hover:opacity-50"
                onClick={() => {
                  deleteCookie("access_token");
                  window.location.reload();
                }}
              >
                <LogoutIcon className="w-3 h-3" />
                <p className="pl-3">Rated</p>
              </div>
              <div
                className="cursor-pointer flex items-center hover:opacity-50"
                onClick={() => {
                  deleteCookie("access_token");
                  window.location.reload();
                }}
              >
                <LogoutIcon className="w-3 h-3" />
                <p className="pl-3">Sign Out</p>
              </div>
            </div>
          ) : (
            <div
              className="cursor-pointer flex items-center hover:opacity-50"
              onClick={(event) => {
                event.preventDefault();
                window.location.href =
                  "http://localhost:3000/api/auth/callback/google";
              }}
            >
              <LogoutIcon className="w-6 h-6" />
              <p className="pl-3">Sign In With Google</p>
            </div>
          )
        }
        title={dataUser ? dataUser?.data?.fullName : ""}
        trigger="click"
      >
        <Avatar
          src={dataUser ? dataUser?.data?.image : undefined}
          icon={!dataUser ? <UserOutlined /> : undefined}
          style={!dataUser ? { backgroundColor: "gray" } : undefined}
        />
      </Popover>
    );
  };

  return (
    <>
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
      <div className="w-full bg-black top-0 fixed z-10 hidden lg:flex lg:justify-between lg:items-center lg:px-3">
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
            className="pr-3"
            placeholder="Search In Filmku"
            onSearch={(value) => console.log(value)}
          />
          <PopOverProfile />
        </div>
      </div>
    </>
  );
};
