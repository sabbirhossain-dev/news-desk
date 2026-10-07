// "use client";

// import { authClient } from "@/lib/auth-client";
// import { redirect } from "next/navigation";
// import { useState } from "react";

// const SignUpPage = () => {
//   const [errors, setErrors] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const formData = new FormData(e.currentTarget);

//     const user = Object.fromEntries(formData.entries()) as {
//       name: string;
//       email: string;
//       password: string;
//     };

//     const newErrors = {
//       name: "",
//       email: "",
//       password: "",
//     };

//     // Name validation
//     if (!user.name.trim()) {
//       newErrors.name = "আপনার নাম প্রদান করুন";
//     } else if (user.name.trim().length < 2) {
//       newErrors.name = "নাম কমপক্ষে ২ অক্ষরের হতে হবে";
//     }

//     // Email validation
//     if (!user.email.trim()) {
//       newErrors.email = "আপনার ইমেইল প্রদান করুন";
//     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(user.email)) {
//       newErrors.email = "সঠিক ইমেইল ঠিকানা প্রদান করুন";
//     }

//     // Password validation
//     if (!user.password) {
//       newErrors.password = "আপনার পাসওয়ার্ড প্রদান করুন";
//     } else if (user.password.length < 8) {
//       newErrors.password = "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
//     } else if (!/[A-Z]/.test(user.password)) {
//       newErrors.password = "পাসওয়ার্ডে কমপক্ষে ১টি বড় হাতের অক্ষর থাকতে হবে";
//     } else if (!/[0-9]/.test(user.password)) {
//       newErrors.password = "পাসওয়ার্ডে কমপক্ষে ১টি সংখ্যা থাকতে হবে";
//     }

//     setErrors(newErrors);

//     // কোনো validation error থাকলে এখানেই থামবে
//     if (newErrors.name || newErrors.email || newErrors.password) {
//       return;
//     }

//     const { data, error } = await authClient.signUp.email({
//       name: user.name.trim(),
//       email: user.email.trim(),
//       password: user.password,
//       callbackURL: "/", // A URL to redirect to after the user verifies their email (optional)
//     });
//     if (error) {
//       console.error("Signup error:", error);
//       alert(error.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে");
//     }

//     if (data) {
//       alert(`Hello ${user.name}`);
//       console.log(data);
//       redirect("/");
//     }
//   };

//   return (
//     <div className="min-h-screen flex justify-center mt-10 bg-base-100 px-4">
//       <form onSubmit={handleSubmit}>
//         <fieldset className="fieldset bg-base-200 border-base-300 rounded-2xl w-96 border p-6 shadow-lg">
//           <legend className="fieldset-legend text-2xl font-bold px-2">
//             রেজিস্ট্রেশন করুন
//           </legend>

//           {/* Name */}
//           <label className="label mt-2">আপনার নাম</label>
//           <input
//             type="text"
//             name="name"
//             className={`input input-bordered w-full ${
//               errors.name ? "input-error" : ""
//             }`}
//             placeholder="আপনার নাম লিখুন"
//           />

//           {errors.name && (
//             <p className="text-error text-sm mt-1">{errors.name}</p>
//           )}

//           {/* Email */}
//           <label className="label mt-3">ইমেইল</label>
//           <input
//             type="email"
//             name="email"
//             className={`input input-bordered w-full ${
//               errors.email ? "input-error" : ""
//             }`}
//             placeholder="আপনার ইমেইল লিখুন"
//           />

//           {errors.email && (
//             <p className="text-error text-sm mt-1">{errors.email}</p>
//           )}

//           {/* Password */}
//           <label className="label mt-3">পাসওয়ার্ড</label>
//           <input
//             type="password"
//             name="password"
//             className={`input input-bordered w-full ${
//               errors.password ? "input-error" : ""
//             }`}
//             placeholder="আপনার পাসওয়ার্ড লিখুন"
//           />

