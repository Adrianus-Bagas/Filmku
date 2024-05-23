"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

import Logo from "@/assets/images/TheMovie (1).png";

export const Topbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const menu = [
    {
      path: "/movies",
      name: "Movies",
    },
    {
      path: "/series",
      name: "Series",
    },
    {
      path: "/favorites",
      name: "Favorites",
    },
    {
      path: "/watchlists",
      name: "Watchlists",
    },
  ];

  return (
    <>
      <div className="w-full bg-black top-0 fixed z-10 hidden lg:inline-block">
        <div className="flex items-center">
          <Image
            alt="Filmku"
            className="w-[200px] px-3 cursor-pointer"
            src={Logo}
            onClick={() => router.push("/")}
          />
          {menu.map((i, index) => (
            <div
              key={index}
              className={`${i.path.includes(pathname) && pathname !== "/" && "opacity-100"} opacity-50 bg-black p-3`}
            >
              <p
                className="text-white px-3 cursor-pointer"
                onClick={() => router.push(i.path)}
              >
                {i.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
