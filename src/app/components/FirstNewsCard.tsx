import Image from "next/image";
import React from "react";
import { INews } from "../types/type";

const FirstNewsCard = ({ news }: { news: INews }) => {
  const firstArticle = news.articles[0];

  const date = new Date(firstArticle.lastPublished).toLocaleDateString(
    "bn-BD",
    {
      dateStyle: "full",
    },
  );

  return (
    <div>
      <div className="card bg-base-100  shadow-sm">
        <figure>
          <Image
            src={firstArticle.imageUrl}
            alt={firstArticle.imageAlt}
            width={400}
            height={300}
            className="w-full"
          ></Image>
        </figure>
        <div className="card-body">
          <h2 className="card-title text-red-800">{news.title}</h2>
          <p className="text-[20px] font-bold">{firstArticle.title}</p>
          <p className=" text-gray-700">
            {firstArticle.description?.slice(0, 180)}...
          </p>
          <p className="text-gray-500 pt-3 opacity-90">{date}</p>
        </div>
      </div>
    </div>
  );
};

export default FirstNewsCard;
