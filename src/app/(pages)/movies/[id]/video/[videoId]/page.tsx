"use client";

import SimilarListComponent from "@/components/SimilarListComponent";
import VideoListComponent from "@/components/VideoListComponent";
import {
  useGetMoviesSimilar,
  useGetMoviesVideos,
} from "@/services/movies/hooks";
import { ConfigProvider, Spin, Tabs } from "antd";

export default function DetailVideo({
  params,
}: {
  params: { id: string; videoId: string };
}) {
  const { data: videoData, isLoading: loadingVideo } = useGetMoviesVideos(
    params.id,
  );
  const { data: similarData, isLoading: loadingSimilar } = useGetMoviesSimilar(
    params.id,
  );

  const getDetailVideo = videoData.find((item) => item.id === params.videoId);

  return (
    <>
      {loadingVideo || loadingSimilar ? (
        <Spin fullscreen size="large" />
      ) : (
        <div className="mt-14 lg:mt-[72px]">
          <div className="lg:flex lg:justify-between lg:px-5">
            <div>
              <iframe
                className="lg:my-3 w-full lg:w-[800px] h-fit lg:h-[360px]"
                src={`https://www.youtube.com/embed/${getDetailVideo?.key}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
              />
              <div className="py-5 font-bold md:text-xl hidden lg:inline-block">
                <p>Similar Movies</p>
              </div>
              <div className="hidden lg:inline-block">
                <SimilarListComponent similarData={similarData} />
              </div>
            </div>
            <div>
              <div className="hidden lg:inline-block">
                <VideoListComponent
                  videos={videoData}
                  movieId={params.id}
                  videoId={params.videoId}
                />
              </div>
              <div className="lg:px-10 lg:py-5">
                <ConfigProvider
                  theme={{
                    token: {
                      lineWidth: 5,
                    },
                    components: {
                      Tabs: {
                        itemColor: "white",
                        itemSelectedColor: "#364d79",
                        itemHoverColor: "#364d79",
                        inkBarColor: "#364d79",
                        lineWidth: 5,
                      },
                    },
                  }}
                >
                  <Tabs
                    className="lg:hidden"
                    tabPosition="top"
                    centered
                    size="middle"
                    items={["Videos", "Similar"].map((item, index) => {
                      return {
                        label: <p className="font-bold">{item}</p>,
                        key: index.toString(),
                        children: (
                          <>
                            {item === "Videos" ? (
                              <VideoListComponent
                                videos={videoData}
                                movieId={params.id}
                                videoId={params.videoId}
                              />
                            ) : (
                              <SimilarListComponent similarData={similarData} />
                            )}
                          </>
                        ),
                      };
                    })}
                  />
                </ConfigProvider>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
