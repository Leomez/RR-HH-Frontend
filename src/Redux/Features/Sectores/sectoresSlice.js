import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { URL_API } from "../constantes";

const URL = URL_API

const initialState = {
    sectores: [],
    sector: {}
}

export const crearSector = createAsyncThunk('sectores/crearSector', async ({nombre, token}) => {
    try {
        const res = await axios({
            url:`${URL}/sector`,
            method: 'post', 
            data: nombre,
            headers: {"Authorization": "Bearer " + token}
        })
        return res
    } catch (error) {
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
        })
        .addCase(crearSector.rejected, (state, action) => {
            console.log("Error al crear el sector:", action.error.message);
            state.sector = { error: action.error.message }
        })
        .addCase(fetchSectores.fulfilled, (state, action) => {
            state.sectores = action.payload.data;
        })
        .addCase(fetchSectores.rejected, (state, action) => {
            console.log("Error al cargar los sectores:", action.error.message);
            state.sectores = { error: action.error.message }
        })
        .addCase(fetchSector.fulfilled, (state, action) => {
            state.sector = action.payload.data;
        })
        .addCase(fetchSector.rejected, (state, action) => {
            console.log("Error al cargar el sector:", action.error.message);
            state.sector = { error: action.error.message }
        })
        .addCase(fetchSectorXId.fulfilled, (state, action) => {
            state.sector = action.payload.data;
        })
        .addCase(fetchSectorXId.rejected, (state, action) => {
            console.log("Error al cargar el sector:", action.error.message);
            state.sector = { error: action.error.message }
        })        
    }
})


export default sectoresSlice.reducer