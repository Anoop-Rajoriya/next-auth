"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/Input";
import FormButton from "@/components/FormButton";

function page() {
  const router = useRouter();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: null,
    email: null,
    password: null,
  });
  const [error, setError] = useState(null);
  const [loginState, setLoginState] = useState("disable");

  const onInput = (name, value) => {
    setUser((pre) => ({ ...pre, [name]: value }));
  };

  async function onLogin(event) {
    event.preventDefault();
    setLoginState("loading");
    try {
      const res = await axios.post("/api/register", user);
      setLoginState("successful");
      router.push("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message;
        const errors = error.response?.data?.errors;
        if (errorMessage) {
          setError("Error: " + errorMessage);
        }
        if (Object.keys(error).length > 0) {
          setErrors((pre) => ({ ...pre, ...errors }));
        }
      } else {
        setError("Error: " + error.message);
      }
      setLoginState("enable");
    }
  }

  useEffect(
    function () {
      const isReadyToSignUp =
        user.name.trim().length &&
        user.email.trim().length &&
        user.password.trim().length;

      if (isReadyToSignUp) {
        setLoginState("enable");
        setErrors({ name: null, email: null, password: null });
        setError(null);
      }
    },
    [user]
  );

  return (
    <div className="w-full max-w-md p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-md mx-auto my-8">
      {/* Title */}
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">
        Create an Account
      </h2>

      {/* Error */}
      {error && <p className="text-red-400 capitalize p-2">{error}</p>}

      {/* Form */}
      <form className="space-y-5 mt-4" onSubmit={onLogin}>
        {/* Name */}
        <Input
          onChange={onInput}
          value={user.name}
          label="Your Name"
          name="name"
          type="text"
          error={errors.name}
        />

        {/* Email */}
        <Input
          onChange={onInput}
          value={user.email}
          label="Email Address"
          name="email"
          type="email"
          error={errors.email}
        />

        {/* Password */}
        <Input
          onChange={onInput}
          value={user.password}
          label="Your Password"
          name="password"
          type="password"
          error={errors.password}
        />

        {/* Sign Up Button */}
        <FormButton type="submit" label="Sign Up" formState={loginState} />
      </form>

      {/* Divider */}
      <div className="mt-6 flex items-center justify-center">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Log in
          </Link>
        </span>
      </div>
    </div>
  );
}

export default page;
