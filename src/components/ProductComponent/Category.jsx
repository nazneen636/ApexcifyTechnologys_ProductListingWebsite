import CategorySidebarSkeleton from "../Skeleton/CategorySkeleton";
import { RiFilterFill } from "react-icons/ri";

const CategorySidebar = ({ AllCategory, isLoading, onCategorySelect }) => {
  if (isLoading) return <CategorySidebarSkeleton />;
  return (
    <aside className="w-72 fixed bg-white px-4 border-r border-r-gray-200">
      <div className="mt-4">
        <h1 className="font-poppins font-bold text-3xl text-red-400 mb-8">
          Red Mart
        </h1>
      </div>
      {/* Filter Title */}
      <h2 className="text-lg font-bold mb-6 flex gap-2 items-center mt-2">
        {" "}
        <RiFilterFill className="text-gray-600" />
        Filter
      </h2>

      {/* Brand */}
      <div className="">
        <h3 className="text-sm font-semibold mb-5 font-poppins text-black">
          Category
        </h3>
        <div className="mb-6 h-[76vh] overflow-y-scroll">
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
