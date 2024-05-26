"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Avatar, Input, Popover } from "antd";
import { ArrowLeftOutlined, SearchOutlined } from "@ant-design/icons";
import { useAtom } from "jotai";
import { signOut, useSession } from "next-auth/react";

import { menu } from "@/utils/constants";
import Logo from "@/assets/images/TheMovie (1).png";
import { isSearchAtom } from "@/store/app.store";
import { LogoutIcon } from "@/assets/icons";

export const Topbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isSearch, setIsSearch] = useAtom(isSearchAtom);
  const { data: userInfo } = useSession();

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
          <div
            className="cursor-pointer px-3 flex justify-center items-center hover:opacity-50"
            onClick={() =>
              signOut({ callbackUrl: "/login", redirect: false }).then(() =>
                router.push("/login"),
              )
            }
          >
            <LogoutIcon className="w-6 h-6" />
            <p className="pl-3">Logout</p>
          </div>
        }
        title={userInfo?.user?.name}
        trigger="click"
      >
        <Avatar src={userInfo?.user?.image} />
      </Popover>
    );
  };

  return (
    <>
      {isSearch ? (
        <div className="py-3 w-full bg-black top-0 fixed z-10 lg:hidden flex items-center justify-between px-3">
          <ArrowLeftOutlined
            className="text-[24px] pr-3"
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
              className="text-[24px] pr-3"
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
