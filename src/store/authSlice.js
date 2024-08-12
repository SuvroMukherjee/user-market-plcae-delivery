import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggIn: false, userdata: {} },
  reducers: {
    login(state, action) {
      state.isLoggIn = true;
      state.userdata = action?.payload;
    },
    update(state, action) {
      state.userdata = action?.payload;
    },
    logout(state) {
      state.isLoggIn = false;
      state.userdata = {};
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
