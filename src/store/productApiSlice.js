import { apiSlice } from "./apiSlice";

const apiUrl = import.meta.env.VITE_API_BASE;

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: ({ page = 1, limit = 100, categoryId, brandId }) => {
        const queryParams = new URLSearchParams({
          page,
          limit,
          ...(categoryId && { categoryId }),
          ...(brandId && { brandId }),
        }).toString();

        return {
          url: `${apiUrl}/seller-product/all-list?${queryParams}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetAllProductsQuery } = productApiSlice;
