/* eslint-disable no-undef */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import store from '../../Store/store';
import { setLoading } from "../Loading/loadingSlice";
import { URL_API } from "../constantes";

const URL = URL_API

// const token = ''
// console.log(store.getState().user);

// const { VITE_API_URL } = import.meta.env

const initialState = {
    nuevoEmpleadoCreado: {},
    empleados: [],
    domicilios:[],
    empleadoActual: null,
};

export const nuevoEmpleado = createAsyncThunk('empleado/nuevoEmpleado', async (data) => {
    try {        
        const response = await axios({
            method: 'post',
            url: `${URL}/empleado`,
            data: data,
            headers: { "Authorization": "Bearer " + store.getState().user.token }
        });
        // console.log(`Respuesta de accion: ${response.data}`);
        return response.data
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error desconocido al crear un nuevo empleado");
    }
})

export const fetchEmpleados = createAsyncThunk('empleado/fetchEmpleados', async () => {
    try {       
        const response = await axios({
            url: `${URL}/empleado`,
            method: 'get',
            headers: { "Authorization": "Bearer " + store.getState().user.token }
        });        
        return response.data.data;
    } catch (error) {        
        // throw new Error(error)
        return{
            success: false,
            error: error
        }
    }
})

export const fetchDomicilios = createAsyncThunk('empleado/fetchDomicilios', async () => {
    try {
        const response = await axios({
            url: `${URL}/domicilio`,
            method: 'get',
            headers: { "Authorization": "Bearer " + store.getState().user.token }
        });
        return response.data.data
    } catch (error) {
        throw new Error(error)        
    }
})

export const fetchEmpleadoById = createAsyncThunk('empleado/fetchEmpleadoById', async(id) => {
    try {
        const response = await axios({
            url:`${URL}/empleado/${id}`,
            method: 'get',
            headers: { "Authorization": "Bearer " + store.getState().user.token }
        });
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
        const response = await axios({
            url: `${URL}/empleado?id=${id}`,
            method: 'get',
            headers: { "Authorization": "Bearer " + store.getState().user.token }
        });
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
            state.empleados = [action.error]
        })
        .addCase(fetchDomicilios.fulfilled, (state, action) => {
            state.domicilios = action.payload
        })
        .addCase(fetchDomicilios.rejected, (state, action) => {
            console.error("Error al obtener los domicilios: ", action.error.message);
            state.domicilios = {error: action.error.message}
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