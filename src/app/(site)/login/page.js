"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from "@/components/Input";
import FormButton from "@/components/FormButton";
import { useAuth } from "@/components/AuthProvider";

function page() {
  const router = useRouter();
  const { loginUser } = useAuth();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: null,
    password: null,
  });
  const [error, setError] = useState(null);
  const [formState, setFormState] = useState("disable");

  const onInput = (name, value) =>
    setUser((pre) => ({ ...pre, [name]: value }));

  async function onSubmit(event) {
    event.preventDefault();
    setFormState("loading");
    setError(null);
    setErrors({
      name: null,
      password: null,
    });
    try {
      await axios.post("/api/login", user);
      await loginUser();
      setFormState("successful");
      router.push("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message;
        const errors = error.response?.data?.errors;

        if (errorMessage) {
          setError("Error: " + errorMessage);
        }
        if (Object.keys(errors).length) {
          setErrors((pre) => ({ ...pre, ...errors }));
        }
      } else {
        setError("Error: " + error.message);
      }
      setFormState("enable");
    }
  }

  useEffect(
    function () {
      const isReadyToSignUp =
        user.email.trim().length && user.password.trim().length;

      if (isReadyToSignUp) {
        setFormState("enable");
        setErrors({ name: null, email: null, password: null });
        setError(null);
      }
    },
    [user]
  );

  return (
    <div className="w-full max-w-md p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-md mx-auto my-8">
      {/* Title */}
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
        Sign in to Your Account
      </h2>

      {/* Error */}
      {error && <p className="text-red-400 capitalize p-2">{error}</p>}

      <form onSubmit={onSubmit} className="space-y-5">
        {/* Name */}
        <Input
          type="email"
          name="email"
          label="Email Address"
          value={user.email}
          onChange={onInput}
          error={errors.email}
        />

        {/* Password */}
        <Input
          type="password"
          name="password"
          label="Your password"
          value={user.password}
          onChange={onInput}
          error={errors.password}
        />

        {/* Forgot Link */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
            <input
              type="checkbox"
              className="rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500"
            />
            <span>Remember me</span>
          </label>
          <Link
            href="/forgot-password"
            className="text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {/* Login Button */}
        <FormButton type="submit" label="Login" formState={formState} />
      </form>

      {/* Divider */}
      <div className="mt-6 flex items-center justify-center">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          Do not have an account?{" "}
          <Link
            href="/register"
            className="text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Sign Up
          </Link>
        </span>
      </div>
    </div>
  );
}

export default page;
