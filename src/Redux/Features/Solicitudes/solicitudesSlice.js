import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import store from "../../Store/store";
import axios from "axios";
import { URL_API } from "../constantes";

const initialState = {
  solicitudes: [],
  tipoSolicitudes: [],
  loading: false,
  error: null,
  respuesta: ''
};


const solicitudesSlice = createSlice({
  name: "solicitudes",
  initialState,
  reducers: {
    setSolicitudes: (state, action) => {
      state.solicitudes = action.payload;
    },
  },
  extraReducers: (constructor) => {
    constructor
      // Crear tipo de solicitud
      .addCase(crearTipoSolicitud.pending, (state, action) => {
        state.loading = true
      })
      .addCase(crearTipoSolicitud.fulfilled, (state, action) => {
        state.loading = false;
        state.respuesta = 'Tipo de solicitud creado correctamente';
      })
      .addCase(crearTipoSolicitud.rejected, (state, action) => {
        state.loading = false;
        console.log(action.payload)
        console.log("Error al crear el tipo de solicitud");
        state.respuesta = 'Error al crear el tipo de solicitud';
        state.error = action.payload;
      })
      // Obtener tipos de solicitudes
      .addCase(getTipoSolicitudes.pending, (state, action) => {
        state.loading = true
      })
      .addCase(getTipoSolicitudes.fulfilled, (state, action) => {
        state.loading = false;
        state.tipoSolicitudes = action.payload;
      })
      .addCase(getTipoSolicitudes.rejected, (state, action) => {
        state.loading = false;
        console.log("Error al obtener los tipos de solicitudes");
        state.respuesta = 'Error al obtener los tipos de solicitudes';
        state.error = action.payload;
      })
      // crear solicitudes      
  }

});

// Obtener solicitudes
export const getTipoSolicitudes = createAsyncThunk(
  "solicitudes/getSolicitudes",
  async () => {
    try {
      const response = await axios({
        method: 'GET',
        url: `${URL_API}/licencias/traerTipoSolicitud`,
        headers: { "Authorization": "Bearer " + store.getState().user.token }
      });
      // console.log(response.data);
      return response.data.data;
    } catch (error) {
      console.log(error);
      return error
    }
  }
);

// Crear solicitud
export const createSolicitud = createAsyncThunk(
  "solicitudes/createSolicitud",
  async (solicitud) => {
    try {
      const response = await axios({
        method: 'POST',
        url: `${URL_API}/licencias/crearSolicitud`,
        data: solicitud,
        headers: { "Authorization": "Bearer " + store.getState().user.token }
      })
      console.log(response.data);
      return response.data;
    } catch (error) {
      return error
    }
  }
);

// Crear tipos de solicitud
export const crearTipoSolicitud = createAsyncThunk(
  "solicitudes/crearTipoSolicitud",
  async (tipoSolicitud) => {
    try {
      // console.log(tipoSolicitud);
      const response = await axios({
        method: "POST",
        url: `${URL_API}/licencias/crearTipoSolicitud`,
        data: tipoSolicitud,
        headers: { "Authorization": "Bearer " + store.getState().user.token },
      });
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return error
    }
  }
);

export const { setSolicitudes } = solicitudesSlice.actions;

export default solicitudesSlice.reducer;
