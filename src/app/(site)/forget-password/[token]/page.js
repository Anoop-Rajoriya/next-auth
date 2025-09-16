"use client";

import FormButton from "@/components/FormButton";
import Input from "@/components/Input";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useState } from "react";

function Page() {
  const { token } = useParams();
  const [form, setForm] = useState({
    password: "",
    passwordError: null,
    confirmPassword: "",
    confirmPasswordError: null,
    error: null,
    success: null,
    status: "enable",
  });

  function onInput(name, value) {
    setForm((pre) => ({ ...pre, [name]: value }));
  }
  function onSubmit(e) {
    e.preventDefault();
    setForm((pre) => ({ ...pre, error: null, status: "loading" }));
    axios
      .post("/api/password/update-password", {
        token,
        password: form.password,
        confirmPassword: form.confirmPassword,
      })
      .then((res) => {
        const success = res.data.message;
        setForm((pre) => ({ ...pre, success, status: "successful" }));
      })
      .catch((err) => {
        const message = err.response.data.message || err.message;
        setForm((pre) => ({ ...pre, error: message, status: "enable" }));
      });
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-md">
        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-2">
          Reset Your Password
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
          Create a new password for your account.
        </p>

        {/* Error & Success messages */}
        {form.error && (
          <p className="text-red-500 bg-red-100 dark:bg-red-900/40 p-2 rounded mb-4 text-sm">
            {form.error}
          </p>
        )}
        {form.success && (
          <p className="text-green-500 bg-green-100 dark:bg-green-900/40 p-2 rounded mb-4 text-sm">
            {form.success}
          </p>
        )}

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-5">
          <Input
            value={form.password}
            onChange={onInput}
            error={form.passwordError}
            name="password"
            label="New Password"
            type="password"
          />
          <Input
            value={form.confirmPassword}
            onChange={onInput}
            error={form.confirmPasswordError}
            name="confirmPassword"
            label="Confirm New Password"
            type="password"
          />
          <FormButton
            type="submit"
            label={
              form.status === "loading" ? "Resetting..." : "Reset Password"
            }
            formState={form.status}
          />
        </form>

        {/* Back to login */}
        <p className="mt-6 text-sm text-center text-gray-500 dark:text-gray-400">
          Remember your password?{" "}
          <a
            href="/login"
            className="text-indigo-600 hover:underline dark:text-indigo-400"
          >
            Log in
          </a>
        </p>
      </div>
    </main>
  );
}

export default Page;
