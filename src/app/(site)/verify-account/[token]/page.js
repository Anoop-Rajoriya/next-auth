"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import FormButton from "@/components/FormButton";
import Input from "@/components/Input";

function Page() {
  const { token } = useParams();
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    email: "",
    error: null,
    status: "enable",
  });

  const onInput = (_, value) => setForm((pre) => ({ ...pre, email: value }));

  const resend = (e) => {
    e.preventDefault();
    setForm((pre) => ({ ...pre, status: "loading" }));
    axios.post("/api/resend-verification", { email: form.email })
      .then(() => {
        setForm((pre) => ({ ...pre, status: "successful" }));
      })
      .catch((err) => {
        const message = err.response.data.message || err.message;
        setForm((pre) => ({ ...pre, status: "enable" }));
        setError(message);
        console.log(err);
      });
  };

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
          const message = err.response?.data?.message || err.message;
          console.log(err);
          if (status === 410) {
            setStatus("already");
          } else {
            setStatus("unverified");
            setError(message);
          }
        });
    }
  }, [token]);

  return (
    <main className="w-full max-w-md p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-md mx-auto my-8">
      {/* Title */}
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
        Verify Account
      </h2>

      {/* Error */}
      {error && <p className="text-red-400 capitalize py-2">{error}</p>}

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
        <form className="space-y-5" onSubmit={resend}>
          <Input
            value={form.email}
            onChange={onInput}
            error={form.error}
            type="email"
            label="Registered Email"
            name="email"
          />
          <FormButton
            type="submit"
            label="Resend Verification Link"
            formState={form.status}
          />
        </form>
      )}
    </main>
  );
}

export default Page;
