import Image from "next/image";
import React from "react";

function page() {
  return (
    <div className="w-full max-w-2xl p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-md mx-auto my-8">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-20 h-20 p-2 rounded-full border-2 border-indigo-500">
          <Image
            src="/images/profile.png"
            alt="Profile image"
            width={512}
            height={512}
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            John Doe
          </h2>
          <p className="text-gray-600 dark:text-gray-400">john@example.com</p>
        </div>
      </div>

      {/* Manage Profile */}
      <form className="space-y-6">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            defaultValue="John Doe"
            className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

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
            defaultValue="john@example.com"
            className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Change Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            New Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Save Changes */}
        <button
          type="submit"
          className="w-full px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Save Changes
        </button>
      </form>

      {/* Danger Zone */}
      <div className="mt-10 border-t pt-6 border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-3">
          Danger Zone
        </h3>
        <button className="px-4 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600">
          Delete Account
        </button>
      </div>
    </div>
  );
}

export default page;
