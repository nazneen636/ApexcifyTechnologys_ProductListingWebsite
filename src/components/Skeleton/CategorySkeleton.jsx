import React from "react";

const CategorySidebarSkeleton = () => {
  return (
    <aside className="w-64 bg-white p-4 border-r border-r-gray-200 animate-pulse">
      {/* Filter Title */}
      <div className="h-6 w-20 bg-gray-300 rounded mb-4"></div>

      {/* Category Title */}
      <div className="h-4 w-24 bg-gray-300 rounded mb-3"></div>

      {/* Category Skeleton List */}
      <div className="mb-6 h-[60vh] overflow-y-hidden">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="flex items-center gap-3 mb-2">
            <div className="w-4 h-4 bg-gray-300 rounded"></div>
            <div className="h-3 w-32 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>

      {/* Price Section */}
      <div className="border-t border-t-gray-200 pt-4">
        <div className="h-4 w-20 bg-gray-300 rounded mb-3"></div>
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-center gap-3 mb-2">
            <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
            <div className="h-3 w-28 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default CategorySidebarSkeleton;
