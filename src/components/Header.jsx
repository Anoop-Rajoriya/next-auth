"use client";
import Link from "next/link";
import React from "react";
import { useAuth } from "./AuthProvider";

function Header() {
  const { user, loading, logoutUser } = useAuth();

  return (
    <header className="flex justify-between items-center px-8 py-4 shadow-sm bg-white dark:bg-gray-900 transition-colors">
      <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
        NextAuthApp
      </h1>
      <nav className="space-x-4">
        {loading ? (
          <span className="text-gray-500">Checking session...</span>
        ) : user ? (
          <>
            <Link
              href="/profile"
              className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              Profile
            </Link>
            <button
              onClick={logoutUser}
              className="text-red-600 dark:text-red-500 hover:text-red-700 dark:hover:text-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
            >
              Sign Up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
