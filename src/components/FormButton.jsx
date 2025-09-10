"use client";

import React from "react";

function FormButton({ type, label, formState }) {
  return (
    <button
      type={type}
      disabled={
        formState === "disable" ||
        formState === "loading" ||
        formState === "successful"
      }
      className={`w-full px-4 py-2 rounded-lg font-medium focus:outline-none focus:ring-2 transition-colors ${
        formState === "loading"
          ? "bg-gray-400 text-gray-100 cursor-not-allowed"
          : formState === "disable"
          ? "bg-indigo-800 text-white cursor-not-allowed"
          : "bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
      }`}
    >
      {formState === "loading"
        ? "Loading..."
        : formState === "successful"
        ? `${label} ✔`
        : `${label}`}
    </button>
  );
}

export default FormButton;
