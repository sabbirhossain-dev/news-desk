"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const HomeLink = () => {
  const pathname = usePathname();

  const isActive = pathname === "/";

  return (
    <Link
      href="/"
      className={`group relative whitespace-nowrap px-3 py-2 text-sm font-semibold transition-colors duration-300 ${
        isActive ? "text-green-700" : "text-gray-800 hover:text-green-700"
      }`}
    >
      হোম
      <span
        className={`absolute bottom-0 left-3 h-0.5 bg-green-700 transition-all duration-300 ${
          isActive
            ? "w-[calc(100%-24px)]"
            : "w-0 group-hover:w-[calc(100%-24px)]"
        }`}
      />
    </Link>
  );
};

export default HomeLink;
