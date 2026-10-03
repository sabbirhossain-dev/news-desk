import Image from "next/image";
import React from "react";
import { IArticle } from "../types/type";

const NewsCard = ({
  news,
  sectionTitle,
}: {
  news: IArticle;
  sectionTitle: string;
}) => {
  const date = news.lastPublished
    ? new Date(news.lastPublished).toLocaleDateString("bn-BD", {
        dateStyle: "full",
      })
    : "";

  return (
    <article className="group cursor-pointer overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Image */}
      <figure className="relative h-52 w-full overflow-hidden">
        <Image
          src={news.imageUrl}
          alt={news.imageAlt || news.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Category */}
        <div className="absolute left-3 top-3">
          <span className="rounded bg-red-700 px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
            {sectionTitle}
          </span>
        </div>
      </figure>

      {/* Content */}
      <div className="p-3">
        {/* Title */}
        <h2 className="line-clamp-2 text-[18px] font-bold leading-7 text-gray-900 transition-colors duration-300 group-hover:text-red-700">
          {news.title}
        </h2>

        {/* Description */}
        {news.description && (
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">
            {news.description.slice(0, 150)}
            {news.description.length > 150 && "..."}
          </p>
        )}

        {/* Bottom */}
        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
          <p className="text-xs text-gray-500">{date}</p>

          <span className="text-xs font-semibold text-red-700 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100">
            বিস্তারিত →
          </span>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;
