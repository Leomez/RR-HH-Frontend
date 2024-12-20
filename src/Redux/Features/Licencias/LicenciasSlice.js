import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import store from "../../Store/store";
import axios from "axios";
import { URL_API } from "../constantes";
import { showError } from "../Error/errorSlice";

const initialState = {
    licenciasXEmpleado: [],
    vacacionesDisponibles: 0,
    loading: false,
    error: null
}
const licencasSlice = createSlice({
    name: "licencias",
    initialState,
    reducers: {},
    extraReducers: (constructor) => {
        constructor
            .addCase(getLicenciasXEmpleado.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getLicenciasXEmpleado.fulfilled, (state, action) => {
                state.loading = false;
                state.licenciasXEmpleado = action.payload;
            })
            .addCase(getLicenciasXEmpleado.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getVacacionesDisponibles.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getVacacionesDisponibles.fulfilled, (state, action) => {
                state.loading = false;
                state.vacacionesDisponibles = action.payload;
            })
            .addCase(getVacacionesDisponibles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export const getLicenciasXEmpleado = createAsyncThunk(
    "licencias/getLicenciasXEmpleado",
    async (id) => {
        const token = store.getState().user.token;
        console.log(id);
        try {
            const licencias = await axios({
                method: "GET",
                url: `${URL_API}/licencias/licenciaXEmpleado/${id}`,
                headers: { "Authorization": `Bearer ${token}` },                
            })
            // console.log(licencias.data);            
            return licencias.data.data
        } catch (error) {
            const { data } = error.response;
            store.dispatch(showError(data.errorMessage || data.message || "Error desconocido al traer las licencias"))
            throw new Error(error.response?.data?.message || "Error desconocido al traer las licencias")
        }
    }
)

export const getVacacionesDisponibles = createAsyncThunk(
    "licencias/getVacacionesDisponibles",
    async (id) => {
        const token = store.getState().user.token;
        try {
            const vacaciones = await axios({
                method: "GET",
                url: `${URL_API}/licencias/diasVacacionesXEmpleado/${id}`,
                headers: { "Authorization": `Bearer ${token}` },
            })
            return vacaciones.data.data
        } catch (error) {
            const { data } = error.response;
            store.dispatch(showError(data.errorMessage || data.message || "Error desconocido al traer las vacaciones"))
            throw new Error(error.response?.data?.message || "Error desconocido al traer las vacaciones")
        }
    }
)








export default licencasSlice.reducer;

