import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const { VITE_API_URL } = import.meta.env

const URL = VITE_API_URL || 'http://localhost:3001'


const initialState = {
    sectores: [],
    sector: {}
}

export const crearSector = createAsyncThunk('sectores/crearSector', async (nombre) => {
    try {
        const res = await axios.post(`${URL}/sector`, nombre)
        return res
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error desconocido al crear el sector")
    }
})

export const fetchSectores = createAsyncThunk('sectores/fetchSectores', async () => {
    try {
        const res = await axios.get(`${URL}/sector`)
        return res.data
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error desconocido al traer los sectores");
    }
})

export const fetchSector = createAsyncThunk('sectores/fetchSector', async (nombre) => {
    try {
        const res = await axios.get(`${URL}/sector`, nombre)
        return res.data
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error desconocido al traer el sector");
    }
})

export const fetchSectorXId = createAsyncThunk('sectores/fetchSectorXId', async (id) => {
    try {
        const res = await axios.get(`${URL}/sector/${id}`)
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