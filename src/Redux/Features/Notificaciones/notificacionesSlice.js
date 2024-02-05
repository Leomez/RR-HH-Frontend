import axios from "axios";
import store from "../../Store/store";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setLoading } from "../Loading/loadingSlice";
import { URL_API } from "../constantes";
const URL = URL_API


const initialState = {
  notificaciones: [],
  error: null,
}

export const obtenerNotificaciones = createAsyncThunk(
  "notificaciones/obtenerNotificaciones",
  async ({id, token}) => {
    try {
      store.dispatch(setLoading(true));
      const resp = await axios({
        method: 'get',
        url: `${URL}/notificaciones/${id}`,
        headers: {"Authorization": "Bearer " + token}
      });
      store.dispatch(setLoading(false));
      return resp.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message ||
          "Error desconocido al obtener las notificaciones"
      );
    }
  }
);

const notificacionesSlice = createSlice({
  name: "notificaciones",
  initialState,
  reducers: {},
  extraReducers: (constructor) => {
    constructor
    .addCase(obtenerNotificaciones.fulfilled, (state, actions) => {
      state.notificaciones = actions.payload
    })
    .addCase(obtenerNotificaciones.rejected, (state, actions) => {
      state.notificaciones = [];
      state.error = actions.payload
    })
    .addCase(obtenerNotificaciones.pending, (state) => {
      state.isLoading = true;
    })
  } 
  // {
  //   [obtenerNotificaciones.pending]: (state) => {
  //     state.isLoading = true;
  //   },
  //   [obtenerNotificaciones.fulfilled]: (state, action) => {
  //     state.isLoading = false;
  //     state.notificaciones = action.payload;
  //   },
  //   [obtenerNotificaciones.rejected]: (state, action) => {
  //     state.isLoading = false;
  //     state.error = action.payload;
  //   },
  // },
});
export const { setNotificacion } = notificacionesSlice.actions;
export default notificacionesSlice.reducer
