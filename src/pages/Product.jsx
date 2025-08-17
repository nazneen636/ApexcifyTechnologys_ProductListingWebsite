import React, { useEffect, useState } from "react";
import ProductCard from "../components/commonComponents/ProductCard";
import CategorySidebar from "../components/ProductComponent/Category";
import {
  useGetAllProductQuery,
  useGetProductByCategoryQuery,
  useGetProductsByCategoryQuery,
  useGetSearchProductQuery,
} from "../Feature/ProductApi";
import ProductSkeleton from "../components/Skeleton/ProductSkeleton";
import { FaBars, FaHeart, FaTh } from "react-icons/fa";
import { useParams } from "react-router";
import { BsCart3 } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

const Product = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishList);

  const [showWishList, setShowWishList] = useState(false);
  const [sortBy, setSortBy] = useState("title");
  const [order, setOrder] = useState("asc");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewType, setViewType] = useState("grid");

  const searchQuery = useGetSearchProductQuery(searchTerm);
  const categoryQuery = useGetProductsByCategoryQuery(selectedCategory, {
    skip: !selectedCategory || searchTerm,
  });
  const allQuery = useGetAllProductQuery(
    { sortBy, order },
    {
      skip: searchTerm || selectedCategory,
    }
  );
  console.log(allQuery?.data?.products);
  let data = allQuery.data;
  let isLoading = allQuery.isLoading;
  let error = allQuery.error;

  if (searchTerm) {
    data = searchQuery.data;
    isLoading = searchQuery.isLoading;
    error = searchQuery.error;
  } else if (selectedCategory) {
    data = categoryQuery.data;
    isLoading = categoryQuery.isLoading;
    error = categoryQuery.error;
  } else if (showWishList) {
    data = { products: wishlist };
    isLoading = false;
  } else {
    data, isLoading;
    error;
  }

  const { data: allCategory, isLoading: isCategoryLoading } =
    useGetProductByCategoryQuery();

  // pagination state
  const [page, setPage] = useState(1);
  const [perPageShow, setPerPageShow] = useState(9);
  const totalPage = Math.ceil((data?.products?.length || 0) / perPageShow);

  const handlePageshowChange = (e) => {
    setPerPageShow(Number(e.target.value));
    setPage(1);
  };

  const handlePerItem = (index) => {
    if (index >= 1 && index <= totalPage) {
      setPage(index);
    }
  };

  useEffect(() => {
    if (page > totalPage) {
      setPage(1);
    }
  }, [data, totalPage, showWishList, selectedCategory, searchTerm]);

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-4">
        <div className="">
          <CategorySidebar
            AllCategory={allCategory}
            isLoading={isCategoryLoading}
            onCategorySelect={(cat) => setSelectedCategory(cat)}
          />
        </div>
        {/* right side */}
        <div className="col-span-3 relative">
          {isLoading ? (
            <div className="flex items-center justify-between mb-6 animate-pulse">
              {/* Title */}
              <div className="flex items-center gap-2">
                <div className="h-6 w-32 bg-gray-300 rounded"></div>
                <div className="h-5 w-10 bg-gray-300 rounded"></div>
              </div>

              {/* Right Side */}
              <div className="flex items-center gap-8">
                {/* Sort by */}
                <div className="flex items-center gap-2">
                  <div className="h-4 w-12 bg-gray-300 rounded"></div>
                  <div className="h-8 w-28 bg-gray-300 rounded"></div>
                </div>

                {/* View toggle buttons */}
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 bg-gray-300 rounded"></div>
                  <div className="w-9 h-9 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="sticky z-50 py-4 bg-white w-full flex flex-col gap-4">
              <div className="flex items-center justify-between gap-12">
                {/* Left: Title */}
                <h1 className="text-lg font-bold font-poppins">
                  Product List{" "}
                  <span className="text-gray-500">({data?.limit})</span>
                </h1>
                {/*Search */}
                <div className="flex-1 mx-6 relative w-full">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setPage(1);
                    }}
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
                    <span className="text-sm text-gray-700 font-inter">
                      Show by
                    </span>
                    <select
                      onChange={(e) => handlePageshowChange(e)}
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
                  {/* Sort by */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-700 font-inter">
                      Sort by
                    </span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="border font-inter border-gray-300 rounded px-2 py-1 text-sm focus:outline-none"
                    >
                      <option value="title">Name</option>
                      <option value="price">Price</option>
                      <option value="rating">Rating</option>
                    </select>

                    <select
                      value={order}
                      onChange={(e) => setOrder(e.target.value)}
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
                  onClick={() => {
                    setSelectedCategory(null);
                    setShowWishList(false);
                  }}
                  className="text-lg font-bold font-poppins text-green-600 cursor-pointer hover:text-green-400"
                >
                  All Product
                </h1>

                {/* Right: Show by + View toggle */}
                <div className="flex items-center gap-5">
                  <div
                    onClick={() => setShowWishList(true)}
                    className="text-2xl cursor-pointer"
                  >
                    {" "}
                    <FaHeart className="text-red-500" />
                  </div>
                  <div className="text-2xl cursor-pointer p-1 border border-gray-300 rounded hover:bg-black hover:text-white transition-all">
                    {" "}
                    <BsCart3 />
                  </div>

                  {/* View toggle */}
                  <div className="flex items-center gap-5 text-gray-500">
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
            </div>
          )}

          {/* product */}
          <div
            className={`mt-10 ${
              viewType == "grid"
                ? "grid grid-cols-3 gap-6"
                : "grid grid-cols-1 gap-y-6"
            }`}
          >
            {isLoading ? (
              [...new Array(6)].map((_) => <ProductSkeleton />)
            ) : data?.products?.length > 0 ? (
              data?.products
                ?.slice((page - 1) * perPageShow, page * perPageShow)
                .map((product) => (
                  <ProductCard
                    key={product?.id}
                    itemData={product}
                    viewType={viewType}
                  />
                ))
            ) : error ? (
              <div>Something went wrong</div>
            ) : (
              <div className="col-span-3 text-center py-10">
                <p className="text-lg font-semibold text-gray-600">
                  🔍 Search item not found
                </p>
              </div>
            )}
          </div>
          {/* pagination */}
          <div aria-label="Page navigation example" className="mt-10">
            <ul className="flex items-center -space-x-px h-10 text-base">
              <li>
                <span
                  onClick={() => handlePerItem(page - 1)}
                  href="#"
                  className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-red-100 hover:text-gray-700 "
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="w-3 h-3 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 1 1 5l4 4"
                    />
                  </svg>
                </span>
              </li>
              {[...new Array(totalPage)].map((_, index) => (
                <li key={index}>
                  <span
                    onClick={() => handlePerItem(index + 1)}
                    href="#"
                    className={
                      page == index + 1
                        ? "flex items-center justify-center px-4 h-10 leading-tight text-white bg-red-400 border border-transparent"
                        : "flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-red-100 hover:text-gray-700"
                    }
                  >
                    {index + 1}
                  </span>
                </li>
              ))}
              <li>
                <span
                  onClick={() => handlePerItem(page + 1)}
                  href="#"
                  className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-red-100 hover:text-gray-700"
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="w-3 h-3 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
