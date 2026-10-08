"use client";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";

import defaultUser from "../../../public/default-user.jpg";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";

const NavButton = () => {
  const [user, setUser] = useState(false);
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="flex w-1/3 justify-end">
        <div className="flex items-center justify-center rounded-full bg-gray-100 p-2.5">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-200 border-t-gray-600" />
        </div>
      </div>
    );
  }

  const handleSignOut = async () => {
    await authClient.signOut();
    toast.info("Logged out successfully!");
    // callbackURL: "/"
  };
  // console.log(session?.user);

  const handleUserToggle = () => {
    setUser(!user);
  };
  return (
    <>
      {session ? (
        <div className="flex w-full sm:w-1/3 items-center justify-end gap-3 relative">
          {/* User Profile */}
          <div className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-2 py-1 md:px-3 md:py-2 shadow-sm transition-all duration-200 hover:border-gray-300 hover:shadow-md">
            {/* Avatar */}
            <div className="relative">
              <Image
                className="h-10 w-10 md:h-12 md:w-12 rounded-full border-2 border-green-600 object-cover"
                src={session?.user.image || defaultUser}
                alt={session?.user.name || "User"}
                height={40}
                width={40}
              />

              {/* Online indicator */}
              <span className="absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
            </div>

            {/* User Info */}
            <div className="hidden min-w-0 sm:block">
              <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400">
                Welcome back
              </p>

              <h3 className="max-w-32 truncate text-[16px] font-semibold text-gray-800">
                {session?.user.name}
              </h3>
            </div>
            <button className="cursor-pointer">
              {user ? (
                <IoIosArrowUp size={20} onClick={handleUserToggle} />
              ) : (
                <IoIosArrowDown size={20} onClick={handleUserToggle} />
              )}
            </button>
          </div>

          {user && (
            <div className="absolute right-0 top-16 z-50 w-56 origin-top-right animate-in fade-in zoom-in-95 duration-200">
              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-2 shadow-xl shadow-gray-200/60">
                {/* Header */}
                <div className="mb-2 flex items-center gap-3 rounded-xl bg-gray-50 px-3 py-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-bold text-white shadow-sm">
                    <IoSettingsOutline size={20} />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-gray-800">
                      User Account
                    </p>
                    <Link href="/profile" onClick={() => setUser(!user)}>
                      <p className="text-xs text-gray-500 hover:text-green-600 transition-all duration-300">
                        Update your account
                      </p>
                    </Link>
                  </div>
                </div>

                {/* Divider */}
                <div className="my-2 h-px bg-gray-100" />

                {/* Logout Button */}
                <button
                  onClick={handleSignOut}
                  className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 transition-all duration-200 hover:bg-red-50 active:scale-[0.98]"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 transition-colors duration-200 group-hover:bg-red-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M18 12H9m0 0l3-3m3 3l-3 3"
                      />
                    </svg>
                  </div>

                  <span>Log Out</span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="ml-auto h-4 w-4 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Logout Button */}
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
