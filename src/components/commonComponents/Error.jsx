import React from "react";

const Error = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center p-6 bg-red-100 border border-red-400 rounded-lg mt-4 h-[70vh]">
      <svg
        className="w-12 h-12 text-red-600 mb-3"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
        />
      </svg>
      <h3 className="text-red-700 font-semibold text-lg mb-2">Oops!</h3>
      <p className="text-red-600 text-center text-sm">
        Something went wrong. Please try again later.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="mt-4 px-4 py-2 cursor-pointer bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        Retry
      </button>
    </div>
  );
};

export default Error;
