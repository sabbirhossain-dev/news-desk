import NewsCard from "@/app/components/NewsCard";
import { IArticle } from "@/app/types/type";

const CategoryNews = async ({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) => {
  const { categoryId } = await params;

  const res = await fetch(
    `https://news-api-v2.vercel.app/api/category/${categoryId}`,
  );

  const data = await res.json();
  const detailsData = data.data;

  return (
    <section className="w-full">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6">
        {/* Category Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            {data.title}
          </h1>

          <div className="mt-2 h-0.5 w-full rounded-full bg-red-700" />
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 ">
          {detailsData?.map((item: IArticle) => (
            <NewsCard key={item.id} news={item} sectionTitle={data.title} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryNews;
