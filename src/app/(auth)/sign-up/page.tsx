"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function SignUp() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let isValid = true;

    // Name validation
    if (!name.trim()) {
      setNameError("আপনার নাম প্রদান করুন");
      isValid = false;
    } else if (name.trim().length < 2) {
      setNameError("নাম কমপক্ষে ২ অক্ষরের হতে হবে");
      isValid = false;
    } else {
      setNameError("");
    }

    // Email validation
    if (!email.trim()) {
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
    } else if (password.length < 8) {
      setPasswordError("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      isValid = false;
    } else if (!/[A-Z]/.test(password)) {
      setPasswordError(
        "পাসওয়ার্ডে কমপক্ষে ১টি বড় হাতের ইংরেজি অক্ষর থাকতে হবে",
      );
      isValid = false;
    } else if (!/[0-9]/.test(password)) {
      setPasswordError("পাসওয়ার্ডে কমপক্ষে ১টি সংখ্যা থাকতে হবে");
      isValid = false;
    } else {
      setPasswordError("");
    }

    // Confirm password validation
    if (!confirmPassword) {
      setConfirmPasswordError("পাসওয়ার্ড পুনরায় প্রদান করুন");
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("পাসওয়ার্ড দুটি একই নয়");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    alert(`Hello ${name}. Your account created successfully!`);

    if (!isValid) return;

    // Authentication logic will be added later
    console.log({
      name,
      email,
      password,
      confirmPassword,
    });
  };

  return (
    <div className="min-h-screen bg-white px-4 py-10 sm:px-6 lg:py-16">
      <div className="mx-auto w-full max-w-md">
        {/* ================= CARD ================= */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl shadow-gray-200/50 sm:p-8">
          {/* ================= HEADER ================= */}
          <div className="mb-7 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-black sm:text-3xl">
              অ্যাকাউন্ট তৈরি করুন
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              নিউজ ডেস্কে আপনার নতুন অ্যাকাউন্ট তৈরি করুন
            </p>
          </div>

          {/* ================= FORM ================= */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex w-full flex-col gap-5"
          >
            {/* ================= NAME ================= */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                আপনার নাম
              </label>

              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);

                  if (nameError) {
                    setNameError("");
                  }
                }}
                placeholder="আপনার পূর্ণ নাম লিখুন"
                className={`h-12 w-full rounded-xl border bg-gray-50 px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:bg-white focus:ring-4 ${
                  nameError
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                    : "border-gray-200 focus:border-green-600 focus:ring-green-600/10"
                }`}
              />

              {nameError && (
                <p className="mt-1.5 text-xs font-medium text-red-600">
                  {nameError}
                </p>
              )}
            </div>

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
                required
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
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                পাসওয়ার্ড
              </label>

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
                  type={isPasswordVisible ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);

                    if (passwordError) {
                      setPasswordError("");
                    }
                  }}
                  placeholder="একটি শক্তিশালী পাসওয়ার্ড দিন"
                  className="h-full min-w-0 flex-1 rounded-xl border-0 bg-transparent px-4 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:ring-0"
                />

                <button
                  type="button"
                  onClick={() => setIsPasswordVisible((prev) => !prev)}
                  aria-label={
                    isPasswordVisible ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"
                  }
                  className="mr-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-200 hover:text-gray-700"
                >
                  {isPasswordVisible ? (
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

            {/* ================= CONFIRM PASSWORD ================= */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                পাসওয়ার্ড নিশ্চিত করুন
              </label>

              <div
                className={`flex h-12 w-full items-center rounded-xl border bg-gray-50 transition focus-within:bg-white focus-within:ring-4 ${
                  confirmPasswordError
                    ? "border-red-500 focus-within:border-red-500 focus-within:ring-red-500/10"
                    : "border-gray-200 focus-within:border-green-600 focus-within:ring-green-600/10"
                }`}
              >
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={isConfirmVisible ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);

                    if (confirmPasswordError) {
                      setConfirmPasswordError("");
                    }
                  }}
                  placeholder="পাসওয়ার্ড আবার লিখুন"
                  className="h-full min-w-0 flex-1 rounded-xl border-0 bg-transparent px-4 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:ring-0"
                />

                <button
                  type="button"
                  onClick={() => setIsConfirmVisible((prev) => !prev)}
                  aria-label={
                    isConfirmVisible ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"
                  }
                  className="mr-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-200 hover:text-gray-700"
                >
                  {isConfirmVisible ? (
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

              {confirmPasswordError && (
                <p className="mt-1.5 text-xs font-medium text-red-600">
                  {confirmPasswordError}
                </p>
              )}
            </div>

            {/* ================= TERMS ================= */}
            <div className="flex items-start gap-2">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-gray-300 accent-green-700"
              />

              <label
                htmlFor="terms"
                className="cursor-pointer text-xs leading-5 text-gray-500"
              >
                আমি{" "}
                <Link
                  href="/terms"
                  className="font-semibold text-green-700 hover:text-green-800"
                >
                  শর্তাবলি
                </Link>{" "}
                এবং{" "}
                <Link
                  href="/privacy"
                  className="font-semibold text-green-700 hover:text-green-800"
                >
                  গোপনীয়তা নীতি
                </Link>
                -তে সম্মত।
              </label>
            </div>

            {/* ================= SIGN UP ================= */}
            <button
              type="submit"
              className="h-12 w-full rounded-xl bg-green-700 text-sm font-semibold text-white shadow-md shadow-green-700/20 transition-all duration-200 hover:bg-green-800 hover:shadow-lg active:scale-[0.98]"
            >
              অ্যাকাউন্ট তৈরি করুন
            </button>

            {/* ================= DIVIDER ================= */}
            <div className="flex items-center gap-3 py-1">
              <div className="h-px flex-1 bg-gray-200" />

              <span className="text-xs font-medium text-gray-400">অথবা</span>

              <div className="h-px flex-1 bg-gray-200" />
            </div>

            {/* ================= GOOGLE ================= */}
            <button
              type="button"
              className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-50 hover:shadow-sm active:scale-[0.98]"
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
              Google দিয়ে অ্যাকাউন্ট তৈরি করুন
            </button>
          </form>

          {/* ================= FOOTER ================= */}
          <p className="mt-7 text-center text-sm text-gray-500">
            ইতোমধ্যে আপনার অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/sign-in"
              className="font-semibold text-red-600 transition hover:text-red-700"
            >
              সাইন ইন করুন
            </Link>
          </p>
        </div>

        {/* ================= BOTTOM TEXT ================= */}
        <p className="mt-6 text-center text-xs leading-5 text-gray-400">
          আপনার তথ্য নিরাপদে সংরক্ষণ করা হবে এবং কোনো তৃতীয় পক্ষের কাছে শেয়ার
          করা হবে না।
        </p>
      </div>
    </div>
  );
}
