"use client";

import { useEffect, useState } from "react";
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
import { BsCart3 } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import ProductRight from "../components/ProductComponent/ProductRight";

const Product = () => {
  const wishlist = useSelector((state) => state.wishList);

  // state
  const [showWishList, setShowWishList] = useState(false);
  const [sortBy, setSortBy] = useState("title");
  const [order, setOrder] = useState("asc");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewType, setViewType] = useState(() => {
    return localStorage.getItem("viewType") || "grid";
  });

  // Save view type to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("viewType", viewType);
  }, [viewType]);

  const searchQuery = useGetSearchProductQuery(searchTerm);
  const categoryQuery = useGetProductsByCategoryQuery(selectedCategory, {
    skip: !selectedCategory || searchTerm || showWishList,
  });
  const allQuery = useGetAllProductQuery(
    { sortBy, order },
    {
      skip: searchTerm || selectedCategory,
    }
  );

  let data = allQuery.data;
  let isLoading = allQuery.isLoading;
  let error = allQuery.error;

  if (showWishList) {
    data = { products: wishlist };
    isLoading = false;
  } else if (searchTerm) {
    data = searchQuery.data;
    isLoading = searchQuery.isLoading;
    error = searchQuery.error;
  } else if (selectedCategory) {
    data = categoryQuery.data;
    isLoading = categoryQuery.isLoading;
    error = categoryQuery.error;
  } else {
    data, isLoading;
    error;
  }

  const { data: allCategory, isLoading: isCategoryLoading } =
    useGetProductByCategoryQuery();

  // pagination state and function
  const [page, setPage] = useState(1);
  const [perPageShow, setPerPageShow] = useState(8);
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

  // handle category function
  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    setShowWishList(false); // Exit wishlist mode when selecting a category
    setSearchTerm(""); // Clear search term as well
    setPage(1); // Reset to first page
  };

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-5 relative">
        {/* category part in left */}
        <div className="">
          <CategorySidebar
            AllCategory={allCategory}
            isLoading={isCategoryLoading}
            onCategorySelect={handleCategorySelect}
          />
        </div>
        {/* right side */}
        <div className="col-span-4 relative">
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
            <div className="sticky top-0 z-50 border-b border-gray-200">
              <ProductRight
                totalProduct={data?.products?.length || 0}
                searchTerm={searchTerm}
                handleChangeSearch={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(1);
                  setShowWishList(false);
                  setSelectedCategory(null);
                }}
                sortBy={sortBy}
                handleSortBy={(e) => setSortBy(e.target.value)}
                order={order}
                handleChangeOrder={(e) => setOrder(e.target.value)}
                handleAllproduct={() => {
                  setSelectedCategory(null);
                  setShowWishList(false);
                  setSearchTerm("");
                }}
                handleWishList={() => {
                  setShowWishList(true);
                  setSelectedCategory(null);
                  setSearchTerm("");
                }}
                handleGrid={() => setViewType("grid")}
                handleList={() => setViewType("list")}
                handlePageShow={(e) => handlePageshowChange(e)}
              />
            </div>
          )}

          {/* product */}
          <div
            className={`mt-10 ${
              viewType == "grid"
                ? "grid grid-cols-4 gap-6"
                : "grid grid-cols-1 gap-y-6"
            }`}
          >
            {isLoading ? (
              [...new Array(6)].map((_, index) => (
                <ProductSkeleton key={index} />
              ))
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
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
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
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
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