//           {errors.password && (
//             <p className="text-error text-sm mt-1">{errors.password}</p>
//           )}

//           <button
//             className="btn bg-red-700 text-white mt-6 w-full"
//             type="submit"
//           >
//             রেজিস্ট্রেশন করুন
//           </button>
//         </fieldset>
//       </form>
//     </div>
//   );
// };

// export default SignUpPage;

///////////////////////////////////////////////////////////

"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function SignUpPage() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    image: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let isValid = true;

    const newErrors = {
      name: "",
      email: "",
      image: "",
      password: "",
      confirmPassword: "",
    };

    // ================= NAME VALIDATION =================

    if (!name.trim()) {
      newErrors.name = "আপনার নাম প্রদান করুন";
      isValid = false;
    } else if (name.trim().length < 2) {
      newErrors.name = "নাম কমপক্ষে ২ অক্ষরের হতে হবে";
      isValid = false;
    }

    // ================= EMAIL VALIDATION =================

    if (!email.trim()) {
      newErrors.email = "আপনার ইমেইল প্রদান করুন";
      isValid = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      newErrors.email = "সঠিক ইমেইল ঠিকানা প্রদান করুন";
      isValid = false;
    }

    // ================= IMAGE URL VALIDATION =================

    if (image.trim()) {
      try {
        const imageUrl = new URL(image.trim());

        if (!["http:", "https:"].includes(imageUrl.protocol)) {
          newErrors.image = "সঠিক image URL প্রদান করুন";
          isValid = false;
        }
      } catch {
        newErrors.image = "সঠিক image URL প্রদান করুন";
        isValid = false;
      }
    }

    // ================= PASSWORD VALIDATION =================

    if (!password) {
      newErrors.password = "আপনার পাসওয়ার্ড প্রদান করুন";
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
      isValid = false;
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password = "পাসওয়ার্ডে কমপক্ষে ১টি বড় হাতের অক্ষর থাকতে হবে";
      isValid = false;
    } else if (!/[0-9]/.test(password)) {
      newErrors.password = "পাসওয়ার্ডে কমপক্ষে ১টি সংখ্যা থাকতে হবে";
      isValid = false;
    }

    // ================= CONFIRM PASSWORD =================

    if (!confirmPassword) {
      newErrors.confirmPassword = "পাসওয়ার্ড আবার প্রদান করুন";
      isValid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "পাসওয়ার্ড দুটি একই নয়";
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) return;

    setIsLoading(true);

    const { data, error } = await authClient.signUp.email({
      name: name.trim(),
      email: email.trim(),
      password,
      image: image.trim() || undefined,
      callbackURL: "/",
    });

    if (error) {
      toast.error(
        error.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।",
      );
      return;
    }

    if (data) {
      toast.success(`Welcome, ${data.user.name}! 🎉`);
      // console.log(name, email, password, image);
      redirect("/");
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
              অ্যাকাউন্ট তৈরি করুন
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              নতুন অ্যাকাউন্ট তৈরি করতে নিচের তথ্যগুলো পূরণ করুন
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
                value={name}
                onChange={(e) => {
                  setName(e.target.value);

                  if (errors.name) {
                    setErrors((prev) => ({
                      ...prev,
                      name: "",
                    }));
                  }
                }}
                placeholder="আপনার নাম লিখুন"
                className={`h-12 w-full rounded-xl border bg-gray-50 px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:bg-white focus:ring-4 ${
                  errors.name
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                    : "border-gray-200 focus:border-green-600 focus:ring-green-600/10"
                }`}
              />

              {errors.name && (
                <p className="mt-1.5 text-xs font-medium text-red-600">
                  {errors.name}
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
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);

                  if (errors.email) {
                    setErrors((prev) => ({
                      ...prev,
                      email: "",
                    }));
                  }
                }}
                placeholder="আপনার ইমেইল লিখুন"
                className={`h-12 w-full rounded-xl border bg-gray-50 px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:bg-white focus:ring-4 ${
                  errors.email
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                    : "border-gray-200 focus:border-green-600 focus:ring-green-600/10"
                }`}
              />

              {errors.email && (
                <p className="mt-1.5 text-xs font-medium text-red-600">
                  {errors.email}
                </p>
              )}
            </div>

            {/* ================= IMAGE URL ================= */}

            <div>
              <label
                htmlFor="image"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                প্রোফাইল ছবি URL
                <span className="ml-1 text-xs font-normal text-gray-400">
                  (ঐচ্ছিক)
                </span>
              </label>

              <input
                id="image"
                name="image"
                type="url"
                value={image}
                onChange={(e) => {
                  setImage(e.target.value);

                  if (errors.image) {
                    setErrors((prev) => ({
                      ...prev,
                      image: "",
                    }));
                  }
                }}
                placeholder="https://example.com/profile.jpg"
                className={`h-12 w-full rounded-xl border bg-gray-50 px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:bg-white focus:ring-4 ${
                  errors.image
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                    : "border-gray-200 focus:border-green-600 focus:ring-green-600/10"
                }`}
              />

              {errors.image ? (
                <p className="mt-1.5 text-xs font-medium text-red-600">
                  {errors.image}
                </p>
              ) : (
                <p className="mt-1.5 text-xs text-gray-400">
                  আপনার প্রোফাইল ছবির একটি সরাসরি image URL দিন।
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
                  errors.password
                    ? "border-red-500 focus-within:border-red-500 focus-within:ring-red-500/10"
                    : "border-gray-200 focus-within:border-green-600 focus-within:ring-green-600/10"
                }`}
              >
                <input
                  id="password"
                  name="password"
                  type={isPasswordVisible ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);

                    if (errors.password) {
                      setErrors((prev) => ({
                        ...prev,
                        password: "",
                      }));
                    }
                  }}
                  placeholder="আপনার পাসওয়ার্ড লিখুন"
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

              {errors.password && (
                <p className="mt-1.5 text-xs font-medium text-red-600">
                  {errors.password}
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
                  errors.confirmPassword
                    ? "border-red-500 focus-within:border-red-500 focus-within:ring-red-500/10"
                    : "border-gray-200 focus-within:border-green-600 focus-within:ring-green-600/10"
                }`}
              >
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={isConfirmVisible ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);

                    if (errors.confirmPassword) {
                      setErrors((prev) => ({
                        ...prev,
                        confirmPassword: "",
                      }));
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

              {errors.confirmPassword && (
                <p className="mt-1.5 text-xs font-medium text-red-600">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* ================= SIGN UP ================= */}

            <button
              type="submit"
              disabled={isLoading}
              className="flex h-12 w-full items-center justify-center rounded-xl bg-green-700 text-sm font-semibold text-white shadow-md shadow-green-700/20 transition-all duration-200 hover:bg-green-800 hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  অ্যাকাউন্ট তৈরি হচ্ছে...
                </span>
              ) : (
                "অ্যাকাউন্ট তৈরি করুন"
              )}
            </button>

            {/* ================= DIVIDER ================= */}

            <div className="flex items-center gap-3 py-1">
              <div className="h-px flex-1 bg-gray-200" />

              <span className="text-xs font-medium text-gray-400">অথবা</span>

              <div className="h-px flex-1 bg-gray-200" />
            </div>

            {/* ================= GOOGLE SIGN UP ================= */}

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
            ইতিমধ্যে আপনার অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/sign-in"
              className="font-semibold text-green-700 transition hover:text-green-800"
            >
              সাইন ইন করুন
            </Link>
          </p>
        </div>

        {/* ================= BOTTOM TEXT ================= */}

        <p className="mt-6 text-center text-xs leading-5 text-gray-400">
          অ্যাকাউন্ট তৈরি করার মাধ্যমে আপনি আমাদের{" "}
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
