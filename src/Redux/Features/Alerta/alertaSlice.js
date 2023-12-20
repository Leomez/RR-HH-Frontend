import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
  name: "alerta",
  initialState: { open: false, type: "success", message: "" },
  reducers: {
    showAlert: (state, action) => {
      state.open = true;
      state.type = action.payload.type;
      state.message = action.payload.message;
    },
    hideAlert: (state) => {
      state.open = false;
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;
export const selectAlert = (state) => state.alerta;

export default alertSlice.reducer;
