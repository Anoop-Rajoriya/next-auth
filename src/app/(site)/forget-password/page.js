"use client";

import FormButton from "@/components/FormButton";
import Input from "@/components/Input";
import axios from "axios";
import React, { useState } from "react";

function Page() {
  const [form, setForm] = useState({
    email: "",
    emailError: null,
    error: null,
    success: null,
    status: "enable",
  });

  function onInput(name, value) {
    setForm((pre) => ({ ...pre, email: value }));
  }
  function onSubmit(e) {
    e.preventDefault();
    setForm((pre) => ({ ...pre, status: "loading" }));
    axios
      .post("/api/password/send-token", { email: form.email })
      .then((res) => {
        const success = res.data.message;
        setForm((pre) => ({ ...pre, success: success, status: "successful" }));
      })
      .catch((err) => {
        const error = err.response.data.message || err.message;
        setForm((pre) => ({ ...pre, error, status: "enable" }));
      });
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-2">
          Forget Your Password
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
          Enter your registered email and we’ll send you a reset link.
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
        <form onSubmit={onSubmit} className="space-y-5">
          <Input
            value={form.email}
            onChange={onInput}
            error={form.emailError}
            name="email"
            label={"Registered Email"}
            type="email"
          />
          <FormButton type={"submit"} label={"Send"} formState={form.status} />
        </form>
      </div>
    </main>
  );
}

export default Page;
