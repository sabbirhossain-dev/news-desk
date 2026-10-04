import React from "react";
import { IArticle } from "../types/type";
import Link from "next/link";

const MostReadCard = ({ data, index }: { data: IArticle; index: number }) => {
  return (
    <div>
      <Link href={`/article/${data.id}`}>
        <div className="flex p-3 border border-gray-200 rounded-md">
          <span className="text-gray-800">
            {(index + 1).toLocaleString("bn-BD")}.
          </span>
          <p className="ml-2 hover:text-green-600 transition-all duration-300  cursor-pointer">
            {data.title}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default MostReadCard;
