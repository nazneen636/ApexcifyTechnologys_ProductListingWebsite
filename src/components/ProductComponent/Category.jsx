import React from "react";
import CategorySidebarSkeleton from "../Skeleton/CategorySkeleton";

const CategorySidebar = ({ AllCategory, isLoading, onCategorySelect }) => {
  if (isLoading) return <CategorySidebarSkeleton />;
  return (
    <aside className="w-64 bg-white p-4 border-r border-r-gray-200">
      {/* Filter Title */}
      <h2 className="text-lg font-bold mb-4">Filter</h2>

      {/* Brand */}
      <div className="">
        <h3 className="text-sm font-semibold mb-2 font-poppins text-black">
          Category
        </h3>
        <div className="mb-6 h-[60vh] overflow-y-scroll">
          {AllCategory?.map((category, index) => (
            <label
              key={index}
              onClick={() => onCategorySelect(category)}
              className="flex items-center gap-3 mb-1"
            >
              <input type="radio" name="category" className="w-4 h-4" />
              <span className="capitalize font-inter text-gray-700">
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className=" border-t border-t-gray-200 pt-4">
        <h3 className="text-sm font-semibold mb-2 font-poppins text-black">
          Price
        </h3>
        {["50 - 100", "100 - 150", "150 - 200", "200 - 250", "250 - 300"].map(
          (price, i) => (
            <label key={i} className="flex items-center gap-2 mb-1">
              <input type="radio" name="price" className="w-4 h-4" />
              <span className="capitalize font-inter text-gray-700">
                {price}
              </span>
            </label>
          )
        )}
      </div>
    </aside>
  );
};

export default CategorySidebar;
