import React from 'react'
import { Select, MenuItem,Typography } from '@mui/material'
import { useState } from 'react'
// import setAllPeriodos from '../utils/setearTodosLosMeses'
import { mesesDelAnio } from '../utils/meses'

function SelectorDeMes( props) {
    const {empleados, setMesSeleccionado, setAllPeriodos} = props
    const [meses, setMeses] = useState([])
  return (
    <Select
        value="vaciar"
        variant="standard"
        onChange={(e) => setAllPeriodos(e.target.value, empleados, setMesSeleccionado)}
        sx={{ margin: "2rem 0", width: 250,  }}
      >
        <MenuItem value="">Vaciar todos los períodos</MenuItem>
        <MenuItem value="vaciar">Seleccionar período para todos</MenuItem>{" "}
        {/* Cambiar value a "vaciar" */}
        {mesesDelAnio.map((mes, index) => (
          <MenuItem key={index} value={mes}>
            {mes}
          </MenuItem>
        ))}
      </Select>
  )
}

export default SelectorDeMes