import React from "react";

function page() {
  return (
    <div className="w-full max-w-md p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-md mx-auto my-8">
      {/* Title */}
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">
        Update Password
      </h2>

      {/* Form */}
      <form className="space-y-5">
        {/* previous password */}
        <div>
          <label
            htmlFor="pre-password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Previous Password
          </label>
          <input
            id="pre-password"
            name="pre-password"
            type="pre-password"
            required
            className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>
        {/* new password */}
        <div>
          <label
            htmlFor="new-password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            New Password
          </label>
          <input
            id="new-password"
            name="new-password"
            type="new-password"
            required
            className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Update Button */}
        <button
          type="submit"
          className="w-full px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}

export default page;
