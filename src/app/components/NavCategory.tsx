"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface INavLinks {
  id: string;
  title: string;
  slug: string;
  scrapable: boolean;
  topicId: string;
}

const NavCategory = ({ item }: { item: INavLinks }) => {
  const pathname = usePathname();

  const isActive = pathname === `/category/${item.slug}`;

  return (
    <>
      <Link
        href={`/category/${item.slug}`}
        className={`group relative inline-flex whitespace-nowrap px-3 py-2 text-sm font-semibold transition-colors duration-300 ${
          isActive ? "text-green-700" : "text-gray-700 hover:text-green-700"
        }`}
      >
        {item.title}

        <span
          className={`absolute bottom-0 left-3 h-0.5 bg-green-700 transition-all duration-300 ${
            isActive
              ? "w-[calc(100%-24px)]"
              : "w-0 group-hover:w-[calc(100%-24px)]"
          }`}
        />
      </Link>
    </>
  );
};

export default NavCategory;
