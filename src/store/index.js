import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "./authSlice";
import cartSlice from "./cartSlice";
import productsSlice from "./productsSlice";
import wishlistSlice from "./wishlistSlice";
import bannerSlice from "./bannerSlice";
import locationSlice from "./locationSlice";
import customerInfoSlice from "./customerInfoSlice";
import recentViewSlice from "./recentViewSlice";
import addressSlice from "./addressSlice";
import searchproductSlice from "./searchproductSlice";
import loadingSlice from "./loadingSlice";
import temporarycart from "./temporarycartSlice";
import buyNowSlice from "./buyNowSlice";
import { apiSlice } from "./apiSlice";
import categorySlice from "./categorySlice";
import brandSlice from "./brandSlice";


// Configuring persist options for the auth slice
const authPersistConfig = {
  key: "auth",
  storage,
};
const persistedAuthReducer = persistReducer(
  authPersistConfig,
  authSlice.reducer
);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    products: productsSlice.reducer,
    wishList: wishlistSlice.reducer,
    cart: cartSlice?.reducer,
    buyItem: buyNowSlice?.reducer,
    banners: bannerSlice?.reducer,
    locationModal: locationSlice?.reducer,
    customerInfo: customerInfoSlice?.reducer,
    recentView: recentViewSlice?.reducer,
    address: addressSlice?.reducer,
    searchproduct: searchproductSlice?.reducer,
    loading: loadingSlice,
    tempCart: temporarycart,
    category: categorySlice?.reducer,
    brands: brandSlice?.reducer,
    // Add the apiSlice reducer here
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // Add the RTK Query middleware
});

export const persistor = persistStore(store);
