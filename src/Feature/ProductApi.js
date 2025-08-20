import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
  endpoints: (build) => ({
    GetAllProduct: build.query({
      query: ({ sortBy = "title", order = "asc" } = {}) => {
        let query = `/products`;
        if (sortBy && order) {
          query += `?sortBy=${sortBy}&order=${order}`;
        }
        return query;
      },
    }),
    GetProductByCategory: build.query({
      query: () => `/products/category-list`,
    }),
    GetProductsByCategory: build.query({
      query: (category) => `/products/category/${category}`,
    }),
    GetSingleProduct: build.query({
      query: (id) => `products/${id}`,
    }),
    GetSearchProduct: build.query({
      query: (searchItem) => `products/search?q=${searchItem}`,
    }),
    GetSingleCategory: build.query({
      query: (categoryName) => `products/category/${categoryName}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllProductQuery,
  useGetProductByCategoryQuery,
  useGetSingleProductQuery,
  useGetProductsByCategoryQuery,
  useGetSearchProductQuery,
  useGetSingleCategoryQuery,
} = productApi;
