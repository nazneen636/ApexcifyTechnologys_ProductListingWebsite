import React from "react";
import { BsCart3 } from "react-icons/bs";
import { FaBars, FaHeart, FaTh } from "react-icons/fa";
import { HiMiniShoppingCart } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { Link } from "react-router";

const ProductRight = ({
  totalProduct,
  searchTerm,
  handleChangeSearch,
  sortBy,
  handleSortBy,
  order,
  handleChangeOrder,
  handleAllproduct,
  handleWishList,
  handleGrid,
  handleList,
  handlePageShow,
}) => {
  const cart = useSelector((state) => state.cart);
  const totalCartItems = cart.length;

  console.log(totalCartItems);

  return (
    <div>
      <div className=" py-4 bg-white w-full flex flex-col gap-4">
        <div className="flex items-center justify-between gap-12">
          {/* Left: Title */}
          <h1 className="text-2xl font-bold ">
            Product List <span className="text-gray-500">({totalProduct})</span>
          </h1>
          {/*Search */}
          <div className="flex-1 mx-6 relative w-full">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleChangeSearch}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-green-200"
            />
            {/* Search Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
              />
            </svg>
          </div>
          {/* Right: Show by + View toggle */}
          <div className="flex items-center gap-4">
            {/* Show by */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700 font-inter">Show by</span>
              <select
                onChange={handlePageShow}
                className="border font-inter border-gray-300 rounded px-2 py-1 text-sm focus:outline-none"
              >
                <option value={9}>9</option>
                <option value={12}>12</option>
                <option value={15}>15</option>
                <option value={18}>18</option>
                <option value={24}>24</option>
                <option value={30}>30</option>
              </select>
            </div>

            {/* Sort by */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700 font-inter">Sort by</span>
              <select
                value={sortBy}
                onChange={handleSortBy}
                className="border font-inter border-gray-300 rounded px-2 py-1 text-sm focus:outline-none"
              >
                <option value="title">Name</option>
                <option value="price">Price</option>
                <option value="rating">Rating</option>
              </select>

              <select
                value={order}
                onChange={handleChangeOrder}
                className="border font-inter border-gray-300 rounded px-2 py-1 text-sm focus:outline-none"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between mt-1">
          {/* Left: Title */}
          <h1
            onClick={handleAllproduct}
            className="text-lg font-bold font-poppins text-green-600 cursor-pointer hover:text-green-400"
          >
            All Product
          </h1>

          {/* Right: Show by + View toggle */}
          <div className="flex items-center gap-8">
            <div onClick={handleWishList} className="text-2xl cursor-pointer">
              {" "}
              <FaHeart className="text-red-500" />
            </div>
            <Link
              to="/addtocart"
              className="relative text-2xl cursor-pointer  hover:text-gray-700 transition-all"
            >
              {" "}
              <HiMiniShoppingCart />
              {totalCartItems > 0 && (
                <span className="absolute top-[45%] -right-3 w-6 h-6 rounded-full flex items-center justify-center bg-red-500 text-white text-sm font-semibold">
                  {totalCartItems}
                </span>
              )}
            </Link>

            {/* View toggle */}
            <div className="flex items-center gap-5 text-gray-500">
              <button
                onClick={handleGrid}
                className="p-2 border border-gray-300 rounded hover:bg-black hover:text-white transition-all"
              >
                <FaTh />
              </button>
              <button
                onClick={handleList}
                className="p-2 border border-gray-300 rounded hover:bg-black hover:text-white transition-all"
              >
                <FaBars />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductRight;
