import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import store from "../../Store/store";
import { URL_API } from "../constantes";

const URL = URL_API

const initialState = {
    supervisores: []
}

export const crearSupervisor = createAsyncThunk('supervisor/crearSupervisor', async ({empleadoId, sectorId}) => {
    try {        
        const res = await axios({
            method: 'post',
            url: `${URL}/supervisor`,
            data: {empleadoId, sectorId},
            headers: {"Authorization": "Bearer " + store.getState().user.token}
        })        
        return res.data
    } catch (error) {
        const { data } = error.response
        console.log(data);
        throw new Error(error)
    }
})

export const getSupervisores = createAsyncThunk('supervisor/getSupervisor', async (sectorId) => {
    try {
        // console.log(store.getState().user.token);
        if (sectorId) {
            const res = await axios.get(`${URL}/supervisor?sectorId=${sectorId}`, {
                headers: {'Authorization': "Bearer " + store.getState().user.token}
            })
            return res.data
        } else {
            const res = await axios.get(`${URL}/supervisor`, {
                headers: {'Authorization': "Bearer " + store.getState().user.token}
            })
            return res.data
        }
    } catch (error) {
        const { data } = error.response
        console.log(data);
        throw new Error(error)
    }
})

const supervisorSlice = createSlice({
    name: 'supervisor',
    initialState,
    reducers: {},
    extraReducers: (constructor) => {
        constructor
            .addCase(crearSupervisor.fulfilled, (state, action) => {
                 console.log(action.payload); })
            .addCase(getSupervisores.fulfilled, (state, action) => {
                state.supervisores = action.payload
            })

    }

})

export default supervisorSlice.reducer