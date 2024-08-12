

import { apiSlice } from "./apiSlice";

const apiUrl = import.meta.env.VITE_API_BASE;

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: ({page = 1, limit = 100}) => ({
        url: `${apiUrl}/seller-product/all-list?page=${page}&limit=${limit}`,
        method: "GET",
      }),
    }),
  }),
});


export const { useGetAllProductsQuery } = productApiSlice;
