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
  const [viewType, setViewType] = useState("grid");
  const { data, error, isLoading } = useGetAllProductQuery();
  const {
    data: allCategory,
    error: errorCategory,
    isLoading: isCategoryLoading,
  } = useGetProductByCategoryQuery();

  // pagination state
  const [page, setPage] = useState(1);
  const [perPageShow, setPerPageShow] = useState(9);
  const totalPage = Math.ceil((data?.products?.length || 0) / perPageShow);
  console.log(totalPage);

  const handlePageshowChange = (e) => {
    setPerPageShow(Number(e.target.value));
    setPage(1);
  };

  const handlePerItem = (index) => {
    if (index > 0 && index <= totalPage) {
      setPage(index);
    }
  };
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-4">
        <div className="">
          <CategorySidebar
            AllCategory={allCategory}
            isLoading={isCategoryLoading}
          />
        </div>
        {/* right side */}
        <div className="col-span-3">
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
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-lg font-bold font-poppins">
                Product List{" "}
                <span className="text-green-600">({data?.limit})</span>
              </h1>

              <div className="flex items-center gap-8">
                {/* Sort by */}
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
                {/* <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-700 font-inter">
                    Sort by
                  </span>
                  <select className="border font-inter border-gray-300 rounded px-2 py-1 text-sm focus:outline-none">
                    <option>Low to High</option>
                    <option>High to Low</option>
                    <option>Newest</option>
                    <option>Best Rating</option>
                  </select>
                </div> */}

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
          )}

          {/* product */}
          <div
            className={`${
              viewType == "grid" ? "grid grid-cols-3 gap-6" : "grid gap-y-6"
            }`}
          >
            {isLoading
              ? [...new Array(6)].map((_) => <ProductSkeleton />)
              : data?.products
                  ?.slice((page - 1) * perPageShow, page * perPageShow)
                  .map((product) => (
                    <ProductCard
                      key={product?.id}
                      itemData={product}
                      viewType={viewType}
                    />
                  ))}
          </div>
          {/* pagination */}
          <div aria-label="Page navigation example" className="mt-10">
            <ul class="flex items-center -space-x-px h-10 text-base">
              <li>
                <span
                  onClick={() => handlePerItem(page - 1)}
                  href="#"
                  class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-red-100 hover:text-gray-700 "
                >
                  <span class="sr-only">Previous</span>
                  <svg
                    class="w-3 h-3 rtl:rotate-180"
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
                <li>
                  <span
                    onClick={() => handlePerItem(index)}
                    href="#"
                    class={
                      page == index
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
                  class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-red-100 hover:text-gray-700"
                >
                  <span class="sr-only">Next</span>
                  <svg
                    class="w-3 h-3 rtl:rotate-180"
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
