"use client";

import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { useState } from "react";

const SignUpPage = () => {
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const user = Object.fromEntries(formData.entries()) as {
      name: string;
      email: string;
      password: string;
    };

    const newErrors = {
      name: "",
      email: "",
      password: "",
    };

    // Name validation
    if (!user.name.trim()) {
      newErrors.name = "আপনার নাম প্রদান করুন";
    } else if (user.name.trim().length < 2) {
      newErrors.name = "নাম কমপক্ষে ২ অক্ষরের হতে হবে";
    }

    // Email validation
    if (!user.email.trim()) {
      newErrors.email = "আপনার ইমেইল প্রদান করুন";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(user.email)) {
      newErrors.email = "সঠিক ইমেইল ঠিকানা প্রদান করুন";
    }

    // Password validation
    if (!user.password) {
      newErrors.password = "আপনার পাসওয়ার্ড প্রদান করুন";
    } else if (user.password.length < 8) {
      newErrors.password = "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
    } else if (!/[A-Z]/.test(user.password)) {
      newErrors.password = "পাসওয়ার্ডে কমপক্ষে ১টি বড় হাতের অক্ষর থাকতে হবে";
    } else if (!/[0-9]/.test(user.password)) {
      newErrors.password = "পাসওয়ার্ডে কমপক্ষে ১টি সংখ্যা থাকতে হবে";
    }

    setErrors(newErrors);

    // কোনো validation error থাকলে এখানেই থামবে
    if (newErrors.name || newErrors.email || newErrors.password) {
      return;
    }

    const { data, error } = await authClient.signUp.email({
      name: user.name.trim(),
      email: user.email.trim(),
      password: user.password,
      callbackURL: "/dashboard", // A URL to redirect to after the user verifies their email (optional)
    });
    if (error) {
      console.error("Signup error:", error);
      alert(error.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে");
    }

    if (data) {
      alert(`Hello ${user.name}`);
      console.log(data);
      redirect("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
      <form onSubmit={handleSubmit}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-2xl w-96 border p-6 shadow-lg">
          <legend className="fieldset-legend text-2xl font-bold px-2">
            রেজিস্ট্রেশন করুন
          </legend>

          {/* Name */}
          <label className="label mt-2">আপনার নাম</label>
          <input
            type="text"
            name="name"
            className={`input input-bordered w-full ${
              errors.name ? "input-error" : ""
            }`}
            placeholder="আপনার নাম লিখুন"
          />

          {errors.name && (
            <p className="text-error text-sm mt-1">{errors.name}</p>
          )}

          {/* Email */}
          <label className="label mt-3">ইমেইল</label>
          <input
            type="email"
            name="email"
            className={`input input-bordered w-full ${
              errors.email ? "input-error" : ""
            }`}
            placeholder="আপনার ইমেইল লিখুন"
          />

          {errors.email && (
            <p className="text-error text-sm mt-1">{errors.email}</p>
          )}

          {/* Password */}
          <label className="label mt-3">পাসওয়ার্ড</label>
          <input
            type="password"
            name="password"
            className={`input input-bordered w-full ${
              errors.password ? "input-error" : ""
            }`}
            placeholder="আপনার পাসওয়ার্ড লিখুন"
          />

          {errors.password && (
            <p className="text-error text-sm mt-1">{errors.password}</p>
          )}

          <button
            className="btn bg-red-700 text-white mt-6 w-full"
            type="submit"
          >
            রেজিস্ট্রেশন করুন
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default SignUpPage;
