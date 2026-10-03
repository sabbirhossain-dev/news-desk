import React from "react";
import NavCategory from "./NavCategory";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logo.png";
import HomeLink from "./HomeButton";

interface INavLinks {
  id: string;
  title: string;
  slug: string;
  scrapable: boolean;
  topicId: string;
}

const Navbar = async () => {
  const res = await fetch("https://news-api-v2.vercel.app/api/categories", {
    next: { revalidate: 60 },
  });

  const data = await res.json();

  const navData: INavLinks[] = data.data;

  const navLinks = navData.filter((navItem) => navItem.scrapable);

  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="mx-auto max-w-7xl px-4">
        {/* Top Date */}
        <div className="flex items-center justify-between  pt-3">
          <p className="text-sm text-gray-500">{date}</p>

          <div className="hidden items-center gap-4 text-sm text-gray-500 sm:flex">
            <span>বাংলাদেশ</span>
            <span>•</span>
            <span>বিশ্ব সংবাদ</span>
          </div>
        </div>

        {/* Logo */}
        <div className="flex flex-col items-center justify-center pb-3">
          <Link href="/" className="inline-block">
            <Image
              src={logo}
              alt="Newsline"
              width={180}
              height={70}
              priority
              className="h-auto w-[100px] object-contain sm:w-[120px] -mt-5"
            />
          </Link>

          <p className="mt-2 text-[12px] tracking-[0.25em] text-gray-500 uppercase">
            News • Truth • World
          </p>
        </div>

        {/* Navigation */}
        <div className="border-t border-gray-200">
          <div className="flex items-center justify-center gap-1 overflow-x-auto py-2 scrollbar-hide">
            <HomeLink />

            {navLinks.map((item) => (
              <NavCategory key={item.topicId} item={item} />
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
