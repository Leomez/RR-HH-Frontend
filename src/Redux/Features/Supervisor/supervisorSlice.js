import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import store from "../../Store/store";
import { URL_API } from "../constantes";

const URL = URL_API

const initialState = {
    supervisores: [],
    error: null,
    loading: false
}

export const crearSupervisor = createAsyncThunk('supervisor/crearSupervisor', async ({empleadoId, sectorId}, {rejectWithValue}) => {
    try {        
        const res = await axios({
            method: 'post',
            url: `${URL}/supervisor`,
            data: {empleadoId, sectorId},
            headers: {"Authorization": "Bearer " + store.getState().user.token}
        })        
        return res.data
    } catch (error) {
        if (error.response) {
            const errorData = {
                status: error.response.status,
                data: error.response.data
            };
            return rejectWithValue(errorData);
        }        
    }
})

export const getSupervisores = createAsyncThunk('supervisor/getSupervisor', async (sectorId, {rejectWithValue}) => {
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
        if (error.response) {
            const errorData = {
                status: error.response.status,
                data: error.response.data
            };
            return rejectWithValue(errorData);
        }        
    }
})

const supervisorSlice = createSlice({
    name: 'supervisor',
    initialState,
    reducers: {
        setError: (state) => {
            state.error = null
        }
    },
    extraReducers: (constructor) => {
        constructor
            .addCase(crearSupervisor.fulfilled, (state, action) => {
                //  console.log(action.payload); 
                state.loading = false
                state.error = null
            })
            .addCase(crearSupervisor.rejected, (state, action) => {
                // console.log(action)
                state.error = action.payload
                state.loading = false
            })
            .addCase(crearSupervisor.pending, (state) => {
                state.loading = true
            })
            .addCase(getSupervisores.fulfilled, (state, action) => {
                state.supervisores = action.payload
                state.loading = false
                state.error = null
            })
            .addCase(getSupervisores.rejected, (state, action)=> {
                state.error = action.payload
                state.loading = false
            })
            .addCase(getSupervisores.pending, (state) => {
                state.loading = true
            })
    }

})
export const { setError } = supervisorSlice.actions
export default supervisorSlice.reducer