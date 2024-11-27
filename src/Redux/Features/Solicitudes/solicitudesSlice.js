import { createSlice, createAsyncThunk, isAsyncThunkAction } from "@reduxjs/toolkit";
import store from "../../Store/store";
import axios from "axios";
import { URL_API } from "../constantes";

const initialState = {
  solicitudes: [],
  todasSolicitudes: [],
  solicitudesXEmpleado: [],
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
      // get de solicitudes elevadas
      .addCase(getSolicitudesElevadas.pending, (state, action) => {
        state.loading = true
      })
      .addCase(getSolicitudesElevadas.fulfilled, (state, action) => {
        state.loading = false;
        state.solicitudes = action.payload;
        state.respuesta = 'Solicitudes elevadas obtenidas correctamente';
      })
      .addCase(getSolicitudesElevadas.rejected, (state, action) => {
        state.loading = false;
        state.respuesta = 'Error al obtener las solicitudes elevadas';
        state.error = action.payload
      })
      // get solicitudes por empleado
      .addCase(getSolicitudesXEmpleado.pending, (state, action) => {
        state.loading = true
      })
      .addCase(getSolicitudesXEmpleado.fulfilled, (state, action) => {
        state.loading = false;
        state.solicitudesXEmpleado =  action.payload;
        state.respuesta = 'Solicitudes completadas obtenidas correctamente';
      })
      .addCase(getSolicitudesXEmpleado.rejected, (state, action) => {
        state.loading = false;
        state.respuesta = 'Error al obtener las solicitudes completadas';
        state.solicitudesXEmpleado = [];
        state.error = action.payload
      })
      .addCase(getTodasSolicetudes.pending, (state, action) => {
        state.loading = true
      })
      .addCase(getTodasSolicetudes.fulfilled, (state, action) => {
        state.loading = false
        state.todasSolicitudes = action.payload;
        state.respuesta = 'Todas las solicitudes obtenidas correctamente';
      })
      .addCase(getTodasSolicetudes.rejected, (state, action) => {
        state.loading = false
        state.respuesta = 'Error al obtener las solicitudes';
        state.todasSolicitudes = [];
        state.error = action.payload
      })

  }
});



// Obtener tipos de solicitudes
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
      // const response = await axios({
      //   method: 'POST',
      //   url: `${URL_API}/licencias/crearSolicitud`,
      //   data: solicitud,
      //   headers: { "Authorization": "Bearer " + store.getState().user.token }
      // })
      console.log(solicitud);
      // return response.data;
    } catch (error) {
      return error
    }
  }
);

//get de todas las solicitudes
export const getTodasSolicetudes = createAsyncThunk(
  "solicitudes/getTodasSolicitudes",
  async () => {
    const token = store.getState().user.token;
    try {
      const respuesta = await axios({
        method: "GET",
        url: `${URL_API}/licencias/getAllSolicitudes`,
        headers: { "Authorization": `Bearer ${token}` }
      })
      return respuesta.data.data;
    } catch (error) {
      console.error('Error al traer las solicitudes: ', error.response?.data || error.message)
      return error.response?.data || error.message;
    }
  }
)

//get de solicitudes al supervisor
export const getSolicitudes = createAsyncThunk(
  "solicitudes/getSolicitudes",
  async (id, { rejectWithValue }) => {
    const token = store.getState().user.token;
    try {
      console.log('recargando solicitudes...');
      const response = await axios({
        method: 'GET',
        url: `${URL_API}/licencias/getSolicitudAlSuper`,
        params: { id },
        headers: { "Authorization": `Bearer ${token}` }
      })
      console.log('Solicitudes actualizadas');
      return response.data.data;
    } catch (error) {
      console.error('Error al traer las solicitudes:', error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const getSolicitudesElevadas = createAsyncThunk(
  "solicitudes/getSolicitudesElevadas",
  async (undefined, { rejectWithValue }) => {
    const token = store.getState().user.token;
    try {
      const response = await axios({
        method: 'GET',
        url: `${URL_API}/licencias/getSolicitudElevada`,
        headers: { "Authorization": `Bearer ${token}` }
      })
      console.log(response.data.data);
      return response.data.data
    } catch (error) {
      console.error('Error al traer las solicitudes:', error.response?.data || error.message)
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

// trae solicitudes autorizadas o rechazadas para mostrar al empleado
export const getSolicitudesXEmpleado = createAsyncThunk(
  "solicitudes/getSolicitudesXEmpleado",
  async (id, { rejectWithValue }) => {
    const token = store.getState().user.token;
    try {
      const response = await axios({
        method: 'GET',
        url: `${URL_API}/licencias/getSolicitudEmpleado`,
        headers: { "Authorization": `Bearer ${token}`},
        params: { id }
      })
      return response.data.data
    } catch (error) {
      console.error('Error al traer las solicitudes:', error.response?.data || error.message)
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
  async ({ solicitudId, estado }) => {
    console.log(solicitudId, estado);
    try {
      console.log('enviando solicitud');
      const response = await axios({
        method: 'PUT',
        url: `${URL_API}/licencias/responderSolicitud/${solicitudId}`,
        data: { estado: estado },
        headers: { "Authorization": "Bearer " + store.getState().user.token },
      })
      console.log('Solicitud enviada:  ',response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return error
    }
  }
)

export const autorizarSolicitud = createAsyncThunk(
  "solicitudes/autorizarSolicitud",
  async ({ solicitudId, estado }) => {
    try {
      const response = await axios({
        method: 'PUT',
        url: `${URL_API}/licencias/responderSolicitud/${solicitudId}`,
        data: { estado: estado },
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


export const { setSolicitude } = solicitudesSlice.actions;

export default solicitudesSlice.reducer;
