"use client";

import React from "react";

function Input({ onChange, value, label, name, type, error }) {
  function onInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    onChange(name, value);
  }

  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 px-1"
      >
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        required
        value={value}
        onChange={onInput}
        className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
      />
      {error && (
        <p className="text-xs capitalize text-red-400 px-2 pt-2 text-right">
          {error}
        </p>
      )}
    </div>
  );
}

export default Input;
