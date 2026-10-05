import NavCategory from "./NavCategory";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logo.png";
import HomeLink from "./HomeButton";
import NavbarMobileScreen from "./NavbarMobileScreen";

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
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <nav className="mx-auto w-full max-w-7xl px-4 sm:px-4">
        {/* ================= MOBILE ================= */}
        <NavbarMobileScreen navLinks={navLinks} />

        {/* ================= DESKTOP ================= */}
        <div className="hidden md:block">
          {/* Top Section */}
          <div className="flex min-h-[100px] items-center justify-between">
            {/* Date */}
            <div className="flex w-1/3 items-center">
              <p className="text-xs text-gray-500 lg:text-sm">{date}</p>
            </div>

            {/* Logo */}
            <div className="flex w-1/3 flex-col items-center justify-center">
              <Link href="/" className="inline-block">
                <Image
                  src={logo}
                  alt="Newsline"
                  width={150}
                  height={70}
                  priority
                  className="h-auto w-[80px] object-contain sm:w-[90px] lg:w-[100px]"
                />
              </Link>

              <p className="mt-1 hidden text-[9px] uppercase tracking-[0.2em] text-gray-500 sm:block lg:text-[10px] lg:tracking-[0.25em]">
                News • Truth • World
              </p>
            </div>

            {/* Right Info */}
            <div className="flex w-1/3 justify-end">
              <div className="hidden items-center gap-2 text-xs text-gray-500 lg:flex lg:gap-4 lg:text-sm">
                <span>বাংলাদেশ</span>
                <span>•</span>
                <span>বিশ্ব সংবাদ</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="border-t border-gray-200">
            <div className="flex items-center justify-center gap-1 overflow-x-auto py-2 scrollbar-hide">
              <HomeLink />

              {navLinks.map((item) => (
                <NavCategory key={item.topicId} item={item} />
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
