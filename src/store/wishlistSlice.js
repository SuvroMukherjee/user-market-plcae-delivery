import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { wishLists } from "../Api/api";

export const fetchWishLists = createAsyncThunk("fetchWishLists", async () => {
  try {
    const response = await wishLists();
    return response.data?.data;
  } catch (err) {
    return err.message;
  }
});

const wishlistSlice = createSlice({
  name: "wishlists",
  initialState: {
    isLoading: true,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWishLists.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchWishLists.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchWishLists.rejected, (state, action) => {
      console.log("error", action.payload);
      state.isError = true;
    });
  },
});

export const WishlistsData = (state) => state?.wishList?.data;

export default wishlistSlice;
