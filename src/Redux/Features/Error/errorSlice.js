import { createSlice } from '@reduxjs/toolkit';

const errorSlice = createSlice({
  name: 'error',
  initialState: {
    showErrorModal: false,
    errorMessage: ''
  },
  
  reducers: {
    showError(state, action) {
      // console.log(action.payload);
      state.showErrorModal = true;
      state.errorMessage = action.payload;
    },
    hideError(state) {
      state.showErrorModal = false;
      state.errorMessage = '';
    }
  }
});
// console.log('errorSlice');

export const { showError, hideError } = errorSlice.actions;
export default errorSlice.reducer;