"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

import Logo from "@/assets/images/TheMovie (1).png";
import { menu } from "@/utils/constants";

export const Topbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const LogoImage = () => {
    return (
      <Image
        alt="Filmku"
        className="w-[200px] px-3 cursor-pointer"
        src={Logo}
        onClick={() => router.push("/")}
      />
    );
  };

  return (
    <>
      <div className="py-3 w-full bg-black top-0 fixed z-10 md:hidden inline-block">
        <div className="flex items-center justify-center">
          <LogoImage />
        </div>
      </div>
      <div className="w-full bg-black top-0 fixed z-10 hidden md:inline-block">
        <div className="flex items-center">
          <LogoImage />
          {menu.map((i, index) => (
            <div
              key={index}
              className={`${i.path === pathname && pathname !== "/" ? "opacity-100" : "opacity-50"} bg-black p-3`}
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
