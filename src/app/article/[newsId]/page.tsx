// import React from "react";

// const DetailsPage = async ({
//   params,
// }: {
//   params: Promise<{ newsId: string }>;
// }) => {
//   const { newsId } = await params;
//   console.log(newsId);

//   const res = await fetch(
//     `https://news-api-v2.vercel.app/api/article/${newsId}`,
//   );
//   const data = await res.json();
//   console.log(data);
//   return <div>{data.title}</div>;
// };

// export default DetailsPage;

import Image from "next/image";
import React from "react";

const DetailsPage = async ({
  params,
}: {
  params: Promise<{ newsId: string }>;
}) => {
  const { newsId } = await params;

  const res = await fetch(
    `https://news-api-v2.vercel.app/api/article/${newsId}`,
    {
      next: {
        revalidate: 60,
      },
    },
  );

  // if (!res.ok) {
  //   throw new Error("Article fetch failed");
  // }

  const response = await res.json();
  const article = response.data;

  if (!article) {
    return (
      <main className="flex min-h-[50vh] items-center justify-center px-4">
        <p className="text-center text-base text-gray-500 sm:text-lg">
          নিউজটি পাওয়া যায়নি।
        </p>
      </main>
    );
  }

  const date = article.lastPublished
    ? new Date(article.lastPublished).toLocaleDateString("bn-BD", {
        dateStyle: "full",
      })
    : "";

  return (
    <main className="w-full bg-gray-50">
      <div className="mx-auto w-full max-w-7xl px-3 py-4 sm:px-5 sm:py-6 md:px-6 lg:px-8 lg:py-10">
        <div className="grid grid-cols-1 gap-5 sm:gap-6 md:gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-8">
          {/* Main Article */}
          <article className="min-w-0 overflow-hidden rounded-lg bg-white shadow-sm sm:rounded-xl">
            {/* Header */}
            <div className="p-4 sm:p-6 md:p-8 lg:p-10">
              {/* Source */}
              <div className="mb-4 flex flex-wrap items-center gap-2 sm:mb-5">
                <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700 sm:text-sm">
                  News Desk
                </span>

                <span className="text-xs text-gray-500 sm:text-sm">{date}</span>
              </div>

              {/* Title */}
              <h1 className="text-2xl font-bold leading-[1.4] text-gray-900 sm:text-3xl sm:leading-[1.4] md:text-4xl lg:text-5xl lg:leading-[1.3]">
                {article.title}
              </h1>

              {/* Description */}
              {article.description?.blocks?.[0]?.text && (
                <p className="mt-4 text-base leading-7 text-gray-600 sm:mt-5 sm:text-lg sm:leading-8 md:text-xl md:leading-9">
                  {article.description.blocks[0].text}
                </p>
              )}

              {/* Article Body */}
              <div className="mt-6 sm:mt-8">
                {article.body?.map(
                  (
                    item: {
                      type: string;
                      text?: string;
                      url?: string;
                      caption?: string;
                    },
                    index: number,
                  ) => {
                    if (item.type === "subheading") {
                      return (
                        <h2
                          key={index}
                          className="mb-4 mt-8 border-l-4 border-red-700 pl-3 text-xl font-bold leading-8 text-gray-900 sm:mt-10 sm:pl-4 sm:text-2xl md:text-3xl md:leading-9"
                        >
                          {item.text}
                        </h2>
                      );
                    }

                    if (item.type === "text") {
                      return (
                        <p
                          key={index}
                          className="mb-5 text-[15px] leading-8 text-gray-700 sm:mb-6 sm:text-base sm:leading-8 md:text-lg md:leading-9"
                        >
                          {item.text}
                        </p>
                      );
                    }

                    if (item.type === "image" && item.url) {
                      return (
                        <figure
                          key={index}
                          className="my-6 overflow-hidden rounded-lg sm:my-8 sm:rounded-xl"
                        >
                          <Image
                            src={item.url}
                            alt={item.caption || article.title}
                            width={1200}
                            height={675}
                            className="h-auto w-full object-cover"
                          />

                          {item.caption && (
                            <figcaption className="bg-gray-50 px-3 py-2 text-xs leading-5 text-gray-500 sm:px-4 sm:py-3 sm:text-sm sm:leading-6">
                              {item.caption}
                            </figcaption>
                          )}
                        </figure>
                      );
                    }

                    return null;
                  },
                )}
              </div>

              {/* Tags */}
              {article.tags?.length > 0 && (
                <div className="mt-8 border-t border-gray-200 pt-5 sm:mt-10 sm:pt-6">
                  <h3 className="mb-3 text-base font-bold text-gray-900 sm:text-lg">
                    বিষয়
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="rounded-full bg-gray-100 px-3 py-1.5 text-xs text-gray-700 sm:text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-36 rounded-xl bg-white p-5 shadow-sm">
              <h2 className="border-b border-gray-200 pb-3 text-lg font-bold text-gray-900 xl:text-xl">
                খবরের তথ্য
              </h2>

              <div className="space-y-4 pt-4 text-sm">
                <div>
                  <p className="text-gray-500">উৎস</p>
                  <p className="mt-1 font-semibold text-gray-900">
                    {article.source}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">প্রকাশিত</p>
                  <p className="mt-1 font-semibold leading-6 text-gray-900">
                    {date}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">শব্দ সংখ্যা</p>
                  <p className="mt-1 font-semibold text-gray-900">
                    {article.wordCount?.toLocaleString("bn-BD")}
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default DetailsPage;
