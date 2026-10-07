"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

export default function SignIn() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    let isValid = true;

    // Email validation
    if (!email) {
      setEmailError("ইমেইল ঠিকানা প্রদান করুন");
      isValid = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      setEmailError("সঠিক ইমেইল ঠিকানা প্রদান করুন");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Password validation
    if (!password) {
      setPasswordError("পাসওয়ার্ড প্রদান করুন");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!isValid) return;

    // পরবর্তীতে এখানে authentication logic যোগ করবে

    const { data, error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: "/",
    });

    if (data) {
      toast.success(`Welcome, ${data.user.name}!`);
    }

    if (error) {
      toast.error("Failed to sign in. Please check your email and password.");
    }
  };

  const handleGoogleClick = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
    if (data) {
      toast.success("Logged in Successfully !");
    }
  };

  const handleGithubClick = async () => {
    const data = await authClient.signIn.social({
      provider: "github",
    });
    if (data) {
      toast.success("Logged in Successfully !");
    }
    console.log("CLICKED");
  };

  return (
    <div className="min-h-screen bg-white px-4 py-10 sm:px-6 lg:py-16">
      <div className="mx-auto w-full max-w-md">
        {/* ================= CARD ================= */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl shadow-gray-200/50 sm:p-8">
          {/* ================= HEADER ================= */}
          <div className="mb-7 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-black sm:text-3xl">
              আবার স্বাগতম
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              আপনার অ্যাকাউন্টে প্রবেশ করতে সাইন ইন করুন
            </p>
          </div>

          {/* ================= FORM ================= */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex w-full flex-col gap-5"
          >
            {/* ================= EMAIL ================= */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                ইমেইল ঠিকানা
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);

                  if (emailError) {
                    setEmailError("");
                  }
                }}
                placeholder="আপনার ইমেইল লিখুন"
                className={`h-12 w-full rounded-xl border bg-gray-50 px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:bg-white focus:ring-4 ${
                  emailError
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                    : "border-gray-200 focus:border-green-600 focus:ring-green-600/10"
                }`}
              />

              {emailError && (
                <p className="mt-1.5 text-xs font-medium text-red-600">
                  {emailError}
                </p>
              )}
            </div>

            {/* ================= PASSWORD ================= */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-gray-700"
                >
                  পাসওয়ার্ড
                </label>

                <Link
                  href="/forgot-password"
                  className="text-xs font-semibold text-green-700 transition hover:text-green-800"
                >
                  পাসওয়ার্ড ভুলে গেছেন?
                </Link>
              </div>

              {/* Password Input */}
              <div
                className={`flex h-12 w-full items-center rounded-xl border bg-gray-50 transition focus-within:bg-white focus-within:ring-4 ${
                  passwordError
                    ? "border-red-500 focus-within:border-red-500 focus-within:ring-red-500/10"
                    : "border-gray-200 focus-within:border-green-600 focus-within:ring-green-600/10"
                }`}
              >
                <input
                  id="password"
                  name="password"
                  type={isVisible ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);

                    if (passwordError) {
                      setPasswordError("");
                    }
                  }}
                  placeholder="আপনার পাসওয়ার্ড লিখুন"
                  className="h-full min-w-0 flex-1 rounded-xl border-0 bg-transparent px-4 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:ring-0"
                />

                {/* Show / Hide Password */}
                <button
                  type="button"
                  onClick={() => setIsVisible((prev) => !prev)}
                  aria-label={
                    isVisible ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"
                  }
                  className="mr-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-200 hover:text-gray-700"
                >
                  {isVisible ? (
                    /* Eye Off */
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="h-4 w-4"
                    >
                      <path d="M3 3l18 18" />
                      <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                      <path d="M9.9 4.2A10.8 10.8 0 0 1 12 4c5 0 9 3.5 10 8a10.9 10.9 0 0 1-4 5.7" />
                      <path d="M6.6 6.6A10.9 10.9 0 0 0 2 12c1 4.5 5 8 10 8 1.2 0 2.3-.2 3.3-.6" />
                    </svg>
                  ) : (
                    /* Eye */
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="h-4 w-4"
                    >
                      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>

              <p className="mt-2 text-xs leading-5 text-gray-400">
                কমপক্ষে ৮ অক্ষর, ১টি বড় হাতের অক্ষর এবং ১টি সংখ্যা ব্যবহার
                করুন।
              </p>

              {passwordError && (
                <p className="mt-1.5 text-xs font-medium text-red-600">
                  {passwordError}
                </p>
              )}
            </div>

            {/* ================= REMEMBER ME ================= */}
            <div className="flex items-center gap-2">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                className="h-4 w-4 cursor-pointer rounded border-gray-300 accent-green-700"
              />

              <label
                htmlFor="remember"
                className="cursor-pointer text-sm text-gray-500"
              >
                আমাকে মনে রাখুন
              </label>
            </div>

            {/* ================= SIGN IN ================= */}
            <button
              type="submit"
              className="h-12 w-full rounded-xl bg-green-700 text-sm font-semibold text-white shadow-md shadow-green-700/20 transition-all duration-200 hover:bg-green-800 hover:shadow-lg active:scale-[0.98]"
            >
              সাইন ইন করুন
            </button>

            {/* ================= DIVIDER ================= */}
            <div className="flex items-center gap-3 py-1">
              <div className="h-px flex-1 bg-gray-200" />

              <span className="text-xs font-medium text-gray-400">অথবা</span>

              <div className="h-px flex-1 bg-gray-200" />
            </div>

            {/* ================= GOOGLE SIGN IN ================= */}
            <button
              onClick={handleGoogleClick}
              type="button"
              className="cursor-pointer flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-50 hover:shadow-sm active:scale-[0.98]"
            >
              {/* Google Icon */}
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path
                  fill="#4285F4"
                  d="M21.35 12.23c0-.79-.07-1.55-.23-2.27H12v4.3h5.22a4.46 4.46 0 0 1-1.94 2.93v2.44h3.14c1.84-1.7 2.93-4.2 2.93-7.4Z"
                />

                <path
                  fill="#34A853"
                  d="M12 21.7c2.63 0 4.84-.87 6.45-2.36l-3.14-2.44c-.87.58-1.98.93-3.31.93-2.54 0-4.69-1.72-5.46-4.03H3.29v2.52A9.75 9.75 0 0 0 12 21.7Z"
                />

                <path
                  fill="#FBBC05"
                  d="M6.54 13.8A5.86 5.86 0 0 1 6.23 12c0-.62.11-1.23.31-1.8V7.68H3.29A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.05 1.04 4.32l3.25-2.52Z"
                />

                <path
                  fill="#EA4335"
                  d="M12 6.17c1.43 0 2.71.49 3.72 1.46l2.79-2.79C16.84 3.27 14.63 2.3 12 2.3a9.75 9.75 0 0 0-8.71 5.38l3.25 2.52C7.31 7.89 9.46 6.17 12 6.17Z"
                />
              </svg>
              Google দিয়ে চালিয়ে যান
            </button>

            <button
              onClick={handleGithubClick}
              type="button"
              className="cursor-pointer flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-50 hover:shadow-sm active:scale-[0.98]"
            >
              {/* Google Icon */}
              GitHub দিয়ে চালিয়ে যান
            </button>
          </form>

          {/* ================= FOOTER ================= */}
          <p className="mt-7 text-center text-sm text-gray-500">
            আপনার কি কোনো অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/sign-up"
              className="font-semibold text-red-600 transition hover:text-red-700"
            >
              অ্যাকাউন্ট তৈরি করুন
            </Link>
          </p>
        </div>

        {/* ================= BOTTOM TEXT ================= */}
        <p className="mt-6 text-center text-xs leading-5 text-gray-400">
          চালিয়ে যাওয়ার মাধ্যমে আপনি আমাদের{" "}
          <Link
            href="/terms"
            className="text-gray-600 transition hover:text-green-700"
          >
            শর্তাবলি
          </Link>{" "}
          এবং{" "}
          <Link
            href="/privacy"
            className="text-gray-600 transition hover:text-green-700"
          >
            গোপনীয়তা নীতি
          </Link>
          মেনে নিচ্ছেন।
        </p>
      </div>
    </div>
  );
}
