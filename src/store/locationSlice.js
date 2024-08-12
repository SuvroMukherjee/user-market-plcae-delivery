import { createSlice } from "@reduxjs/toolkit"

const locationSlice = createSlice({
    name: "auth",
    initialState:
    {
        showModal: false,
    }
    ,
    reducers: {
        openModal(state, action) {
            state.showModal = true;
        },
        closeModal(state) {
            state.showModal = false
        },
    },
})

export const locationActions = locationSlice.actions
export default locationSlice
