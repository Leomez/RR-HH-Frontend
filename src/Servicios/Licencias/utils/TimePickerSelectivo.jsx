import React from 'react'
import { TimePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'


const llegarTarde = ({ formData, setFormData }) => {
    return <TimePicker
        label='Hora de entrada'
        ampm={false}
        defaultValue={dayjs()}
        minTime={dayjs().set('hour', '08').startOf('hour')}
        maxTime={dayjs().set('hour', '20').startOf('hour')}
        format="HH:mm"
        onChange={(newValue) => setFormData({ ...formData, horaPermiso: newValue.format('HH:mm:00') })}
    />
}

const salirTemprano = ({ formData, setFormData }) => {
    return <TimePicker
        label='Hora de salida'
        ampm={false}
        defaultValue={dayjs()}
        minTime={dayjs().set('hour', '08').startOf('hour')}
        maxTime={dayjs().set('hour', '20').startOf('hour')}
        format="HH:mm"
        onChange={(newValue) => setFormData({ ...formData, horaPermiso: newValue.format('HH:mm:00') })}
    />
}

const CambioHorario = ({ formData, setFormData }) => {
    return <TimePicker
        label='Nueva hora de entrada'
        ampm={false}
        defaultValue={dayjs()}
        minTime={dayjs().set('hour', '08').startOf('hour')}
        maxTime={dayjs().set('hour', '20').startOf('hour')}
        format="HH:mm"
        onChange={(newValue) => setFormData({ ...formData, horaPermiso: newValue.format('HH:mm:00') })}
    />
}

function TimePickerSelectivo(props) {
    const { formData, setFormData, categoria } = props
    console.log('estoy en TimePickerSelectivo');
    switch (categoria) {
        case 'Llegar Tarde':
            return llegarTarde({ formData, setFormData })
        case 'Salir Temprano':
            return salirTemprano({ formData, setFormData })
        case 'Cambio de horario':
            return CambioHorario({ formData, setFormData })
        default:
            return null
    }

}

export default TimePickerSelectivo