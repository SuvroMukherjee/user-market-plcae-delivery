import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'
import { getHomeAPI, getUserAddress, wishLists } from "../Api/api"
import { useSelector, useDispatch } from 'react-redux'

export const fetchAddress = createAsyncThunk('fetchAddress', async () => {
    let { userdata } = JSON.parse(localStorage.getItem('persist:auth'));
    let userId = JSON.parse(userdata);
    // console.log({ userId })
    try {
        const response = await getUserAddress(userId?._id);
        return response.data?.data
    } catch (err) {
        return err.message
    }
})



const addressSlice = createSlice({
    name: 'address',
    initialState: {
        isLoading: false,
        data: null,
        deliveyAddress : null,
        isError: false
    },
    reducers: {
        updateDeliveryAddress: (state, action) => {
            state.deliveyAddress = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAddress.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(fetchAddress.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload
            state.deliveyAddress = action.payload?.[0]
        })
        builder.addCase(fetchAddress.rejected, (state, action) => {
            console.log('error', action.payload)
            state.isError = true;
        })
    }
})



export default addressSlice;