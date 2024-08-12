import { createSlice } from "@reduxjs/toolkit"

const recentViewSlice = createSlice({
    name: "auth",
    initialState:
    {
        productData: []
    }
    ,
    reducers: {
        addToRecent(state, action) {
           
            const newProduct = action.payload;

            // Check if the product with the same id already exists in the state
            const existingProductIndex = state.productData.findIndex(
                (product) => product?.SellerProductData?._id === newProduct?.SellerProductData?._id
                );
                
            console.log(existingProductIndex,'existingProductIndex')

            // If the product with the same id exists, replace it; otherwise, add it to the beginning of the array
            if (existingProductIndex !== -1) {
               // state.productData[existingProductIndex] = newProduct;
            } else {
                state.productData.unshift(newProduct);
            }
        },
    },
})

export const recentProducts = recentViewSlice.actions
export const recentProductData = (state) => state?.recentView?.productData;
export default recentViewSlice;
