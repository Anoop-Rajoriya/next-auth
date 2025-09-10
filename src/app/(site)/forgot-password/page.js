import Link from "next/link";
import React from "react";

function page() {
  return (
    <div className="w-full max-w-md p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-md mx-auto my-8">
      {/* Title */}
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">
        Forgot Password
      </h2>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
        Enter your email address and we’ll send you a link to reset your
        password.
      </p>

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

        {/* Reset Button */}
        <button
          type="submit"
          className="w-full px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Send Reset Link
        </button>
      </form>

      {/* Back to Login */}
      <div className="mt-6 flex items-center justify-center">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          Remember your password?{" "}
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
