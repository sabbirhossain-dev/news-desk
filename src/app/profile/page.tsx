"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { toast } from "react-toastify";

const Page = () => {
  const { data: session } = authClient.useSession();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());
    await authClient.updateUser({
      ...userData,
    });
    toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
  };

  return (
    <div className="flex min-h-screen w-full md:w-1/2 mx-auto flex-col my-5 p-5">
      <div className="w-full mx-auto rounded-2xl border border-gray-200 bg-white p-6 shadow-xl shadow-gray-200/50 sm:p-8">
        {/* ================= HEADER ================= */}

        <div className="mb-7">
          <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
            প্রোফাইল আপডেট করুন
          </h2>

          <p className="mt-1.5 text-sm text-gray-500">
            আপনার নাম এবং প্রোফাইল ছবি আপডেট করুন
          </p>
        </div>

        <form className="flex w-full flex-col gap-6" onSubmit={handleSubmit}>
          {/* ================= PROFILE IMAGE ================= */}

          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 sm:p-5">
            <div className="flex flex-col items-center gap-5 sm:flex-row">
              {/* Profile Preview */}
              <div className="relative shrink-0">
                <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-gradient-to-br from-green-400 to-emerald-600 text-2xl font-bold text-white shadow-md">
                  <Image
                    src={session?.user?.image || "/default-profile.png"}
                    alt="Profile Image"
                    width={80}
                    height={80}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Edit Icon */}
                <div className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-green-500 text-white shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-3.5 w-3.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 3.487a2.25 2.25 0 013.182 3.182L8.25 18.563 4 20l1.438-4.25L16.862 3.487z"
                    />
                  </svg>
                </div>
              </div>

              {/* Image URL */}
              <div className="w-full">
                <label
                  htmlFor="image"
                  className="mb-2 block text-sm font-semibold text-gray-800"
                >
                  প্রোফাইল ছবি
                  <span className="ml-1 text-xs font-normal text-gray-400">
                    (ঐচ্ছিক)
                  </span>
                </label>

                <input
                  id="image"
                  name="image"
                  type="url"
                  placeholder="https://example.com/profile.jpg"
                  className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-green-600 focus:ring-4 focus:ring-green-600/10"
                />

                <p className="mt-1.5 text-xs text-gray-400">
                  একটি valid image URL দিন
                </p>
              </div>
            </div>
          </div>

          {/* ================= NAME ================= */}

          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-semibold text-gray-800"
            >
              আপনার নাম
            </label>

            <div className="relative">
              {/* User Icon */}
              <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.8}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 0115 0"
                  />
                </svg>
              </div>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="আপনার নাম লিখুন"
                className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-12 pr-4 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-green-600 focus:bg-white focus:ring-4 focus:ring-green-600/10"
              />
            </div>
          </div>

          {/* ================= UPDATE BUTTON ================= */}

          <button
            type="submit"
            className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-5 text-sm font-semibold text-white shadow-lg shadow-green-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-green-600/25 active:translate-y-0 active:scale-[0.99]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5 transition-transform duration-200 group-hover:rotate-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 3.487a2.25 2.25 0 013.182 3.182L8.25 18.563 4 20l1.438-4.25L16.862 3.487z"
              />
            </svg>
            প্রোফাইল আপডেট করুন
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
