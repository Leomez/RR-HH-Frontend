/* eslint-disable no-undef */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import store from '../../Store/store';
import { URL_API } from "../constantes";
import { showError } from '../Error/errorSlice';

const URL = URL_API

const initialState = {
    nuevoEmpleadoCreado: {},
    empleados: [],
    domicilios:[],
    empleadoActual: null,
    loading: true
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
        const { data } = error.response;
        store.dispatch(showError(data.errorMessage))
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
        const { data } = error.response;
        store.dispatch(showError(data.errorMessage))
        throw new Error(error.response?.data?.message || "Error desconocido al cargar los empleados");  
        // throw new Error(error)
        // return{
        //     success: false,
        //     error: error
        // }
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
        const { data } = error.response;
        store.dispatch(showError(data.errorMessage))
        throw new Error(error.response?.data?.message || "Error desconocido al cargar domicilios");
        // throw new Error(error)        
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
        const { data } = error.response;
        store.dispatch(showError(data.errorMessage))
        throw new Error(error.response?.data?.message || "Error desconocido al cargar el empleado");
        // throw new Error(error)        
    }
});
var cont = 0
export const empleadoActual = createAsyncThunk('empleado/empleadoActual', async({id, token}) => {
    try {        
        // cont++
        console.log('solicitud de empleado actual...');        
        const response = await axios({
            url: `${URL}/empleado/?id=${id}`,
            method: 'get',
            headers: { "Authorization": "Bearer " + token }
        });
        console.log(response.data);
        return response.data.data[0]
    } catch (error) {
        const { data } = error.response;
        store.dispatch(showError(data.errorMessage))
        throw new Error(error.response?.data?.message || "Error desconocido al cargar el empleado actual");
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
            state.loading = false
        })
        .addCase(nuevoEmpleado.rejected, (state, action) => {
            console.error("Error al crear un nuevo empleado:", action.error.message);
            state.nuevoEmpleadoCreado = { error: action.error.message };
            state.loading = false
        })
        .addCase(nuevoEmpleado.pending, (state) => {
            state.loading = true
        })
        .addCase(fetchEmpleados.fulfilled, (state, action) => {
            state.empleados = action.payload
            state.loading = false
        })
        .addCase(fetchEmpleados.rejected, (state, action) => {
            console.error("Error al obtener los empleados:", action.error.message);
            state.empleados = [action.error]
            state.loading = false
        })
        .addCase(fetchEmpleados.pending, (state) => {
            state.loading = true
        })
        .addCase(fetchDomicilios.fulfilled, (state, action) => {
            state.domicilios = action.payload
            state.loading = false
        })
        .addCase(fetchDomicilios.rejected, (state, action) => {
            console.error("Error al obtener los domicilios: ", action.error.message);
            state.domicilios = {error: action.error.message}
            state.loading = false
        })
        .addCase(fetchDomicilios.pending, (state) => {
            state.loading = true
        })
        .addCase(fetchEmpleadoById.fulfilled, (state, action) => {
            state.empleadoActual = action.payload;
            state.loading = false
        })
        .addCase(empleadoActual.fulfilled, (state, action) => {
            state.empleadoActual = action.payload;
            state.loading = false
        })
        .addCase(empleadoActual.pending, (state) => {
            state.loading = true
        })
    }
})

export default empleadoSlice.reducer