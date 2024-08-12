import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getHomeAPI, wishLists } from "../Api/api";

export const fetchProducts = createAsyncThunk(
  "fetchProducts",
  async (pincode) => {
    try {
      const response = await getHomeAPI(pincode);
      return response.data?.data;
    } catch (err) {
      return err.message;
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    isLoading: true,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      console.log("error", action.payload);
      state.isError = true;
    });
  },
});

export default productsSlice;
