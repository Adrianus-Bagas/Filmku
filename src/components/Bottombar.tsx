"use client";

import { usePathname, useRouter } from "next/navigation";
import { useAtom } from "jotai";

import { CastsIcon, FilmIcon, SeriesIcon, GenresIcon } from "@/assets/icons";
import { menu } from "@/utils/constants";
import { isSearchAtom } from "@/store/app.store";

export const Bottombar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isSearch, setIsSearch] = useAtom(isSearchAtom);

  return (
    <>
      {!isSearch && (
        <div className="w-full h-[56px] bg-black fixed bottom-0 z-10 lg:hidden inline-block py-2">
          <div className="flex justify-evenly items-center">
            {menu.map((i, index) => (
              <div
                key={index}
                className={`${i.path === pathname && pathname !== "/" ? "opacity-100" : "opacity-50"} bg-black p-1 cursor-pointer`}
                onClick={() => {
                  router.push(i.path);
                  setIsSearch(false);
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
                {i.name === "Casts" && (
                  <div className="flex justify-center">
                    <CastsIcon className="w-6 h-6 flex justify-center" />
                  </div>
                )}
                {i.name === "Genres" && (
                  <div className="flex justify-center">
                    <GenresIcon className="w-6 h-6 flex justify-center" />
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
