import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setFirma, clearFirma } from "../Firma/firmaSilce";
import store from "../../Store/store";
import axios from "axios";
import { setLoading } from "../Loading/loadingSlice";
import { URL_API } from "../constantes";


const URL = URL_API

const initialState = {
  reciboCargado: null,
  recibos: [],
};

export const cargarRecibo = createAsyncThunk(
  "recibos/cargarRecibo",
  async ({datos, token}) => {
    if (datos) {
      try {
        store.dispatch(setLoading(true));
        // console.log("datos-> " + datos);
        const res = await axios({
          url: `${URL}/recibos/CargarUnRecibo`,
          method: "POST",
          data: datos,
          headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "multipart/form-data",
          },
        });
        // console.log(res.data);
        return res.data;
      } catch (error) {
        console.error(error);
        throw new Error("Ocurrió un error al cargar los recibos");
      } finally {
        store.dispatch(setLoading(false));
      }
    }
  }
);

export const cargarRecibos = createAsyncThunk(
  "recibos/cargarRecibos",
  async ({arrayFormData, token}) => {
    if (arrayFormData) {
      console.log(arrayFormData);
      try {
        store.dispatch(setLoading(true));
        // console.log("datos-> " + arrayFormData);
        const res = await axios({
          url: `${URL}/recibos/CargarRecibos`,
          method: "POST",
          data: arrayFormData,
          headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "multipart/form-data",
          },
        });

        return res.data;
      } catch (error) {
        console.error(error);
        throw new Error("Ocurrió un error al cargar los recibos");
      } finally {
        store.dispatch(setLoading(false));
      }
    }
  }
);

export const getRecibos = createAsyncThunk("recibos/getRecibos", async ({id, token}) => {
  try {
    store.dispatch(setLoading(true));
    const res = await axios({
      url: `${URL}/recibos/obtenerRecibos/${id}`,
      method: "GET",
      headers: {"Authorization": "Bearer " + token}
    });
    console.log(res.data.recibos.data);
    return res.data.recibos.data;
  } catch (error) {
    console.log(error);
    throw new Error("Ocurrió un error al cargar los recibos");
  } finally {
    store.dispatch(setLoading(false));
  }
});

export const actualizarReciboFirmado = createAsyncThunk("recibos/actualizarRecibosfirmados", async ({recibo, token}) => {
  try {
    store.dispatch(setLoading(true));
      console.log(recibo);
    await axios({
      url: `${URL}/recibos/ActualizarReciboFirmado`,
      method: "POST",
      data: recibo,
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": "Bearer " + token
      }
    })
     .then(console.log('¡recibo enviado exitosamente!'))
  } catch (error) {
    console.log(`Error en el envio:  ${error}`);
  }
})

const reciboSlice = createSlice({
  name: "recibos",
  initialState,
  reducers: {
    // actualizarReciboFirmado: (state, action) => {
      // const { id, archivo } = action.payload;
    // console.log(action.payload.archivo);
    // // Encuentra el índice del recibo con el ID proporcionado
    // const index = state.recibos.findIndex((recibo) => recibo.id === id);
    // // Verifica si se encontró el recibo con el ID proporcionado
    // if (index !== -1) {
    //   // Actualiza el archivo del recibo con el valor proporcionado
    //   state.recibos[index].archivo = archivo;
    //   state.recibos[index].estado = "Firmado"
    // }
  },
  extraReducers: (constructor) => {
    constructor
      .addCase(cargarRecibo.fulfilled, (state, action) => {
        state.reciboCargado = action.payload;
      })
      .addCase(cargarRecibo.rejected, (state, action) => {
        state.reciboCargado = action.payload;
      })
      .addCase(cargarRecibos.fulfilled, (state, action) => {
        state.reciboCargado = action.payload;
      })
      .addCase(cargarRecibos.rejected, (state, action) => {
        // Manejar el error aquí si es necesario
        state.reciboCargado = action.payload;
        console.error(action.payload); // Aquí puedes mostrar el mensaje de error al usuario
      })
      .addCase(getRecibos.fulfilled, (state, action) => {
        state.recibos = action.payload;
      })
      .addCase(getRecibos.rejected, (state, action) => {
        // Manejar el error aquí si es necesario
        state.recibos = action.payload;
        console.error(action.payload); // Aquí puedes mostrar el mensaje de error al usuario
      })
      .addCase(setFirma, (state, action) => {
        const { reciboId, firmaSvg } = action.payload;
        const reciboIndex = state.recibos.findIndex((recibo) => recibo.id === reciboId);
        if (reciboIndex !== -1) {
          state.recibos[reciboIndex].firma = firmaSvg;
        }
      })
      .addCase(clearFirma, (state) => {
        // Limpia la firma del recibo correspondiente en el estado global
        const reciboId = state.reciboCargado.id; // Asegúrate de tener la información del recibo cargado en el estado
        const reciboIndex = state.recibos.findIndex((recibo) => recibo.id === reciboId);
        if (reciboIndex !== -1) {
          state.recibos[reciboIndex].firma = null;
        }
      });
  },
});

// export const { actualizarReciboFirmado } = reciboSlice.actions
export default reciboSlice.reducer;
