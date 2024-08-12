import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ViewBuyList, ViewcartList } from "../Api/api";

export const fetchBuyLists = createAsyncThunk("fetchBuyLists", async () => {
  try {
    const response = await ViewBuyList();
    return response.data?.data;
  } catch (err) {
    return err.message;
  }
});

const buyNowSlice = createSlice({
  name: "wishlists",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
    tempBuyData: localStorage.getItem("tempBuyitem")
      ? JSON.parse(localStorage.getItem("tempBuyitem"))
      : null,
  },
  reducers: {
    tempAddItemToBuy: (state, action) => {
      console.log(action.payload);
      state.tempBuyData = action?.payload;
    },
    removeAllBuyitems : (state,action) =>{
      state.tempBuyData=null;
      localStorage.removeItem("tempBuyitem");
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBuyLists.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBuyLists.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchBuyLists.rejected, (state, action) => {
      console.log("error", action.payload);
      state.isError = true;
    });
  },
});

export const allBuyNowItems = (state) => state?.buyItem?.data;
export const tempBuyItems = (state) => state?.buyItem?.tempBuyData;

export const alreadyInCart = (cartItems, id) => {
  if (!cartItems || cartItems.length === 0) {
    return false; // Cart is empty or doesn't exist
  }

  // Check if any item in the cart has the same ID
  return cartItems.some((item) => item.proId?._id === id);
};

export const InTempCart = (cartItems, id) => {
  if (!cartItems || cartItems.length === 0) {
    return false; // Cart is empty or doesn't exist
  }

  // Check if any item in the cart has the same ID
  return cartItems.some((item) => item.proId?._id === id);
};

export default buyNowSlice;

export const { tempAddItemToBuy, removeAllBuyitems } = buyNowSlice.actions;
