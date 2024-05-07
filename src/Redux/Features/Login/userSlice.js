import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setLoading } from "../Loading/loadingSlice";
import { empleadoActual } from "../Empleado/empleadoSlice";
import axios from "axios";
import store from "../../Store/store";
import { URL_API } from "../constantes";
const URL = URL_API



const initialState = {
    loading: false,
    error: {
        showError: false,
        errorData: null
    },
    conexion: true,
    empleadoId: null,
    user: null,
    foto: null,
    rol: null,
    isAuth: false,
    token: null,
    nuevoUsuario: null
}
export const loginUser = createAsyncThunk('user/loginUser', async (user) => {
    const token = user.token    
    console.log(user);
    try {        
        // console.log(URL);
        const response = await axios({
            url: `${URL}/login`,
            method: "post",
            headers: { "Authorization": "Bearer " + token },
            data : user
        });
        await store.dispatch(empleadoActual({id:response.data.data.EmpleadoId, token:token}))
        return response.data
    } catch (error) {
        if (error.response) {
            const errorData = {
                status: error.response.status,
                data: error.response.data
            };
            return errorData
        }
        throw error;
    } 
})

export const registrarUser = createAsyncThunk('user/registrarUser', async (user) => {
    try {        
        const response = await axios({
            url: `${URL}/usuario/registro`,
            method: "post",
            data: user
        });
        return {
            success: response.data.success,
            message: response.data.message,
            nombreUsuario: response.data.data.usuario
        }        
    } catch (error) {
        if (error.response) {
            const errorData = {
                status: error.response.status,
                data: error.response.data
            };
            return errorData
        }
        throw error
    } 
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.conexion = true
            state.foto = null,
            state.empleadoId = null
            state.user = null;
            state.rol = null;
            state.isAuth = false;
            state.token = null
        }, 
        resetConexion: (state) => {
            state.conexion = true
        },
        resetUserError: (state) => {
            state.error.showError = false
            state.error.errorData = null
        } 
    },
    extraReducers: (constructor) => {
        constructor
            .addCase(loginUser.fulfilled, (state, action) => {                
                state.empleadoId = action.payload.data.EmpleadoId;
                state.isAuth = action.payload.success;
                state.user = action.payload.data.usuario;
                state.rol = action.payload.data.rol;
                state.foto = action.payload.data.foto
                state.token = action.payload.data.token
                state.loading = false
            })
            .addCase(loginUser.rejected, (state, action) => {                
                console.log(action);
                console.log(URL);
                state.error.showError = true
                state.error.errorData = action.payload
                state.conexion = false
                state.loading = false
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true
            })
            .addCase(registrarUser.fulfilled, (state, action) => {
                state.nuevoUsuario = action.payload
                state.loading = false                
            })
            .addCase(registrarUser.pending, (state) => {
                state.loading = true
            })
            .addCase(registrarUser.rejected, (state, action) => {
                const errorData = JSON.parse(action.error.message); // Analizar la cadena JSON para obtener el objeto
                state.nuevoUsuario = errorData;
                state.loading = false                
            })
    }
})

export const { loginSucces, logoutUser, resetConexion, resetUserError } = userSlice.actions
export default userSlice.reducer