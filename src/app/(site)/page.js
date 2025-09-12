import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Link from "next/link";
import React from "react";

function page() {
  return (
    <>
      <Header />

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
        </div>
      </section>

      <Footer />
    </>
  );
}

export default page;
