"use client";

import {
  ArrowLeftOutlined,
  GoogleCircleFilled,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Drawer } from "antd";
import { deleteCookie, getCookie } from "cookies-next";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { ModalAboutApp } from "../Modal";

import { initialUserAtomValue, userAtom } from "@/store";
import { signOut } from "@/services/fetcher";
import {
  authGoogleUrl,
  clientId,
  redirectUri,
  responseType,
  scope,
  state,
} from "@/config";
import {
  FavoriteIcon,
  HistoryListIcon,
  InfoIcon,
  LogoutIcon,
  WatchlistsIcon,
} from "@/assets/icons";

export const DrawerProfile = ({
  openProfile,
  setOpenProfile,
}: {
  openProfile: boolean;
  setOpenProfile: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useAtom(userAtom);

  const [greeting, setGreeting] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleSignOut = () => {
    if (getCookie("google_token")) {
      signOut(getCookie("google_token") ?? "")
        .then(() => {
          setOpenProfile(false);
          deleteCookie("access_token");
          deleteCookie("google_token");
          setUser(initialUserAtomValue);
          window.location.reload();
        })
        .catch(() => {
          setOpenProfile(false);
          deleteCookie("access_token");
          deleteCookie("google_token");
          setUser(initialUserAtomValue);
          window.location.reload();
        });
    } else {
      setOpenProfile(false);
      deleteCookie("access_token");
      deleteCookie("google_token");
      setUser(initialUserAtomValue);
      window.location.reload();
    }
  };

  const listMenu = [
    {
      path: "/favorites",
      name: "Favorites",
      icon: <FavoriteIcon className="w-10 h-10 fill-white" />,
      enable: getCookie("access_token") ? true : false,
    },
    {
      path: "/history",
      name: "History",
      icon: <HistoryListIcon className="w-10 h-10 fill-white" />,
      enable: getCookie("access_token") ? true : false,
    },
    {
      path: "/watchlist",
      name: "Watchlist",
      icon: <WatchlistsIcon className="w-10 h-10 fill-white" />,
      enable: getCookie("access_token") ? true : false,
    },
    {
      path: "/about",
      name: "About App",
      icon: <InfoIcon className="w-10 h-10 fill-white" />,
      enable: true,
    },
  ];

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
  }, []);

  return (
    <>
      <Drawer
        closeIcon={<ArrowLeftOutlined className="text-[24px] text-white" />}
        height="100%"
        open={openProfile}
        placement="bottom"
        style={{ color: "white", backgroundColor: "black" }}
        styles={{
          body: {
            padding: 0,
          },
        }}
        title={<p className="text-white">Profile</p>}
        width="100%"
        onClose={() => {
          setOpenProfile(false);
        }}
      >
        <ModalAboutApp isModalOpen={openModal} setIsModalOpen={setOpenModal} />
        <div className="p-2">
          <div className="flex items-center gap-3 shrink-0">
            <div>
              <Avatar
                icon={
                  !user.image ? (
                    <UserOutlined className="text-5xl" />
                  ) : undefined
                }
                src={user.image ? user.image : undefined}
                style={
                  !user.image
                    ? {
                        backgroundColor: "gray",
                        width: "100px",
                        height: "100px",
                      }
                    : {
                        width: "100px",
                        height: "100px",
                      }
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              {user.fullName ? (
                <div className="text-xl">
                  <p>{greeting}</p>
                  <p className="break-words">{user.fullName}</p>
                </div>
              ) : (
                <p className="text-xl">You have&apos;nt signed in</p>
              )}
              {getCookie("access_token") ? (
                <div
                  className="cursor-pointer flex items-center hover:opacity-50"
                  onClick={handleSignOut}
                >
                  <LogoutIcon className="w-6 h-6" fill="white" />
                  <p className="pl-3">Logout</p>
                </div>
              ) : (
                <div
                  className="cursor-pointer flex items-center hover:opacity-50 bprder-white border-2 rounded-md p-2"
                  onClick={() => {
                    localStorage.setItem("from", pathname);
                    router.push(
                      `${authGoogleUrl}?client_id=${clientId}&scope=${scope}&response_type=${responseType}&redirect_uri=${redirectUri}&state=${state}`,
                    );
                  }}
                >
                  <GoogleCircleFilled className="text-3xl fill-white" />
                  <p className="pl-3">Login With Google</p>
                </div>
              )}
            </div>
          </div>
          <div className="my-10">
            {listMenu
              .filter((item) => item.enable)
              .map((menu, index) => (
                <div
                  key={index}
                  className={`border-t-2 ${menu.name.includes("About") && "border-b-2"} border-y-white flex items-center gap-3 p-3`}
                  onClick={() => {
                    if (menu.name.includes("About")) {
                      setOpenModal(true);
                    } else {
                      router.push(menu.path);
                      setOpenProfile(false);
                    }
                  }}
                >
                  {menu.icon}
                  <p>{menu.name}</p>
                </div>
              ))}
          </div>
        </div>
      </Drawer>
    </>
  );
};
