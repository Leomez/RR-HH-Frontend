import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import store from "../../Store/store";
import axios from "axios";
import { URL_API } from "../../../Config/constantes";

const initialState = {    
    licenciasXEmpleado: [],
    vacacionesDisponibles: 0,
    loading: false,
    error: null
};

const getHeaders = (token) => ({
    headers: { Authorization: `Bearer ${token}` },
});

export const getLicenciasXEmpleado = createAsyncThunk(
    "licencias/getLicenciasXEmpleado",
    async (id, { rejectWithValue }) => {
        const token = store.getState().user.token;
        try {
            const { data } = await axios.get(`${URL_API}/licencias/licenciaXEmpleado/${id}`, getHeaders(token));
            return data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Error desconocido al traer las licencias");
        }
    }
);

export const getVacacionesDisponibles = createAsyncThunk(
    "licencias/getVacacionesDisponibles",
    async (id, { rejectWithValue }) => {
        const token = store.getState().user.token;
        try {
            const { data } = await axios.get(`${URL_API}/licencias/diasVacacionesXEmpleado/${id}`, getHeaders(token));
            return data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Error desconocido al traer las vacaciones");
        }
    }
);

export const getTiposDeLicencia = createAsyncThunk(
    "licencias/getTiposDeLicencia",
    async (_, { rejectWithValue }) => {
        const token = store.getState().user.token;
        try {
            const { data } = await axios.get(`${URL_API}/licencias/getTiposLicencias`, getHeaders(token));
            return data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Error desconocido al traer los tipos de licencia");
        }
    }
);

const licenciasSlice = createSlice({
    name: "licencias",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getLicenciasXEmpleado.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getLicenciasXEmpleado.fulfilled, (state, action) => {
                state.loading = false;
                state.licenciasXEmpleado = action.payload;
            })
            .addCase(getLicenciasXEmpleado.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getVacacionesDisponibles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getVacacionesDisponibles.fulfilled, (state, action) => {
                state.loading = false;
                state.vacacionesDisponibles = action.payload;
            })
            .addCase(getVacacionesDisponibles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getTiposDeLicencia.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTiposDeLicencia.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(getTiposDeLicencia.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default licenciasSlice.reducer;

