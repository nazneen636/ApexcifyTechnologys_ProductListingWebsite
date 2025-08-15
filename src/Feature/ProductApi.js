import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const productApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
  endpoints: (build) => ({
    GetAllProduct: build.query({
      query: () => `/products`,
    }),
    GetProductByCategory: build.query({
      query: () => `/products/category-list`,
    }),
    GetSingleProduct: build.query({
      query: (id) => `products/${id}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllProductQuery,
  useGetProductByCategoryQuery,
  useGetSingleProductQuery,
} = productApi;
