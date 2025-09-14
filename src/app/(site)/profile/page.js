"use client";

import { useAuth } from "@/components/AuthProvider";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Page() {
  const { user, loading } = useAuth();

  return (
    <>
      <Header />
      <main className="flex-1 px-6 py-8 bg-gray-50 dark:bg-gray-950 max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
        {loading ? (
          <p className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 text-gray-500">
            Loading user data...
          </p>
        ) : user ? (
          <>
            {/* Profile Card */}
            <aside className="col-span-1 bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6 flex flex-col items-center text-center space-y-4">
              <div className="relative">
                <div className="size-28 rounded-full p-1 border-4 border-indigo-500 dark:border-indigo-400">
                  <Image
                    src="/images/profile.png"
                    width={512}
                    height={512}
                    alt="Profile Image"
                    className="rounded-full object-cover"
                  />
                </div>
                {user?.isVarified && (
                  <span className="absolute bottom-2 right-2 size-4 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></span>
                )}
              </div>

              <div>
                <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {user?.name || "Anoop Rajoriya"}
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {user?.email || "anooprajoirya@gmail.com"}
                </p>
              </div>

              <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                <p>
                  <span className="font-medium">Created:</span>
                  {"  "}
                  {user?.createdAt}
                </p>
                <p>
                  <span className="font-medium">Updated:</span>
                  {"  "}
                  {user?.updatedAt}
                </p>
              </div>

              {user?.isVarified && (
                <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100">
                  Verified
                </span>
              )}
            </aside>

            {/* Settings Form */}
            <section className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6 space-y-8">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white border-b pb-2">
                Account Settings
              </h2>

              {/* Update form */}
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Name
                  </label>
                  <input
                    type="text"
                    defaultValue={user?.name || "Anoop Rajoriya"}
                    className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-white px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue={user?.email || "anooprajoirya@gmail.com"}
                    className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 dark:text-white px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <button
                  disabled={!user.isVarified}
                  type="submit"
                  className={`w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    !user.isVarified && "cursor-not-allowed"
                  }`}
                >
                  Update Profile
                </button>
              </form>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-4 pt-4 border-t">
                <Link
                  href="/verify-user"
                  className="flex-1 py-2 px-4 bg-green-600 hover:bg-green-700 text-white text-center rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Verify User
                </Link>
                <button className="flex-1 py-2 px-4 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-yellow-500">
                  Forgot Password
                </button>
                <button className="flex-1 py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-red-500">
                  Delete Account
                </button>
              </div>
            </section>
          </>
        ) : (
          <p className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 text-red-500">
            User not found
          </p>
        )}
      </main>
      <Footer />
    </>
  );
}

export default Page;
