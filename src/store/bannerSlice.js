import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'
import { getAllBanners, getHomeAPI, wishLists } from "../Api/api"

export const fetchBanners = createAsyncThunk('fetchBanners', async (pincode) => {
    try {
        const response = await getHomeAPI(pincode);
        return response.data?.data?.bannerData;
    } catch (err) {
        return err.message
    }
})



const bannerSlice = createSlice({
    name: 'banners',
    initialState: {
        isLoading: false,
        data: null,
        isError: false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBanners.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(fetchBanners.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload
        })
        builder.addCase(fetchBanners.rejected, (state, action) => {
            console.log('error', action.payload)
            state.isError = true;
        })
    }
})
export const bannerListdata = (state) => state?.banners?.data;
export default bannerSlice;