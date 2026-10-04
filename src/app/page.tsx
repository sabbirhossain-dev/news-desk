import Link from "next/link";
import FirstNewsCard from "./components/FirstNewsCard";
import MostReadCard from "./components/MostReadCard";
import NewsCard from "./components/NewsCard";
import { IArticle, INews } from "./types/type";

export default async function Home() {
  const res = await fetch("https://news-api-v2.vercel.app/api/news/sections", {
    next: { revalidate: 60 },
  });

  const data = await res.json();
  const sectionNews = data.data;
  const firstNews = sectionNews[0];

  const mostReadRes = await fetch(
    "https://news-api-v2.vercel.app/api/news/most-read",
  );
  const readData = await mostReadRes.json();

  const excludedIds = [
    "urn:bbc:tipo:list:705fa609-e889-42f3-b3b5-c324305a4772",
    "urn:bbc:tipo:list:0ad2eb5d-7a0e-4c74-b8b4-de3de9bc5137",
    "urn:bbc:tipo:list:61a6be9c-5bb1-4ab5-ad6e-9855ff26a267",
    "urn:bbc:tipo:list:0de6d7f8-ccae-45b6-b843-7329b6e521b7",
  ];

  const remainSectionNews = sectionNews.filter(
    (item: INews) => !excludedIds.includes(item.curationId),
  );

  const remainFirstNews = firstNews.articles.slice(1, 7);

  return (
    <main className="w-full py-6 px-4 md:px-0">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main News Section */}
        <section className="lg:col-span-2">
          <div className="mb-4 flex items-center gap-3">
            <h2 className="border-l-4 border-red-700 pl-3 text-xl font-bold text-gray-800">
              {firstNews.title}
            </h2>

            <div className="h-px flex-1 bg-gray-200" />
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Featured News */}
            <FirstNewsCard news={firstNews} />

            {/* News List */}
            <div className="overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm">
              {remainFirstNews.map((item: IArticle) => (
                <article
                  key={item.id}
                  className="group border-b border-gray-200 px-4 py-3 last:border-b-0 hover:bg-gray-50 cursor-pointer"
                >
                  <Link href={`/article/${item.id}`}>
                    <div className="flex gap-3">
                      <div>
                        <p className="mb-1 text-sm font-semibold text-red-700">
                          {firstNews.title}
                        </p>

                        <h3 className="text-sm font-semibold leading-6 text-gray-800 transition-colors group-hover:text-red-700">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
          <div className="py-10">
            {remainSectionNews.map((item: INews) => (
              <div key={item.curationId}>
                <h1 className="text-black font-bold py-2 border-b-2 border-red-700">
                  {item.title}
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-4">
                  {item.articles.map((artileItem) => (
                    <NewsCard
                      key={artileItem.id}
                      news={artileItem}
                      sectionTitle={item.title}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Right Sidebar */}
        <aside className="lg:col-span-1">
          <div className="overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm">
            <div className="flex flex-col gap-3 border-b border-gray-200 px-4 py-3">
              <h2 className="font-bold text-green-600">সর্বাধিক পঠিত</h2>

              <div className="flex flex-col gap-2">
                {readData.data.map((item: IArticle, index: number) => (
                  <MostReadCard key={item.id} data={item} index={index} />
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
