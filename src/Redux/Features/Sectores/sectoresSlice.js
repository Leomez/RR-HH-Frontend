import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import store from '../../Store/store';
import axios from 'axios'
import { URL_API } from "../constantes";
import { setLoading } from '../Loading/loadingSlice';
import { showError } from '../Error/errorSlice';


const URL = URL_API

const initialState = {
    loading: false,
    sectores: [],
    sector: {}
}

export const crearSector = createAsyncThunk('sectores/crearSector', async ({inputs, userToken}) => {
    try {
        const res = await axios({
            url:`${URL}/sector`,
            method: 'post', 
            data: inputs,
            headers: {"Authorization": "Bearer " + userToken}
        })
        return res
    } catch (error) {
        const { data } = error.response;
        store.dispatch(showError(data.errorMessage))        
        throw new Error(error.response?.data?.message || "Error desconocido al crear el sector")
    }
})

export const fetchSectores = createAsyncThunk('sectores/fetchSectores', async (token) => {
    
    try {        
        const res = await axios({
            url: `${URL}/sector`,
            method: 'get',
            headers: {"Authorization": "Bearer " + token}
        })
        return res.data
    } catch (error) {
        const { data } = error.response;
        store.dispatch(showError(data.errorMessage))
        throw new Error(error.response?.data?.message || "Error desconocido al traer los sectores");
    }
})

export const fetchSector = createAsyncThunk('sectores/fetchSector', async ({nombre, token}) => {
    try {
        const res = await axios.get(`${URL}/sector`,{
            data: nombre,
            headers: {"Authorization": "Bearer " + token}
        })
        return res.data
    } catch (error) {
        const { data } = error.response
        store.dispatch(showError(data.errorMessage))
        throw new Error(error.response?.data?.message || "Error desconocido al traer el sector");
    }
})

export const fetchSectorXId = createAsyncThunk('sectores/fetchSectorXId', async ({id, token}) => {    
    try {
        const res = await axios({
            url:`${URL}/sector/${id}`,
            method: 'get',
            headers: {"authorization": "Bearer " + token}
        })
        return res.data
    }
    catch (error) {
        const { data } = error.response
        store.dispatch(showError(data.errorMessage))
        throw new Error(error.response?.data?.message || "Error desconocido al traer el sector");
    }
})

const sectoresSlice = createSlice({
    name: 'sectores',
    initialState,
    reducers: {},
    extraReducers: (constructor) => {
        constructor
        .addCase(crearSector.fulfilled, (state, action) => {
            state.sector = action.payload.data
            state.loading = false
        })
        .addCase(crearSector.rejected, (state, action) => {
            console.log("Error al crear el sector:", action.error.message);
            state.sector = { error: action.error.message }
            state.loading = false
        })
        .addCase(crearSector.pending, (state) => {
            state.loading = true
        })
        .addCase(fetchSectores.fulfilled, (state, action) => {
            state.sectores = action.payload.data;
            state.loading = false
        })
        .addCase(fetchSectores.rejected, (state, action) => {
            console.log("Error al cargar los sectores:", action.error.message);
            state.sectores = { error: action.error.message }
            state.loading = false
        })
        .addCase(fetchSectores.pending, (state) => {
            state.loading = true
        })
        .addCase(fetchSector.fulfilled, (state, action) => {
            state.sector = action.payload.data;
            state.loading = false
        })
        .addCase(fetchSector.pending, (state) => {
            state.loading = true
        })
        .addCase(fetchSector.rejected, (state, action) => {
            console.log("Error al cargar el sector:", action.error.message);
            state.sector = { error: action.error.message }
            state.loading = false
        })
        .addCase(fetchSectorXId.fulfilled, (state, action) => {
            state.sector = action.payload.data;
            state.loading = false
        })
        .addCase(fetchSectorXId.pending, (state) => {
            state.loading = true
        })
        .addCase(fetchSectorXId.rejected, (state, action) => {
            console.log("Error al cargar el sector:", action.error.message);
            state.sector = { error: action.error.message }
            state.loading = false
        })        
    }
})


export default sectoresSlice.reducer