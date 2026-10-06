"use client";
import { authClient } from "@/lib/auth-client";
// import Image from "next/image";
import Link from "next/link";
import React from "react";

const NavButton = () => {
  const { data: session, isPending } = authClient.useSession();
  if (isPending) {
    return <p>Loading...</p>;
  }
  console.log(session?.user);
  return (
    <>
      {session ? (
        <div className="flex w-1/3 justify-end gap-2">
          <div className="bg-gray-100 px-5 pt-1 pb-1.5 rounded-md shadow-sm">
            <h3 className="font-semibold font-sans text-blue-900 text-[20px]">
              {session?.user.name}
            </h3>
          </div>

          <button
            onClick={() => {
              console.log("clicked");
            }}
            className=" bg-red-700 text-white px-4 rounded-md text-[15px] cursor-pointer"
          >
            Log Out
          </button>
          {/* <Image src="/" alt="user" height={20} width={20}></Image> */}
        </div>
      ) : (
        <div className="flex w-1/3 justify-end gap-2">
          <Link
            href="/sign-in"
            className="rounded-md border border-green-700 bg-white px-2.5 py-1.5 pt-2 text-[10px] font-semibold text-green-700 transition-all duration-200 hover:bg-green-700 hover:text-white active:scale-95 sm:px-3 sm:text-sm"
          >
            সাইন ইন
          </Link>

          <Link
            href="/sign-up"
            className="rounded-md bg-red-600 px-2.5 py-1.5 pt-2 text-[10px] font-semibold text-white shadow-sm transition-all duration-200 hover:bg-red-700 hover:shadow-md active:scale-95 sm:px-3 sm:text-sm "
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </>
  );
};

export default NavButton;
