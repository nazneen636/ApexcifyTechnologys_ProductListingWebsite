import React from "react";
import { FaRegHeart } from "react-icons/fa";
import Star from "./Star";
import { Link } from "react-router";
import { MdOutlineRemoveRedEye } from "react-icons/md";

const ProductCardList = ({ itemData, viewType = "grid" }) => {
  if (!itemData) return null;

  // Common price calculation
  const discountedPrice =
    itemData?.price && itemData?.discountPercentage
      ? (
          itemData?.price -
          (itemData?.discountPercentage * itemData?.price) / 100
        ).toFixed(2)
      : null;

  return (
    <Link to={`/productdetails/${itemData.id}`} className="w-full">
      {/* GRID VIEW */}
      {viewType === "grid" && (
        <div className="w-full">
          <div className="bg-gray-100 rounded-2 overflow-hidden pb-[55px] px-4 pt-4 rounded relative group cursor-pointer">
            <div className="flex justify-between">
              {itemData.discountPercentage && (
                <span className="px-3 py-2 rounded bg-red-400 h-fit font-poppins text-sm text-white font-normal">
                  -{itemData?.discountPercentage}%
                </span>
              )}
              <div className="flex flex-col">
                <div className="w-[35px] h-[35px] flex justify-center items-center rounded-full bg-white cursor-pointer hover:bg-red-400 hover:text-white text-xl">
                  <FaRegHeart />
                </div>
                <div className="w-[35px] h-[35px] flex justify-center items-center rounded-full bg-white cursor-pointer hover:bg-red-400 hover:text-white text-xl mt-2">
                  <MdOutlineRemoveRedEye />
                </div>
              </div>
            </div>

            <div className="flex justify-between cursor-pointer">
              <div className="w-[172px] h-[152px] flex-1">
                <img
                  src={itemData?.thumbnail}
                  alt="product"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>

            <div className="opacity-0 absolute left-0 bottom-0 font-poppins font-medium text-lg cursor-pointer flex justify-center items-center w-full h-12 bg-black text-white group-hover:opacity-100 transition-all">
              <h3>Add To Cart</h3>
            </div>
          </div>

          <div className="flex flex-col items-start gap-y-2 mt-4">
            <h2 className="text-lg font-poppins font-medium cursor-pointer w-full truncate">
              {itemData?.title}
            </h2>
            <div className="flex items-center gap-x-3 cursor-pointer">
              <span className="text-red-400 font-medium text-lg font-poppins">
                ${discountedPrice}
              </span>
              <span className="text-black opacity-50 font-medium text-lg font-poppins line-through">
                ${(itemData?.price).toFixed(2)}
              </span>
            </div>
            <div className="flex items-center gap-x-1 cursor-pointer">
              <Star rating={itemData?.rating} />
              <h3 className="text-black opacity-50 font-medium text-lg font-poppins ml-2">
                ({parseInt(itemData?.rating)})
              </h3>
            </div>
          </div>
        </div>
      )}

      {/* LIST VIEW */}
      {viewType === "list" && (
        <div className="flex gap-6 bg-gray-100 rounded-lg p-4 hover:shadow-md transition">
          {/* Image */}
          <div className="w-40 h-40 flex-shrink-0 flex items-center justify-center bg-white rounded">
            <img
              src={itemData?.thumbnail}
              alt="product"
              className="h-full w-full object-contain"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-between flex-1">
            <div>
              <h2 className="text-lg font-poppins font-medium mb-2">
                {itemData?.title}
              </h2>
              <div className="flex items-center gap-x-3 mb-2">
                <span className="text-red-400 font-medium text-lg font-poppins">
                  ${discountedPrice}
                </span>
                <span className="text-black opacity-50 font-medium text-lg font-poppins line-through">
                  ${(itemData?.price).toFixed(2)}
                </span>
              </div>
              <div className="flex items-center gap-x-1">
                <Star rating={itemData?.rating} />
                <h3 className="text-black opacity-50 font-medium text-lg font-poppins ml-2">
                  ({parseInt(itemData?.rating)})
                </h3>
              </div>
              <p className="text-sm text-gray-500 mt-3 line-clamp-3">
                {itemData?.description || "No description available."}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 mt-4">
              <button className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
                Add to Cart
              </button>
              <button className="w-10 h-10 flex justify-center items-center rounded-full bg-white border hover:bg-red-400 hover:text-white">
                <FaRegHeart />
              </button>
              <button className="w-10 h-10 flex justify-center items-center rounded-full bg-white border hover:bg-red-400 hover:text-white">
                <MdOutlineRemoveRedEye />
              </button>
            </div>
          </div>
        </div>
      )}
    </Link>
  );
};

export default ProductCardList;
