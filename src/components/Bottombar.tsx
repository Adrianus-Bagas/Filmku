"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { DrawerProfile } from "./DrawerProfile";

import {
  FilmIcon,
  SeriesIcon,
  GenresIcon,
  CalendarIcon,
  ProfileIcon,
} from "@/assets/icons";
import { menuMobile } from "@/utils";

export const Bottombar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [openProfile, setOpenProfile] = useState<boolean>(false);

  return (
    <>
      <DrawerProfile
        openProfile={openProfile}
        setOpenProfile={setOpenProfile}
      />
      {!pathname.includes("search") &&
        !pathname.includes("recommendations") &&
        !pathname.includes("trending") &&
        !pathname.includes("upcoming") &&
        !openProfile && (
          <div className="w-full h-[56px] bg-black fixed bottom-0 z-10 lg:hidden inline-block py-2">
            <div className="flex justify-evenly items-center">
              {menuMobile.map((i, index) => (
                <div
                  key={index}
                  className={`${(i.path === pathname && pathname !== "/" && !openProfile) || (i.path === "/profile" && openProfile) ? "opacity-100" : "opacity-50"} bg-black p-1 cursor-pointer`}
                  onClick={() => {
                    i.path !== "/profile"
                      ? router.push(i.path)
                      : setOpenProfile(true);
                  }}
                >
                  {i.name === "Movies" && (
                    <div className="flex justify-center">
                      <FilmIcon className="w-6 h-6" />
                    </div>
                  )}
                  {i.name === "Series" && (
                    <div className="flex justify-center">
                      <SeriesIcon className="w-6 h-6 flex justify-center" />
                    </div>
                  )}
                  {i.name === "Profile" && (
                    <div className="flex justify-center">
                      <ProfileIcon className="w-6 h-6 flex justify-center" />
                    </div>
                  )}
                  {i.name === "Genres" && (
                    <div className="flex justify-center">
                      <GenresIcon className="w-6 h-6 flex justify-center" />
                    </div>
                  )}
                  {i.name === "Schedules" && (
                    <div className="flex justify-center">
                      <CalendarIcon className="w-6 h-6 flex justify-center" />
                    </div>
                  )}
                  <div className="text-white px-1 text-[10px]">{i.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}
    </>
  );
};
