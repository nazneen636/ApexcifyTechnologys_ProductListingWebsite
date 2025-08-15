import React, { useState } from "react";
import ProductCard from "../components/commonComponents/ProductCard";
import CategorySidebar from "../components/ProductComponent/Category";
import {
  useGetAllProductQuery,
  useGetProductByCategoryQuery,
} from "../Feature/ProductApi";
import ProductSkeleton from "../components/Skeleton/ProductSkeleton";
import { FaBars, FaTh } from "react-icons/fa";

const Product = () => {
  //   const [gridPreview, setGridPreview] = useState(true);
  const [viewType, setViewType] = useState("grid");
  const { data, error, isLoading } = useGetAllProductQuery();
  const {
    data: allCategory,
    error: errorCategory,
    isLoading: isCategoryLoading,
  } = useGetProductByCategoryQuery();
  console.log(allCategory);
  if (isLoading) return <ProductSkeleton />;
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-4">
        <div className="">
          <CategorySidebar AllCategory={allCategory} />
        </div>
        {/* right side */}
        <div className="col-span-3">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-lg font-bold font-poppins">
              Product List{" "}
              <span className="text-green-600">({data?.limit})</span>
            </h1>

            <div className="flex items-center gap-8">
              {/* Sort by */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700 font-inter">
                  Sort by
                </span>
                <select className="border font-inter border-gray-300 rounded px-2 py-1 text-sm focus:outline-none">
                  <option>Low to High</option>
                  <option>High to Low</option>
                  <option>Newest</option>
                  <option>Best Rating</option>
                </select>
              </div>

              {/* View toggle */}
              <div className="flex items-center gap-2 text-gray-500">
                <button
                  onClick={() => setViewType("grid")}
                  className="p-2 border border-gray-300 rounded hover:bg-black hover:text-white transition-all"
                >
                  <FaTh />
                </button>
                <button
                  onClick={() => setViewType("list")}
                  className="p-2 border border-gray-300 rounded hover:bg-black hover:text-white transition-all"
                >
                  <FaBars />
                </button>
              </div>
            </div>
          </div>

          {/* product */}
          <div
            className={`${
              viewType == "grid" ? "grid grid-cols-3 gap-6" : "grid gap-y-6"
            }`}
          >
            {data?.products?.map((product) => (
              <ProductCard
                key={product?.id}
                itemData={product}
                viewType={viewType}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
