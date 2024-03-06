import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setLoading } from "../Loading/loadingSlice";
import { empleadoActual } from "../Empleado/empleadoSlice";
import axios from "axios";
import store from "../../Store/store";
import { URL_API } from "../constantes";
const URL = URL_API



const initialState = {
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
    try {
        store.dispatch(setLoading(true))
        console.log(URL);
        const response = await axios({
            url: `${URL}/login`,
            method: "post",
            headers: { "Authorization": "Bearer " + token }
        });
        store.dispatch(empleadoActual(response.data.data.EmpleadoId))
        return response.data
    } catch (error) {
        console.log('error en el login...', URL);
        throw error;
    } finally {
        store.dispatch(setLoading(false))
    }
})

export const registrarUser = createAsyncThunk('user/registrarUser', async (user) => {
    try {
        store.dispatch(setLoading(true))
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
            // console.log(error.response);
            const errorData = {
                status: error.response.status,
                data: error.response.data
            };
            throw new Error(JSON.stringify(errorData));
        }
        throw error
    } finally {
        store.dispatch(setLoading(false))
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
            })
            .addCase(loginUser.rejected, (state, action) => {                
                console.log(action);
                console.log(URL);
                state.conexion = false
            })
            .addCase(registrarUser.fulfilled, (state, action) => {
                state.nuevoUsuario = action.payload                
            })
            .addCase(registrarUser.rejected, (state, action) => {
                const errorData = JSON.parse(action.error.message); // Analizar la cadena JSON para obtener el objeto
                state.nuevoUsuario = errorData;                
            })
    }
})

export const { loginSucces, logoutUser, resetConexion } = userSlice.actions
export default userSlice.reducer