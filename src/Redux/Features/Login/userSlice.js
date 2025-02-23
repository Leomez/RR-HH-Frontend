import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setLoading } from "../Loading/loadingSlice";
import { showError, hideError } from "../Error/errorSlice";
import { empleadoActual } from "../Empleado/empleadoSlice";
import axios from "axios";
import store from "../../Store/store";
import { URL_API } from "../../../Config/constantes";

const URL = URL_API;


const initialState = {
    loading: false,
    error: {
        showError: false,
        errorData: ''
    },
    conexion: true,
    empleadoId: null,
    user: null,
    foto: null,
    rol: null,
    isAuth: false,
    token: null,
    nuevoUsuario: null
};

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (user, { rejectWithValue }) => {
        const token = user?.token;
        console.log(token, '<-- token');
        if (!token) {
            console.error('Token no disponible');
            // Maneja el caso donde el token no está disponible
        }
        try {
            console.log(URL);
            const response = await axios({
                url: `${URL}/login`,
                method: "post",
                headers: { "Authorization": `Bearer ${token}` },
                data: user
            });
            await store.dispatch(empleadoActual({ id: response.data.data.EmpleadoId, token: token }));
            return response.data;
        } catch (error) {
            if (error.response) {
                const errorData = {
                    status: error.response.status,
                    data: error.response.data
                };
                return rejectWithValue(errorData);
            } else if (error.request) {
                console.error("Error de red:", error);
                return rejectWithValue({
                    status: 'NETWORK_ERROR',
                    data: 'No se recibió una respuesta del servidor. Verifica tu conexión a Internet.',
                    error: error.message
                });
            } else {
                console.error("Error durante la configuración de la solicitud:", error);
                return rejectWithValue({
                    status: 'REQUEST_ERROR',
                    data: 'Ocurrió un error al configurar la solicitud.',
                    error: error.message
                });
            }
        }
    });


export const registrarUser = createAsyncThunk('user/registrarUser', async (user, { rejectWithValue }) => {
    try {
        console.log(user, '<---en redux');
        const response = await axios({
            url: `${URL}/usuario/registro`,
            method: "post",
            data: user
        });
        return {
            success: response.data.success,
            message: response.data.message,
            nombreUsuario: response.data.data.usuario
        };
    } catch (error) {
        if (error.response) {
            const errorData = {
                status: error.response.status,
                data: error.response.data
            };
            return rejectWithValue(errorData);
        }
        return rejectWithValue({ status: 'NETWORK_ERROR', data: 'Error de conexion con el servidor, Por favor intente de nuevo.', error: error });
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logoutUser: (state) => {
            return initialState; // Resetear el estado al inicial
        },
        resetConexion: (state) => {
            state.conexion = true;
        },
        resetUserError: (state) => {
            state.error.showError = false;
            state.error.errorData = null;
        },
        refreshUserToken: (state, action) => {
            state.token = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // .addCase('persist/REHYDRATE', (state, action) => {
            //     if (action.payload) {
            //         return { ...state, ...action.payload.user };
            //     }
            // })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.empleadoId = action.payload.data.EmpleadoId;
                state.isAuth = action.payload.success;
                state.user = action.payload.data.usuario;
                state.rol = action.payload.data.rol;
                state.foto = action.payload.data.foto;
                state.token = action.payload.data.token;
                state.loading = false;
                console.log(state); //<--- console.log del estado para ver que imprime
                state.error.showError = false;
                state.error.errorData = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error.showError = true;
                state.error.errorData = action.payload;
                state.conexion = false;
                state.loading = false;
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(registrarUser.fulfilled, (state, action) => {
                state.nuevoUsuario = action.payload;
                state.loading = false;
                state.error.showError = false;
                state.error.errorData = null;
            })
            .addCase(registrarUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(registrarUser.rejected, (state, action) => {
                state.error.showError = true;
                state.error.errorData = action.payload;
                state.loading = false;
            });
    }
});

export const { logoutUser, resetConexion, resetUserError, refreshUserToken } = userSlice.actions;
export default userSlice.reducer;
