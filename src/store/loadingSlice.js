import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    loadingState: false,
    message: "",
  },

  reducers: {
    setLoading: (state, action) => {
      state.loadingState = action.payload.state;
      state.message = action.payload.message;
    },
  },
});

export const { setLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
