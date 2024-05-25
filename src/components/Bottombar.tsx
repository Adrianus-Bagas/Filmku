"use client";

import { usePathname, useRouter } from "next/navigation";
import { useAtom } from "jotai";

import {
  FavoritesIcon,
  FilmIcon,
  RatedIcon,
  SeriesIcon,
  WatchlistsIcon,
} from "@/assets/icons";
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
                {i.name === "Favorites" && (
                  <div className="flex justify-center">
                    <FavoritesIcon className="w-6 h-6 flex justify-center" />
                  </div>
                )}
                {i.name === "Watchlists" && (
                  <div className="flex justify-center">
                    <WatchlistsIcon className="w-6 h-6 flex justify-center" />
                  </div>
                )}
                {i.name === "Rated" && (
                  <div className="flex justify-center">
                    <RatedIcon className="w-6 h-6 flex justify-center" />
                  </div>
                )}
                <div
                  className="text-white px-1 text-[10px]"
                  onClick={() => {
                    router.push(i.path);
                    setIsSearch(false);
                  }}
                >
                  {i.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
