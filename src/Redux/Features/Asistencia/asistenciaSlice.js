import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
import store from "../../Store/store";
import { URL_API } from "../../../Config/constantes";
import { showError } from "../Error/errorSlice";

const URL = URL_API;

const initialState = {
  ingreso: null,
  inicioPausa: null,
  finPausa: null,
  salida: null,
  asistencia: {},
  loading: false,
  error: null,
};

export const nuevoIngreso = createAsyncThunk(
    "asistencia/nuevoIngreso",
    async (id, { rejectWithValue }) => {
        console.log(id);
        
        try {
            const response = await axios({
                url: `${URL}/asistencia/ingreso`,
                method: "post",
                data: {id: id},
                headers: { "Authorization": `Bearer ${store.getState().user.token}`}
            });
            return response.data.data;
        } catch (error) {
            console.log(error);
        }
    }

)

export const nuevoInicioPausa = createAsyncThunk(
    "asistencia/nuevoInicioPausa",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios({
                url: `${URL}/asistencia/inicioDePausa`,
                method: "post",
                data: {id: id},
                headers: { "Authorization":`Bearer ${store.getState().user.token}`}
            })
            return response.data.data
        } catch (error) {
            console.log(error);
            
        }
    }
)

export const nuevoFinPausa = createAsyncThunk(
    "asistencia/nuevoFinPausa",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios({
                url: `${URL}/asistencia/finDePausa`,
                method: "post",
                data: {id: id},
                headers: { "Authorization":`Bearer ${store.getState().user.token}`}
            })
            return response.data.data
        } catch (error) {
            console.log(error);            
        }
    }
)

export const nuevoSalida = createAsyncThunk(
    "asistencia/nuevoSalida",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios({
                url: `${URL}/asistencia/salida`,
                method: "post",
                data: {id: id},
                headers: { "Authorization":`Bearer ${store.getState().user.token}`}
            })            
            return response.data.data
        } catch (error) {
            console.log(error);
        }
    }
)


    

export const fetchAsistencias = createAsyncThunk(
  "asistencia/fetchAsistencias",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios({
        url: `${URL}/asistencia/${id}`,
        method: "get",
        headers: { "Authorization": "Bearer " + store.getState().user.token }
      });
      return response.data.data;
    } catch (error) {
      if (error.response) {
        const errorData = {
          status: error.response.status,
          data: error.response.data,
        };
        store.dispatch(showError(errorData.data));
        return rejectWithValue(errorData);
      }
      // const { data } = error.response;
      // store.dispatch(showError(data.errorMessage))
      // throw new Error(error.response?.data?.message || "Error desconocido al cargar las asistencias");
    }
  }
);

const asistenciaSlice = createSlice({
  name: "asistencia",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (constructor) => {
    constructor
      .addCase(fetchAsistencias.fulfilled, (state, action) => {
        state.asistencia = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchAsistencias.rejected, (state, action) => {
        console.error("Error al obtener las asistencias:", action.payload);
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchAsistencias.pending, (state) => {
        state.loading = true;
      })
      .addCase(nuevoIngreso.fulfilled, (state, action) => {
        state.ingreso = action.payload;
        state.loading = false;
        state.error = null;
        state.salida = null;
        state.inicioPausa = null;
        state.finPausa = null;
      })
      .addCase(nuevoIngreso.rejected, (state, action) => {
        console.error("Error al crear un nuevo ingreso:", action.error.message);
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(nuevoIngreso.pending, (state) => {
        state.loading = true;
      })
      .addCase(nuevoInicioPausa.fulfilled, (state, action) => {
        state.inicioPausa = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(nuevoInicioPausa.rejected, (state, action) => {
        console.error("Error al crear un nuevo inicio de pausa:", action.error.message);
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(nuevoInicioPausa.pending, (state) => {
        state.loading = true;
      })
      .addCase(nuevoFinPausa.fulfilled, (state, action) => {
        state.finPausa = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(nuevoFinPausa.rejected, (state, action) => {
        console.error("Error al crear un nuevo fin de pausa:", action.error.message);
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(nuevoFinPausa.pending, (state) => {
        state.loading = true;
      })
      .addCase(nuevoSalida.fulfilled, (state, action) => {
        state.salida = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(nuevoSalida.rejected, (state, action) => {
        console.error("Error al crear una nueva salida:", action.error.message);
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(nuevoSalida.pending, (state) => {
        state.loading = true;
      })

  },
});

export const { resetError } = asistenciaSlice.actions;
export default asistenciaSlice.reducer;


