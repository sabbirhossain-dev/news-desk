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
  const date = new Date(news.lastPublished).toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });
  return (
    <div>
      <div className="card bg-base-100 cursor-pointer shadow-sm">
        <figure>
          <Image
            src={news.imageUrl}
            alt={news.imageAlt}
            width={400}
            height={300}
            className="w-full h-50"
          ></Image>
        </figure>
        <div className="card-body p-3">
          <h2 className="card-title text-red-800 text-[15px]">
            {sectionTitle}
          </h2>
          <p className="text-[18px] font-bold">{news.title}</p>
          <p className=" text-gray-700">{news.description?.slice(0, 120)}...</p>
          <p className="text-gray-500 pt-3 opacity-90">{date}</p>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
