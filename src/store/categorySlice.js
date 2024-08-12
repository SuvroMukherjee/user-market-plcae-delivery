import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllCategories } from "../Api/api";

export const fetchCategory = createAsyncThunk(
  "fetchCategory",
  async () => {
    try {
      const response = await getAllCategories();
      return response.data?.data;
    } catch (err) {
      return err.message;
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    isLoading: true,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategory.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchCategory.rejected, (state, action) => {
      console.log("error", action.payload);
      state.isError = true;
    });
  },
});

export default categorySlice;
