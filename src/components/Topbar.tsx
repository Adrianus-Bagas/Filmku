"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Input } from "antd";
import { ArrowLeftOutlined, SearchOutlined } from "@ant-design/icons";
import { useAtom } from "jotai";

import { menu } from "@/utils/constants";
import Logo from "@/assets/images/TheMovie (1).png";
import { isSearchAtom } from "@/app/store/app.store";

export const Topbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isSearch, setIsSearch] = useAtom(isSearchAtom);

  const LogoImage = ({ className }: { className?: string }) => {
    return (
      <Image
        alt="Filmku"
        className={className}
        src={Logo}
        onClick={() => {
          router.push("/");
          setIsSearch(false);
        }}
      />
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
          <SearchOutlined
            className="text-[24px]"
            onClick={() => setIsSearch(true)}
          />
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
                className="text-white px-3 cursor-pointer"
                onClick={() => router.push(i.path)}
              >
                {i.name}
              </p>
            </div>
          ))}
        </div>
        <div>
          <Input.Search
            placeholder="Search In Filmku"
            onSearch={(value) => console.log(value)}
          />
        </div>
      </div>
    </>
  );
};
