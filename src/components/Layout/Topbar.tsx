"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Avatar, Input, Popover, Spin } from "antd";
import {
  ArrowLeftOutlined,
  CaretDownOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useAtom, useAtomValue } from "jotai";
import { deleteCookie, getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import Marquee from "react-fast-marquee";

import { ModalAboutApp, ModalLogin } from "..";

import { menuDesktop } from "@/utils";
import Logo from "@/assets/images/TheMovie (1).png";
import { homeAtom, initialUserAtomValue, searchAtom, userAtom } from "@/store";
import { InfoIcon, LogoutIcon } from "@/assets/icons";
import { useGetUser } from "@/services/hooks";
import {
  authGoogleUrl,
  clientId,
  redirectUri,
  responseType,
  scope,
  state,
} from "@/config";
import { signOut } from "@/services/fetcher";

export const Topbar = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const home = useAtomValue(homeAtom);
  const [search, setSearch] = useAtom(searchAtom);
  const [user, setUser] = useAtom(userAtom);

  const { data: dataUser, isFetching } = useGetUser();

  const [greeting, setGreeting] = useState<string>("");
  const [mounted, setMounted] = useState<boolean>(false);
  const [openModalLogin, setOpenModalLogin] = useState<boolean>(false);
  const [openModalAboutApp, setOpenModalAboutApp] = useState<boolean>(false);
  const [openSearch, setOpenSearch] = useState<boolean>(false);

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

  useEffect(() => {
    if (dataUser) {
      setUser({
        ...user,
        ...dataUser,
      });
    }
  }, [dataUser]);

  const handleSignOut = () => {
    if (getCookie("google_token")) {
      signOut(getCookie("google_token") ?? "")
        .then(() => {
          deleteCookie("access_token");
          deleteCookie("google_token");
          setUser(initialUserAtomValue);
          window.location.reload();
        })
        .catch(() => {
          deleteCookie("access_token");
          deleteCookie("google_token");
          setUser(initialUserAtomValue);
          window.location.reload();
        });
    } else {
      deleteCookie("access_token");
      deleteCookie("google_token");
      setUser(initialUserAtomValue);
      window.location.reload();
    }
  };

  const LogoImage = ({ className }: { className?: string }) => {
    return (
      <Image
        alt="Filmku"
        className={className}
        src={Logo}
        onClick={() => {
          router.push("/home");
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
            <div className="flex flex-col gap-3">
              <div
                className="cursor-pointer flex items-center hover:opacity-50"
                onClick={() => setOpenModalAboutApp(true)}
              >
                <InfoIcon className="w-3 h-3" fill="black" />
                <p className="pl-3">About App</p>
              </div>
              <div
                className="cursor-pointer flex items-center hover:opacity-50"
                onClick={handleSignOut}
              >
                <LogoutIcon className="w-3 h-3" />
                <p className="pl-3">Logout</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <div
                className="cursor-pointer flex items-center hover:opacity-50"
                onClick={() => setOpenModalAboutApp(true)}
              >
                <InfoIcon className="w-6 h-6" fill="black" />
                <p className="pl-3">About App</p>
              </div>
              <div
                className="cursor-pointer flex items-center hover:opacity-50"
                onClick={() => {
                  localStorage.setItem("from", pathname);
                  router.push(
                    `${authGoogleUrl}?client_id=${clientId}&scope=${scope}&response_type=${responseType}&redirect_uri=${redirectUri}&state=${state}`,
                  );
                }}
              >
                <LogoutIcon className="w-6 h-6" />
                <p className="pl-3">Login With Google</p>
              </div>
            </div>
          )
        }
        title={
          dataUser ? (
            <div>
              <p>{greeting}</p>
              <p>{dataUser?.fullName}</p>
            </div>
          ) : (
            ""
          )
        }
        trigger="click"
      >
        <div className="flex justify-center items-center gap-2">
          <Avatar
            icon={!dataUser ? <UserOutlined /> : undefined}
            src={dataUser ? dataUser?.image : undefined}
            style={!dataUser ? { backgroundColor: "gray" } : undefined}
          />
          <p className="text-white hidden lg:inline-block">
            {dataUser?.fullName?.split(" ")?.slice(0, 1) || "Login"}
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
          {isFetching && <Spin fullscreen spinning />}
          <ModalLogin
            openModalLogin={openModalLogin}
            setOpenModalLogin={setOpenModalLogin}
          />
          <ModalAboutApp
            isModalOpen={openModalAboutApp}
            setIsModalOpen={setOpenModalAboutApp}
          />
          {pathname.includes("search") && !searchParams.get("searchfor") ? (
            <div className="py-3 w-full bg-black top-0 fixed z-10 lg:hidden flex items-center justify-between px-3">
              <ArrowLeftOutlined
                className="text-[24px] pr-3 text-white"
                onClick={() => {
                  router.back();
                }}
              />
              <Input.Search
                placeholder="Search In Filmku"
                onSearch={(value) => {
                  setSearch({
                    ...search,
                    query: value,
                  });
                  router.push("/search");
                }}
              />
            </div>
          ) : pathname.includes("recommendations") ||
            pathname.includes("trending") ||
            pathname.includes("upcoming") ||
            searchParams.get("searchfor") ? (
            <div className="py-3 w-full bg-black top-0 fixed z-10 lg:hidden flex items-center justify-between px-3">
              <ArrowLeftOutlined
                className="text-[24px] pr-3 text-white"
                onClick={() => {
                  router.back();
                }}
              />
              <Marquee pauseOnHover speed={35}>
                <p className="text-white">
                  {home.recommendList.title}&emsp;&emsp;&emsp;&emsp;&emsp;
                </p>
              </Marquee>
            </div>
          ) : (
            <div className="py-3 w-full bg-black top-0 fixed z-10 lg:hidden flex items-center justify-between gap-3 px-3">
              <LogoImage className="w-[100px] cursor-pointer" />
              {openSearch && (
                <Input.Search
                  placeholder="Search In Filmku"
                  onSearch={(value) => {
                    setSearch({
                      ...search,
                      query: value,
                    });
                    router.push("/search");
                  }}
                />
              )}
              <div className="flex justify-center items-center">
                <SearchOutlined
                  className="text-[24px] pr-3 text-white"
                  onClick={() => setOpenSearch((prev) => !prev)}
                />
              </div>
            </div>
          )}
          <div className="w-full py-2 bg-black top-0 fixed z-10 hidden lg:flex lg:justify-between lg:items-center lg:px-3">
            <div className="flex items-center">
              <LogoImage className="w-[200px] px-3 cursor-pointer" />
              {menuDesktop.slice(0, 3).map((i, index) => (
                <div
                  key={index}
                  className={`${i.path === pathname && pathname !== "/" ? "opacity-100" : "opacity-50"} bg-black p-3`}
                >
                  <p
                    className="text-white px-3 cursor-pointer hover:opacity-50"
                    onClick={() => {
                      if (
                        (i.path === "/favorites" ||
                          i.path === "/history" ||
                          i.path === "/watchlist") &&
                        !getCookie("access_token")
                      ) {
                        setOpenModalLogin(true);
                      } else {
                        router.push(i.path);
                      }
                    }}
                  >
                    {i.name}
                  </p>
                </div>
              ))}
              {getCookie("access_token") && (
                <Popover
                  className="cursor-pointer bg-black"
                  content={
                    <div className="bg-black flex flex-col">
                      {menuDesktop.slice(3).map((item, index) => (
                        <p
                          key={index}
                          className="text-white opacity-50 text-lg p-4 cursor-pointer"
                          onClick={() => router.push(item.path)}
                        >
                          {item.name}
                        </p>
                      ))}
                    </div>
                  }
                  overlayInnerStyle={{ padding: 0 }}
                  placement="bottomRight"
                >
                  <div className="flex justify-center items-center gap-2 text-white opacity-50">
                    <p>More</p>
                    <CaretDownOutlined />
                  </div>
                </Popover>
              )}
            </div>
            <div className="flex justify-center items-center">
              <Input.Search
                className="pr-10"
                placeholder="Search In Filmku"
                onSearch={(value) => {
                  setSearch({
                    ...search,
                    query: value,
                  });
                  router.push("/search");
                }}
              />
              <PopOverProfile />
            </div>
          </div>
        </>
      )}
    </>
  );
};
