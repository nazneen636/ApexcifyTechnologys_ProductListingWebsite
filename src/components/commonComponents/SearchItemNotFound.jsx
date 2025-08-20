import React from "react";

const SearchItemNotFound = () => {
  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center rounded-lg p-8 w-full h-[70vh] text-center shadow-md animate-fadeIn">
      <svg
        className="w-16 h-16 mx-auto mb-4 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <h3 className="text-2xl font-bold text-gray-700 mb-2">
        No Results Found
      </h3>
      <p className="text-gray-500 mb-4">
        We couldn't find any products matching your search.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 cursor-pointer bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Try Again
      </button>
    </div>
  );
};

export default SearchItemNotFound;
