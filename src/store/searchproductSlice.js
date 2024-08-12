import { createSlice } from "@reduxjs/toolkit"

const searchproductSlice = createSlice({
    name: "searchproduct",
    initialState:
    {
        productData: []
    }
    ,
    reducers: {
        addSearchProduct(state, action) {
            state.productData = action.payload
        },
        clearSearchproduct(state,action){
            state.productData = []
        }
    },
})

export const searchProudct = searchproductSlice.actions
export default searchproductSlice;
