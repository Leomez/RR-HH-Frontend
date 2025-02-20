import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FormControl, Select, MenuItem, InputLabel, Stack, Button, Menu } from "@mui/material";
import FormContainer from "../../../Componentes/Containers/FormContainer";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import CrearSector from "../../Sector/CrearSector";
import { fetchSectores } from "../../../Redux/Features/Sectores/sectoresSlice";
import { Form } from "react-router-dom";


// eslint-disable-next-line react/prop-types
export default function DatosPuestoForm({ inputs, handleChange }) {
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const userToken = useSelector((state) => state.user.token)

  useEffect(() => {
    dispatch(fetchSectores(userToken))
  }, [dispatch])
  const sectores = useSelector(state => state.sectores.sectores)
  
  function handleFechaIngresoChange(date) {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    const e = {
      target: {
        name: "fecha_ingr",
        value: formattedDate
      },
    };
    handleChange(e);
  }

  function handleCrearSector() {
    setOpen(true)
  }

  return (
    <>
      <FormContainer titulo={"Datos del Puesto"}>
        <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} sx={{ marginBottom: 3 }}>
          <FormControl variant="standard" sx={{ width: { xs: "100%", md: "10rem" } }}>
            <InputLabel>Cargo</InputLabel>
            <Select
              // eslint-disable-next-line react/prop-types
              value={inputs.cargo}
              name="cargo"
              onChange={handleChange}
            >
              <MenuItem value="Empleado">Empleado</MenuItem>
              <MenuItem value="Gerente">Gerente</MenuItem>
              <MenuItem value="Jefe">Jefe</MenuItem>
              <MenuItem value="Administrador">Administrador</MenuItem>
              <MenuItem value="Encargado">Encargado</MenuItem>
              <MenuItem value="Medico">Medico</MenuItem>
              <MenuItem value="Supervisor">Supervisor</MenuItem>
            </Select>
          </FormControl>

          <FormControl variant="standard" sx={{ width: { xs: "100%", md: "10rem" } }}>
            <InputLabel>Categoria</InputLabel>
            <Select
            // eslint-disable-next-line react/prop-types
              value={inputs.categoria}
              name="categoria"
              onChange={handleChange}
            >
              <MenuItem value="1°">1°</MenuItem>
              <MenuItem value="2°">2°</MenuItem>
              <MenuItem value="3°">3°</MenuItem>
              <MenuItem value="4°">4°</MenuItem>
              <MenuItem value="5°">5°</MenuItem>
              <MenuItem value="Fuera de Convenio">Fuera de convenio</MenuItem>
            </Select>
          </FormControl>

          <FormControl variant="standard" sx={{ width: { xs: "100%", md: "10rem" } }}>
            <InputLabel>Sector</InputLabel>
            <Select
            // eslint-disable-next-line react/prop-types
              value={inputs.sector}
              name="sector"
              onChange={handleChange}
            >
              {sectores && sectores.map(sector => {
                // console.log(sector.nombre_sector);
                return (
                  <MenuItem key={sector.id} value={sector.nombre_sector}>
                    {sector.nombre_sector}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
          
          <FormControl variant="standard" sx={{ width: { xs: "100%", md: "10rem" } }}>
            <InputLabel>Turno</InputLabel>
            <Select 
            // eslint-disable-next-line react/prop-types
              value={inputs.turno}
              name="turno"
              onChange={handleChange}
            >
              <MenuItem value="Mañana">Mañana</MenuItem>
              <MenuItem value="Tarde">Tarde</MenuItem>
              <MenuItem value="Noche">Noche</MenuItem>
            </Select>
          </FormControl>

          <FormControl variant="standard" sx={{ width: { xs: "100%", md: "10rem" } }}>
            <InputLabel>Permisos</InputLabel>
            <Select
            // eslint-disable-next-line react/prop-types
              value={inputs.permisos}
              name="permisos"
              onChange={handleChange}
            >
              <MenuItem value="ADMIN">Administrador</MenuItem>
              <MenuItem value="USER">Empleado</MenuItem>
              <MenuItem value="SUP">Supervisor</MenuItem>              
            </Select>
          </FormControl>          

          <Button onClick={handleCrearSector} variant="outlined" color="secondary" sx={{ fontSize: '0.5rem' }}>
            Crear Sector
          </Button>
          <CrearSector open={open} setOpen={setOpen} />
        </Stack>

        <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} sx={{ marginBottom: 3 }}>

          <DatePicker
            label='Fecha de Ingreso'
            format="DD-MM-YYYY"
            onChange={e => handleFechaIngresoChange(e)}            
            sx={{ width: { xs: '100%', md: '16rem' } }}
          />

          <FormControl variant="standard" sx={{ width: { xs: "100%", md: "10rem" } }}>
            <InputLabel>Estado</InputLabel>
            <Select
            // eslint-disable-next-line react/prop-types
              value={inputs.estado}
              name="estado"
              onChange={handleChange}
            >
              <MenuItem value="Activo">Activo</MenuItem>
              <MenuItem value="Inactivo">Inactivo</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </FormContainer>
    </>
  );
}