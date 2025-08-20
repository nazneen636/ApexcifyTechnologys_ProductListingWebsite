import React from "react";
import CategorySidebarSkeleton from "../Skeleton/CategorySkeleton";

const CategorySidebar = ({ AllCategory, isLoading, onCategorySelect }) => {
  if (isLoading) return <CategorySidebarSkeleton />;
  return (
    <aside className="w-64 fixed bg-white px-4 border-r border-r-gray-200">
      {/* Filter Title */}
      <h2 className="text-lg font-bold mb-4">Filter</h2>

      {/* Brand */}
      <div className="">
        <h3 className="text-sm font-semibold mb-5 font-poppins text-black">
          Category
        </h3>
        <div className="mb-6 h-[80vh] overflow-y-scroll">
          {AllCategory?.map((category, index) => (
            <label
              key={index}
              onClick={() => onCategorySelect(category)}
              className="flex items-center gap-4 mb-2"
            >
              <input type="radio" name="category" className="w-4 h-4" />
              <span className="capitalize font-inter text-gray-700">
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default CategorySidebar;
