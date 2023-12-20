import { createSlice } from "@reduxjs/toolkit";

export const setFirmaRecibo = createSlice({
    name: "firma",
    initialState: null,
    reducers: {
      setFirma: (state, action) => {
        // Almacena la firma en el estado global
        return action.payload;
      },
      // eslint-disable-next-line no-unused-vars
      clearFirma: (state) => {
        // Limpia la firma del estado global
        return null;
      },
    },
  });
  
  export const { setFirma, clearFirma } = setFirmaRecibo.actions;
  
  export default setFirmaRecibo.reducer;
  