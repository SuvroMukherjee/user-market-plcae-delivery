import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AllBrands } from "../Api/api";

export const fetchBrands = createAsyncThunk("fetchBrands", async () => {
  try {
    const response = await AllBrands();
    return response.data?.data;
  } catch (err) {
    return err.message;
  }
});

const brandSlice = createSlice({
  name: "brands",
  initialState: {
    isLoading: true,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBrands.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBrands.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchBrands.rejected, (state, action) => {
      console.log("error", action.payload);
      state.isError = true;
    });
  },
});

export default brandSlice;
