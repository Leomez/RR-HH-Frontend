/* eslint-disable no-undef */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import store from '../../Store/store';
import { setLoading } from "../Loading/loadingSlice";

// console.log(import.meta.env.API_URL);
const { VITE_API_URL } = import.meta.env

const URL = VITE_API_URL || 'http://localhost:3001'


const initialState = {
    nuevoEmpleadoCreado: {},
    empleados: [],
    empleadoActual: null,
};

export const nuevoEmpleado = createAsyncThunk('empleado/nuevoEmpleado', async (data) => {
    try {
        console.log(URL);
        const response = await axios.post(`${URL}/empleado`, data);
        // console.log(`Respuesta de accion: ${response.data}`);
        return response.data
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error desconocido al crear un nuevo empleado");
    }
})

export const fetchEmpleados = createAsyncThunk('empleado/fetchEmpleados', async () => {
    try {
        const response = await axios.get(`${URL}/empleado`);
        // console.log(response.data);
        return response.data.data;
    } catch (error) {
        throw new Error(error)
    }
})

export const fetchEmpleadoById = createAsyncThunk('empleado/fetchEmpleadoById', async(id) => {
    try {
        const response = await axios.get(`${URL}/empleado/${id}`);
        return response.data
    } catch (error) {
        throw new Error(error)        
    }
});
var cont = 0
export const empleadoActual = createAsyncThunk('empleado/empleadoActual', async(id) => {
    try {
        store.dispatch(setLoading(true))
        cont++
        console.log(cont);
        const response = await axios.get(`${URL}/empleado?id=${id}`);
        console.log(response.data);
        return response.data.data[0]
    } catch (error) {
        throw new Error(error)
    } finally {
        store.dispatch(setLoading(false))
    }
});

const empleadoSlice = createSlice({
    name: 'empleado',
    initialState,
    reducers: {},
    extraReducers: (constructor) => {
        constructor
        .addCase(nuevoEmpleado.fulfilled, (state, action) => {
            state.nuevoEmpleadoCreado = action.payload;
        })
        .addCase(nuevoEmpleado.rejected, (state, action) => {
            console.error("Error al crear un nuevo empleado:", action.error.message);
            state.nuevoEmpleadoCreado = { error: action.error.message };
        })
        .addCase(fetchEmpleados.fulfilled, (state, action) => {
            state.empleados = action.payload
        })
        .addCase(fetchEmpleados.rejected, (state, action) => {
            console.error("Error al obtener los empleados:", action.error.message);
            state.empleados = { error: action.error.message };
        })
        .addCase(fetchEmpleadoById.fulfilled, (state, action) => {
            state.empleadoActual = action.payload;
        })
        .addCase(empleadoActual.fulfilled, (state, action) => {
            state.empleadoActual = action.payload;
        })
    }
})

export default empleadoSlice.reducer