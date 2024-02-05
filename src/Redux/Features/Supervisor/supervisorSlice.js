import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL_API } from "../constantes";

const URL = URL_API

const initialState = {
    supervisores: []
}

export const crearSupervisor = createAsyncThunk('supervisor/crearSupervisor', async (empleadoId, sectorId) => {
    try {
        const res = await axios.post(`${URL}/supervisor`, { empleadoId, sectorId });
        return res.data
    } catch (error) {
        throw new Error(error)
    }
})

export const getSupervisores = createAsyncThunk('supervisor/getSupervisor', async (sectorId, token) => {
    try {
        if (sectorId) {
            const res = await axios.get(`${URL}/supervisor?sectorId=${sectorId}`, {
                headers: {'Authorization': "Bearer " + token}
            })
            return res.data
        } else {
            const res = await axios.get(`${URL}/supervisor`, {
                headers: {'Authorization': "Bearer " + token}
            })
            return res.data
        }
    } catch (error) {
        throw new Error(error)
    }
})

const supervisorSlice = createSlice({
    name: 'supervisor',
    initialState,
    reducers: {},
    extraReducers: (constructor) => {
        constructor
            .addCase(crearSupervisor.fulfilled, (action) => { console.log(action.payload); })
            .addCase(getSupervisores.fulfilled, (state, action) => {
                state.supervisores = action.payload
            })

    }

})

export default supervisorSlice.reducer