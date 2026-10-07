"use client";

import Image from "next/image";
import Link from "next/link";
import { FaBars, FaXmark } from "react-icons/fa6";
import logo from "../../../public/logo.png";
import { useState } from "react";
import HomeLink from "./HomeButton";
import NavCategory from "./NavCategory";
import NavButton from "./NavButton";

interface INavLinks {
  id: string;
  title: string;
  slug: string;
  scrapable: boolean;
  topicId: string;
}

interface NavbarMobileScreenProps {
  navLinks: INavLinks[];
}

const NavbarMobileScreen = ({ navLinks }: NavbarMobileScreenProps) => {
  const [toggle, setToggle] = useState(false);

  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  const closeMenu = () => {
    setToggle(false);
  };

  return (
    <div className="relative md:hidden">
      {/* ================= MOBILE HEADER ================= */}
      <div className="flex min-h-[72px] items-center justify-between py-2">
        {/* Menu Button */}
        <div className="w-1/2 flex items-center gap-1">
          <div className="flex w-1/4 justify-start">
            <button
              type="button"
              onClick={handleToggle}
              aria-label={toggle ? "Close navigation" : "Open navigation"}
              aria-expanded={toggle}
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-gray-200 bg-gray-50 text-gray-700 transition-all duration-200 hover:bg-gray-100 active:scale-95 sm:h-10 sm:w-10"
            >
              {toggle ? <FaXmark size={19} /> : <FaBars size={19} />}
            </button>
          </div>

          {/* Logo + Date */}
          <div className="flex w-1/2 flex-col items-center justify-center">
            <Link href="/" onClick={closeMenu} className="inline-flex">
              <Image
                src={logo}
                alt="Newsline"
                priority
                className="h-auto w-[65px] object-contain sm:w-[75px]"
              />
            </Link>

            {/* Date */}
            <p className="mt-1 max-w-full truncate px-1 text-center text-[9px] font-medium text-gray-500 sm:text-[10px]">
              {date}
            </p>
          </div>
        </div>

        {/* Auth Buttons */}
        <div className="flex w-1/3 items-center justify-end gap-1.5 sm:gap-2">
          {/* <Link
            href="/sign-in"
            className="rounded-md border border-gray-200 px-2 py-1.5 text-[10px] font-medium text-white bg-green-700 transition-colors hover:bg-gray-100 sm:px-3 sm:text-xs"
          >
            Sign In
          </Link> */}

          <NavButton />
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      <div
        className={`absolute left-0 right-0 top-full z-50 overflow-hidden bg-white shadow-xl transition-all duration-300 ease-in-out ${
          toggle
            ? "visible max-h-[calc(100vh-60px)] translate-y-0 opacity-100"
            : "invisible max-h-0 -translate-y-2 opacity-0"
        }`}
      >
        {/* Menu Content */}
        <div className="max-h-[calc(100vh-60px)] overflow-y-auto px-4 py-3">
          <div className="flex flex-col">
            {/* Home */}
            <div onClick={closeMenu} className="border-b border-gray-100 py-2">
              <HomeLink />
            </div>

            {/* Categories */}
            {navLinks.map((item) => (
              <div
                key={item.topicId}
                onClick={closeMenu}
                className="border-b border-gray-200 py-1 last:border-b-0"
              >
                <NavCategory item={item} />
              </div>
            ))}
          </div>

          {/* Bottom Info */}
          <div className="mt-3 border-t border-gray-200 pt-3 pb-2">
            <div className="flex items-center justify-center gap-3 text-[11px] text-gray-400">
              <span>বাংলাদেশ</span>
              <span>•</span>
              <span>বিশ্ব সংবাদ</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarMobileScreen;
