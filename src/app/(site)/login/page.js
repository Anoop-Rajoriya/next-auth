import Link from "next/link";
import React from "react";

function page() {
  return (
    <div className="w-full max-w-md p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-md mx-auto my-8">
      {/* Title */}
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
        Sign in to Your Account
      </h2>

      {/* Form */}
      <form className="space-y-5">
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Remember Me + Forgot Password */}
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
        <button
          type="submit"
          className="w-full px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Log In
        </button>
      </form>

      {/* Divider */}
      <div className="mt-6 flex items-center justify-center">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          Don’t have an account?{" "}
          <Link
            href="/register"
            className="text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Sign up
          </Link>
        </span>
      </div>
    </div>
  );
}

export default page;
