import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { ViewcartList, getCustomerDetails, wishLists } from "../Api/api"


export const fetchCustomerData = createAsyncThunk('fetchCustomerData', async () => {
    try {
        const response = await getCustomerDetails()
        // console.log(response?.data?.data)
        if (response?.data?.data){
            localStorage.setItem('user_pincode', response?.data?.data?.pin_code)
        }
        return response.data?.data
    } catch (err) {
        return err.message
    }
})

const customerInfoSlice = createSlice({
    name: 'customerInfo',
    initialState: {
        isLoading: false,
        data: null,
        isError: false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCustomerData.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(fetchCustomerData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload
        })
        builder.addCase(fetchCustomerData.rejected, (state, action) => {
            // console.log('error', action.payload)
            state.isError = true;
        })
    }
})

export const userInformation = (state) => state?.customerInfo?.data;

export default customerInfoSlice;