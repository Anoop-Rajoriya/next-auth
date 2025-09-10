"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import Input from "@/components/Input";
import FormButton from "@/components/FormButton";

function page() {
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

  function onSubmit(event) {
    event.preventDefault();
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
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
        Sign in to Your Account
      </h2>

      <form onSubmit={onSubmit} className="space-y-5">
        <Input
          type="email"
          name="email"
          label="Email Address"
          value={user.email}
          onChange={onInput}
          error={errors.email}
        />
        <Input
          type="password"
          name="password"
          label="Your password"
          value={user.password}
          onChange={onInput}
          error={errors.email}
        />

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
