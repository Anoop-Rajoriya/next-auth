import Link from "next/link";
import React from "react";

function page() {
  return (
    <>
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-4 shadow-sm bg-white dark:bg-gray-900 transition-colors">
        <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
          NextAuthApp
        </h1>
        <nav className="space-x-4">
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
        </nav>
      </header>
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-1 px-8 text-center bg-gradient-to-br from-indigo-50 to-white dark:from-gray-900 dark:to-gray-950 transition-colors">
        <h2 className="text-5xl font-extrabold mb-4">
          Secure Authentication for Your App
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mb-6">
          A simple and secure way to manage user authentication with Next.js.
          Protect your routes, handle sessions, and provide a smooth login
          experience.
        </p>
        <div className="space-x-4">
          <Link
            href="/register"
            className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="px-6 py-3 rounded-lg border border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-gray-800"
          >
            Sign In
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-gray-100 text-center text-gray-600 dark:bg-gray-950 dark:text-gray-400 transition-colors">
        © {new Date().getFullYear()} NextAuthApp. All rights reserved.
      </footer>
    </>
  );
}

export default page;
