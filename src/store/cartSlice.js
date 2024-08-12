import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ViewcartList } from "../Api/api";

export const fetchCartLists = createAsyncThunk("fetchCartLists", async () => {
  try {
    const response = await ViewcartList();
    return response.data?.data;
  } catch (err) {
    return err.message;
  }
});

const cartSlice = createSlice({
  name: "wishlists",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
    tempData: localStorage.getItem("tempCart")
      ? JSON.parse(localStorage.getItem("tempCart"))
      : {
          products: [],
          totalQuantity: 0,
          total_shipping_price: 0,
          totalPrice: 0,
          overallTotal: 0,
        },
  },
  reducers: {
    tempAddItemToCart: (state, action) => {
      const newProducts = [...state.tempData.products, action.payload];
      const totalQuantity =
        state.tempData.totalQuantity + action.payload.quantity;
      const total_shipping_price =
        state.tempData.total_shipping_price +
        action.payload.proId.shipping_cost;
      const totalPrice = state.tempData.totalPrice + action.payload.totalPrice;
      const overallTotal =
        state.tempData.overallTotal +
        action.payload.totalPrice +
        action.payload.proId.shipping_cost;

      const newTempDataState = {
        products: [...newProducts],
        totalQuantity,
        total_shipping_price,
        totalPrice,
        overallTotal,
      };

      state.tempData = newTempDataState;
      localStorage.setItem("tempCart", JSON.stringify(newTempDataState));
    },
    tempRemoveItemFromCart: (state, action) => {
      const productToRemove = state.tempData.products.find(
        (item) => item.proId._id === action.payload.proId
      );

      if (!productToRemove) {
        return;
      }

      const newProducts = state.tempData.products.filter(
        (item) => item.proId._id !== action.payload.proId
      );

      const totalQuantity =
        state.tempData.totalQuantity - productToRemove.quantity;
      const total_shipping_price =
        state.tempData.total_shipping_price -
        productToRemove.proId.shipping_cost;
      const totalPrice = state.tempData.totalPrice - productToRemove.totalPrice;
      const overallTotal =
        state.tempData.overallTotal -
        productToRemove.totalPrice -
        productToRemove.proId.shipping_cost;
      const newTempDataState = {
        products: [...newProducts],
        totalQuantity,
        total_shipping_price,
        totalPrice,
        overallTotal,
      };

      state.tempData = newTempDataState;
      localStorage.setItem("tempCart", JSON.stringify(newTempDataState));
    },
    tempRemoveAllItemsFromCart: (state) => {
      state.tempData = {
        products: [],
        totalQuantity: 0,
        total_shipping_price: 0,
        totalPrice: 0,
        overallTotal: 0,
      };
      localStorage.removeItem("tempCart");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCartLists.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCartLists.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchCartLists.rejected, (state, action) => {
      console.log("error", action.payload);
      state.isError = true;
    });
  },
});

export const allCartItems = (state) => state?.cart?.data;
export const tempCartItems = (state) => state?.cart?.tempData;

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

export default cartSlice;

export const {
  tempAddItemToCart,
  tempRemoveItemFromCart,
  tempRemoveAllItemsFromCart,
} = cartSlice.actions;
