"use client";

import { ConfigProvider, Spin, Tabs } from "antd";

import { SimilarListComponent, VideoListComponent } from "@/components";
import { useGetMoviesSimilar, useGetMoviesVideos } from "@/services/hooks";
import { CardData } from "@/interfaces";

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

  const similarCardData: CardData[] = similarData.map((item) => {
    return {
      id: item.id,
      poster_path: item.poster_path,
      redirect: `movies/${item.id}`,
      title: item.title,
      type: "movies",
    };
  });

  return (
    <>
      {loadingVideo || loadingSimilar ? (
        <Spin fullscreen size="large" />
      ) : (
        <>
          <div className="mt-14 lg:mt-[72px]">
            <div className="lg:flex lg:justify-between lg:px-5">
              <div>
                <iframe
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  className="lg:my-3 w-full lg:w-[800px] h-[200px] lg:h-[360px]"
                  src={`https://www.youtube.com/embed/${getDetailVideo?.key}`}
                  title="Embedded youtube"
                />
                <div className="py-5 font-bold md:text-xl hidden lg:inline-block">
                  <p>Similar Movies</p>
                </div>
                <div className="hidden lg:inline-block">
                  <SimilarListComponent similarData={similarCardData} />
                </div>
              </div>
              <div>
                <div className="hidden lg:inline-block">
                  <VideoListComponent
                    movieId={params.id}
                    videoId={params.videoId}
                    videos={videoData}
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
                      centered
                      className="lg:hidden"
                      items={["Videos", "Similar"].map((item, index) => {
                        return {
                          label: <p className="font-bold">{item}</p>,
                          key: index.toString(),
                          children: (
                            <>
                              {item === "Videos" ? (
                                <VideoListComponent
                                  movieId={params.id}
                                  videoId={params.videoId}
                                  videos={videoData}
                                />
                              ) : (
                                <SimilarListComponent
                                  similarData={similarCardData}
                                />
                              )}
                            </>
                          ),
                        };
                      })}
                      size="middle"
                      tabPosition="top"
                    />
                  </ConfigProvider>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
