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
        state.respuesta = 'Tipos de solicitudes obtenidos correctamente';        
      })
      .addCase(getTipoSolicitudes.rejected, (state, action) => {
        state.loading = false;
        state.respuesta = 'Error al obtener los tipos de solicitudes';
        state.error = action.payload;
      })
      // get de solicitudes      
      .addCase(getSolicitudes.pending, (state, action) => {
        state.loading = true
      })
      .addCase(getSolicitudes.fulfilled, (state, action) => {
        state.loading = false;
        state.solicitudes = action.payload; 
        state.respuesta = 'Solicitudes obtenidas correctamente';
      })
      .addCase(getSolicitudes.rejected, (state, action) => {
        state.loading = false;
        state.respuesta = 'Error al obtener las solicitudes';
        state.error = action.payload
      })
    }
  });



// Obtener solicitudes
export const getTipoSolicitudes = createAsyncThunk(
  "solicitudes/getTipoSolicitudes",
  async (id, { rejectWithValue }) => {
    const token = store.getState().user.token;
    try {      
      const response = await axios({
        method: 'GET',
        url: `${URL_API}/licencias/traerTipoSolicitud`,
        params: { id },
        headers: { "Authorization": `Bearer ${token}` }      
      });      
      return response.data.data;
    } catch (error) {
      console.error('Error al traer los tipos de solicitudes:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
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
      // console.log(response.data);
      return response.data;
    } catch (error) {
      return error
    }
  }
);

//get de solicitudes
export const getSolicitudes = createAsyncThunk(
  "solicitudes/getSolicitudes",
  async (id, { rejectWithValue }) => {
    const token = store.getState().user.token;
    try {
      const response = await axios({
        method: 'GET',
        url: `${URL_API}/licencias/getSolicitud`,
        params: { id },
        headers: { "Authorization": `Bearer ${token}`}
      })  
      return response.data.data;
    } catch (error) {
      console.error('Error al traer las solicitudes:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

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

export const elevarSolicitud = createAsyncThunk(
  "solicitudes/elevarSolicitud",
  async ({solicitudId, estado} ) => {
    console.log(solicitudId, estado);
    try {
      const response = await axios({
        method: 'PUT',
        url: `${URL_API}/licencias/responderSolicitud/${solicitudId}`,
        data: {estado: estado},
        headers: { "Authorization": "Bearer " + store.getState().user.token },
      })
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return error
    }
  }
)


export const { setSolicitudes } = solicitudesSlice.actions;

export default solicitudesSlice.reducer;
