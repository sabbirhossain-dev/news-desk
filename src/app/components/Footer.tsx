import React from "react";

const Footer = () => {
  return (
    <section className=" border-t border-b border-gray-300 bg-white px-4 md:px-0">
      <div className="max-w-7xl mx-auto w-full items-center flex flex-col gap-1 md:flex-row md:justify-between md:gap-5 py-3 pt-4 md:py-5 md:pt-6 ">
        <p className="text-[12px] md:text-[14px] text-gray-600">
          © 2026 BanglaBulletin
        </p>
        <p className="text-[12px] md:text-[14px] text-gray-600">
          Source: BBC Bangla
        </p>
      </div>
    </section>
  );
};

export default Footer;
