// features/cart/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalQuantity: 0,
  totalPrice: 0,
  total_shipping_price: 0,
  overallTotal: 0,
  products: [],
};

const temporarycart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    tempAddItem: (state, action) => {
      const newItem = action.payload;

      console.log(newItem, "newItem");

      state.products.push({
        ...newItem,
        totalPrice: newItem?.prodPrice * newItem?.quantity,
        total_shipping_price: newItem?.shippingPrice * newItem?.quantity,
      });

      state.totalQuantity += newItem?.quantity;
      state.totalPrice += newItem?.prodPrice * newItem?.quantity;
      // state.total_shipping_price += newItem.shippingPrice * newItem.quantity;
      // state.overallTotal = state.totalPrice + state.total_shipping_price;
    },
    tempRemoveItem: (state, action) => {
      const id = action.payload?._id;
      const itemIndex = state.products.findIndex(
        (item) => item?.proId?._id === action.payload
      );

      console.log({ itemIndex });

      if (itemIndex !== -1) {
        const item = state?.products[itemIndex];
        state.totalQuantity -= item?.quantity;
        state.totalPrice -= item?.totalPrice;
        state.total_shipping_price -= item?.total_shipping_price;

        state.products.splice(itemIndex, 1);
        state.overallTotal = state?.totalPrice + state?.total_shipping_price;
      }
    },
    tempCartClear: (state, action) => {
      state.totalQuantity = 0;
      state.totalPrice = 0;
      state.total_shipping_price = 0;
      state.overallTotal = 0;
      state.products = [];
    },
  },
});

export const alreadyInTempCart = (TempCartItems, id) => {
  if (!TempCartItems || TempCartItems.length === 0) return false;

  return TempCartItems.some((item) => item.proId?._id === id);
};

export const { tempAddItem, tempRemoveItem, tempCartClear } =
  temporarycart.actions;
export default temporarycart.reducer;
