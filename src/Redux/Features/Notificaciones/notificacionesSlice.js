import axios from "axios";
import store from "../../Store/store";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setLoading } from "../Loading/loadingSlice";
import { URL_API } from "../constantes";
import { showError } from "../Error/errorSlice";
const URL = URL_API


const initialState = {
  notificaciones: [],
  loading: false,
  error: {
    showError: false,
    errorData: null
  },
}

export const obtenerNotificaciones = createAsyncThunk(
  "notificaciones/obtenerNotificaciones",
  async ({ id, token }) => {
    try {
      const resp = await axios({
        method: 'get',
        url: `${URL}/notificaciones/${id}`,
        headers: { "Authorization": "Bearer " + token }
      });
      return resp.data;
    } catch (error) {
      if (error.response) {
        const errorData = {
          status: error.response.status,
          data: error.response.data
        };
        return errorData
      }
      throw new Error(error.response?.data?.message || "Error desconocido al obtener las notificaciones");
    }
  }
);

const notificacionesSlice = createSlice({
  name: "notificaciones",
  initialState,
  reducers: {
    resetErrorNotificaciones: (state) => {
      state.error.showError = false
      state.error.errorData = null
    }
  },
  extraReducers: (constructor) => {
    constructor
      .addCase(obtenerNotificaciones.fulfilled, (state, actions) => {
        state.notificaciones = actions.payload
        state.loading = false
      })
      .addCase(obtenerNotificaciones.rejected, (state, actions) => {
        state.notificaciones = [];
        state.error.errorData = actions.payload;
        state.error.showError = true;
        state.loading = false
      })
      .addCase(obtenerNotificaciones.pending, (state) => {
        state.loading = true;
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
export const { setNotificacion, resetErrorNotificaciones } = notificacionesSlice.actions;
export default notificacionesSlice.reducer
