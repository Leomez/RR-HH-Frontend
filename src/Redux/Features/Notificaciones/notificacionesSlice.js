import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { URL_API } from "../constantes";

const URL = URL_API;

const initialState = {
  notificaciones: [],
  loading: false,
  error: {
    showError: false,
    errorData: null
  },
};

export const obtenerNotificaciones = createAsyncThunk(
  "notificaciones/obtenerNotificaciones",
  async ({ id, token }) => {
    try {
      const resp = await axios({
        method: 'get',
        url: `${URL}/notificaciones/${id}`,
        headers: { "Authorization": "Bearer " + token }
      });
      // console.log(Array.isArray(resp.data.data) ? 'si, es array' : typeof(resp.data.data));
      return resp.data.data;
    } catch (error) {
      if (error.response) {
        const errorData = {
          status: error.response.status,
          data: error.response.data
        };
        throw new Error(JSON.stringify(errorData));
      }
      throw new Error(error.response?.data?.message || "Error desconocido al obtener las notificaciones");
    }
  }
);

export const deleteNotificacion = createAsyncThunk(
  "notificaciones/deleteNotificacion",
  async ({ id, token }) => {
    try {
      const resp = await axios({
        method: 'delete',
        url: `${URL}/notificaciones/${id}`,
        headers: { "Authorization": "Bearer " + token }
      });
      return { id, ...resp.data.data };
    } catch (error) {
      if (error.response) {
        const errorData = {
          status: error.response.status,
          data: error.response.data
        };
        throw new Error(JSON.stringify(errorData));
      }
      throw new Error(error.response?.data?.message || "Error desconocido al eliminar la notificacion");
    }
  }
);

export const updateNotificacion = createAsyncThunk(
  "notificaciones/updateNotificacion",
  async ({ id, token }) => {
    try {
      const resp = await axios({
        method: 'put',
        url: `${URL}/notificaciones/${id}`,
        headers: { "Authorization": "Bearer " + token }
      });
      return resp.data.data;
    } catch (error) {
      if (error.response) {
        const errorData = {
          status: error.response.status,
          data: error.response.data
        };
        throw new Error(JSON.stringify(errorData));
      }
      throw new Error(error.response?.data?.message || "Error desconocido al actualizar la notificacion");
    }
  }
);

const notificacionesSlice = createSlice({
  name: "notificaciones",
  initialState,
  reducers: {
    resetErrorNotificaciones: (state) => {
      state.error.showError = false;
      state.error.errorData = null;
    }
  },
  extraReducers: (constructor) => {
    constructor
      .addCase(obtenerNotificaciones.fulfilled, (state, action) => {
        state.notificaciones = Array.isArray(action.payload) ? action.payload : [];
        state.loading = false;
      })
      .addCase(obtenerNotificaciones.rejected, (state, action) => {
        state.notificaciones = [];
        state.error.errorData = JSON.parse(action.error.message);
        state.error.showError = true;
        state.loading = false;
      })
      .addCase(obtenerNotificaciones.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteNotificacion.fulfilled, (state, action) => {
        state.notificaciones = state.notificaciones.filter(notificacion => notificacion.id !== action.payload.id);
        state.loading = false;
      })
      .addCase(deleteNotificacion.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteNotificacion.rejected, (state, action) => {
        state.error.showError = true;
        state.error.errorData = JSON.parse(action.error.message);
        state.loading = false;
      })
      .addCase(updateNotificacion.fulfilled, (state, action) => {
        state.notificaciones = state.notificaciones.map(notificacion => notificacion.id === action.payload.id ? action.payload : notificacion);
        state.loading = false;
      })
      .addCase(updateNotificacion.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateNotificacion.rejected, (state, action) => {
        state.error.showError = true;
        state.error.errorData = JSON.parse(action.error.message);
        state.loading = false;
      });
  }
});

export const { resetErrorNotificaciones } = notificacionesSlice.actions;
export default notificacionesSlice.reducer;

