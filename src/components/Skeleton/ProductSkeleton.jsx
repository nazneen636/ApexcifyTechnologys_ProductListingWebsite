import React from "react";

const ProductCardSkeleton = ({ viewType = "grid" }) => {
  return (
    <div className="w-full animate-pulse">
      {/* GRID VIEW SKELETON */}
      {viewType === "grid" && (
        <div className="w-full">
          <div className="bg-gray-100 rounded-2 overflow-hidden pb-[55px] px-4 pt-4 relative">
            {/* Top Row (Discount + Icons) */}
            <div className="flex justify-between mb-2">
              <div className="w-12 h-5 bg-gray-300 rounded"></div>
              <div className="flex flex-col gap-2">
                <div className="w-[35px] h-[35px] bg-gray-300 rounded-full"></div>
                <div className="w-[35px] h-[35px] bg-gray-300 rounded-full"></div>
              </div>
            </div>

            {/* Product Image */}
            <div className="w-[172px] h-[152px] bg-gray-300 rounded mx-auto"></div>

            {/* Add to Cart Button */}
            <div className="absolute left-0 bottom-0 w-full h-12 bg-gray-300"></div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col items-start gap-y-2 mt-4">
            <div className="h-4 w-40 bg-gray-300 rounded"></div>
            <div className="flex items-center gap-x-3">
              <div className="h-4 w-16 bg-gray-300 rounded"></div>
              <div className="h-4 w-14 bg-gray-300 rounded"></div>
            </div>
            <div className="flex items-center gap-x-2">
              <div className="h-4 w-20 bg-gray-300 rounded"></div>
              <div className="h-4 w-8 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      )}

      {/* LIST VIEW SKELETON */}
      {viewType === "list" && (
        <div className="flex gap-6 bg-gray-100 rounded-lg p-4">
          {/* Image */}
          <div className="w-40 h-40 bg-gray-300 rounded"></div>

          {/* Details */}
          <div className="flex flex-col justify-between flex-1">
            <div>
              <div className="h-5 w-40 bg-gray-300 rounded mb-2"></div>
              <div className="flex items-center gap-x-3 mb-2">
                <div className="h-4 w-16 bg-gray-300 rounded"></div>
                <div className="h-4 w-14 bg-gray-300 rounded"></div>
              </div>
              <div className="flex items-center gap-x-2 mb-3">
                <div className="h-4 w-20 bg-gray-300 rounded"></div>
                <div className="h-4 w-8 bg-gray-300 rounded"></div>
              </div>
              <div className="h-3 w-full bg-gray-300 rounded mb-1"></div>
              <div className="h-3 w-3/4 bg-gray-300 rounded mb-1"></div>
              <div className="h-3 w-2/4 bg-gray-300 rounded"></div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 mt-4">
              <div className="w-24 h-9 bg-gray-300 rounded"></div>
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCardSkeleton;
