import React from "react";
import { FaEye, FaHeart, FaRegHeart } from "react-icons/fa";
import Star from "./Star";
import { Link } from "react-router";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishList } from "../../Feature/slices/wishlistSlice";

const ProductCardList = ({ itemData, viewType = "grid" }) => {
  const dispatch = useDispatch();
  const wishList = useSelector((state) => state.wishList);
  const isWishListed = wishList.some((item) => item.id === itemData.id);

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
    <div className="w-full">
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
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => dispatch(toggleWishList(itemData))}
                  className="w-10 h-10 flex justify-center items-center rounded-full hover:bg-red-100 cursor-pointer border border-red-400 text-red-600 transition-all"
                >
                  {isWishListed ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart />
                  )}
                </button>
                <Link
                  to={`/productdetails/${itemData?.id}`}
                  className="w-10 h-10 flex justify-center items-center rounded-full hover:bg-green-100 cursor-pointer border border-green-600 text-green-700 transition-all"
                >
                  <FaEye />
                </Link>
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
        <div className="grid grid-cols-5 gap-6 bg-gray-100 rounded-lg p-4 hover:shadow-md transition">
          {/* Image */}
          <div className="w-full h-full flex-shrink-0 flex items-center justify-center bg-white rounded">
            <img
              src={itemData?.thumbnail}
              alt="product"
              className="h-full w-full object-contain"
            />
          </div>

          {/* Details */}
          <div className="col-span-4 flex flex-col justify-between flex-1">
            <div>
              <div className="flex items-center gap-5 mb-5">
                <h2 className="text-lg font-poppins font-medium ">
                  {itemData?.title}
                </h2>
                <div className="">
                  {itemData.discountPercentage && (
                    <span className="px-3 py-2 rounded bg-red-400 h-fit font-poppins text-sm text-white font-normal">
                      -{itemData?.discountPercentage}%
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-x-3 mb-2">
                <span className="text-red-400 font-medium text-lg font-poppins">
                  ${discountedPrice}
                </span>
                <span className="text-black opacity-50 font-medium text-lg font-poppins line-through">
                  ${(itemData?.price).toFixed(2)}
                </span>
                {/* <button
                  onClick={() => dispatch(toggleWishList(itemData))}
                  className="w-[35px] h-[35px] flex justify-center items-center rounded-full hover:bg-red-100 cursor-pointer border border-red-400 text-red-600 ml-4"
                >
                  {isWishListed ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart />
                  )}
                </button> */}
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
              <button className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 cursor-pointer">
                Add to Cart
              </button>
              <Link
                to={`/productdetails/${itemData?.id}`}
                className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 cursor-pointer"
              >
                View Details
              </Link>
              <button
                onClick={() => dispatch(toggleWishList(itemData))}
                className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 cursor-pointer"
              >
                {isWishListed ? "Remove to Wishlist" : "Add to Wishlist"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCardList;

// Link to={`/productdetails/${itemData.id}`}
