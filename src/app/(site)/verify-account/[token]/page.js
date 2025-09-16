"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";

function Page() {
  const { token } = useParams();
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);

  useEffect(() => {
    // Example verification flow
    if (!token) {
      setStatus("unverified");
    } else {
      axios
        .post("/api/verify-account", { token })
        .then((res) => {
          setStatus("verified");
        })
        .catch((err) => {
          const status = err.status;
          if (status === 410) {
            setStatus("already");
          } else {
            setStatus("unverified");
            setError(err.message);
          }
        });
    }
  }, [token]);

  const onClick = () => {};

  return (
    <main className="w-full max-w-md p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-md mx-auto my-8">
      {/* Title */}
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
        Verify Account
      </h2>

      {/* Error */}
      {error && <p className="text-red-400 capitalize p-2">{error}</p>}

      {/* States */}
      {status === "loading" && (
        <p className="text-center text-gray-600 dark:text-gray-300">
          Verifying your account...
        </p>
      )}

      {status === "verified" && (
        <div className="text-center">
          <p className="text-green-500 font-semibold text-lg mb-3">
            ✅ Your account is verified!
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            You can now{" "}
            <Link className="text-indigo-500 capitalize" href="/login">
              log in
            </Link>{" "}
            and access all features.
          </p>
        </div>
      )}

      {status === "already" && (
        <div className="text-center">
          <p className="text-blue-500 font-semibold text-lg mb-3">
            ℹ️ This account is already verified.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            No further action is required. You can{" "}
            <Link className="text-indigo-500 capitalize" href="/login">
              log in
            </Link>{" "}
            directly.
          </p>
        </div>
      )}

      {status === "unverified" && (
        <button
          onClick={onClick}
          className="w-full px-4 py-2 rounded-lg font-medium focus:outline-none focus:ring-2 transition-colors bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
        >
          Resend Verificaiton Link
        </button>
      )}
    </main>
  );
}

export default Page;
