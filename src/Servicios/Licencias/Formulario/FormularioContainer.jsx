// FormularioContainer.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { getTipoSolicitudes, getSolicitudesXEmpleado, createSolicitud } from '../../../Redux/Features/Solicitudes/solicitudesSlice';
import { fetchFeriados, calcularDiasSolicitados, shouldDisableDate } from './helpers';
import FormularioVisual from './FormularioVisual';
import { tipoSolicitud } from './constants';
import Confirmacion from './Confirmacion';
import { validarFechasLicencia, validateForm } from '../utils/validaciones';
import { Error } from '../../../Componentes/Error'

const FormularioContainer = ({ close, reload, eventosYaSolicitados, slotInfo, setSlotInfo}) => {
  const dispatch = useDispatch();
  const tipoSolicitudes = useSelector((state) => state.solicitudes.tipoSolicitudes);
  // const errorSolicitudes = useSelector((state) => state.solicitudes.error);
  // const respuestaSolicitudes = useSelector((state) => state.solicitudes.respuesta);
  // const errorG= useSelector((state) => state.error);
  const empleado = useSelector((state) => state.empleado.empleadoActual);
  // console.log(slotInfo, '<--- slotInfo');


  const initialState = {
    empleado_id: '',
    tipo: '',
    fecha: '',
    categoria: '',
    tipo_solicitud_id: '',
    fechaDesde: '',
    fechaHasta: '',
    fechaPermiso: '',
    fechaCompensatoria: '',
    horaPermiso: '',
    motivo: '',
    diasSolicitados: 0,
  };

  // console.log(eventosYaSolicitados, '<--- eventosYaSolicitados');


  const [formData, setFormData] = useState(initialState);
  const [feriados, setFeriados] = useState({
    feriados: [],
    soloFechas: [],
  });
  const [error, setError] = useState(null)
  const [anio, setAnio] = useState(dayjs().year());
  const [diasRestantes, setDiasRestantes] = useState(0);
  const [open, setOpen] = useState(false);
  const [permisos, setPermisos] = useState([]); // Array para permisos
  const [licencias, setLicencias] = useState([]); // Array para licencias
  const [deshabilitarSubmit, setDeshabilitarSubmit] = useState(true);
  const [compensatorio, setCompensatorio] = useState(false);
  const [tipoSolicitudId, setTipoSolicitudId] = useState();
  const [dayLoading, setDayLoading] = useState(false);
  const [errorFecha, setErrorFecha] = useState({ estado: false, mensaje: '' }); // Estado para manejar errores de validación de fechas

  

  useEffect(() => {
    setDayLoading(true);
    fetchFeriados(anio, setFeriados);
    console.log(feriados);
    if (slotInfo.tipo === 'Licencia') {
      setFormData((prev) => ({
        ...prev,
        tipo: slotInfo.tipo,
        fechaDesde: slotInfo.desde,
        fechaHasta: slotInfo.hasta,
      }));
    }
    setDayLoading(false);
  }, [anio]);

  useEffect(() => {
    dispatch(getTipoSolicitudes(empleado.id));
  }, [empleado.id, dispatch]);

  useEffect(() => {
    if (tipoSolicitudes) {
      // Agrupación de solicitudes en permisos y licencias
      const permisosTemp = [];
      const licenciasTemp = [];

      tipoSolicitudes.permiso &&
        tipoSolicitudes.permiso.forEach((permiso) => {
          permisosTemp.push(permiso);
        });

      tipoSolicitudes.licencia &&
        tipoSolicitudes.licencia.forEach((licencia) => {
          licenciasTemp.push({
            id: licencia.id,
            categoria: licencia.nombre,
            caracteristicas: licencia.descripcion,
            diasCorrespondientes: licencia.cantDias,
          });
        });

      tipoSolicitudes.vacaciones &&
        licenciasTemp.push({
          id: tipoSolicitudes.vacaciones.id,
          categoria: 'vacaciones',
          caracteristicas: tipoSolicitudes.vacaciones.descripcion,
          diasCorrespondientes: tipoSolicitudes.vacaciones.cantDias,
        });

      setPermisos(permisosTemp);
      setLicencias(licenciasTemp);
    }
  }, [tipoSolicitudes]);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      tipo_solicitud_id: tipoSolicitudId,
    }));

    formData.tipo_solicitud_id &&
      licencias.length > 0 &&
      // console.log(licencias);
      setDiasRestantes(licencias.find((licencia) => licencia.id === tipoSolicitudId).diasCorrespondientes);

  }, [diasRestantes, tipoSolicitudId]);

  useEffect(() => {
    if (formData.tipo === 'Licencia') {
      setFormData(prevData => ({
        ...prevData,
        fechaDesde: slotInfo.desde,
        fechaHasta: slotInfo.hasta,
      }))
    } else if (formData.tipo === 'Permiso' && slotInfo.desde) {
      setFormData(prevData => ({
        ...prevData,
        fechaPermiso: slotInfo.desde,
      }))
    }
  }, [formData.tipo])

  useEffect(() => {
    if (formData.tipo === 'Licencia' && formData.fechaDesde && formData.fechaHasta) {
      const dias = calcularDiasSolicitados(formData.fechaDesde, formData.fechaHasta, feriados);
      console.log(dias);
      console.log(formData);
      setFormData((prevFormData) => ({
        ...prevFormData,
        diasSolicitados: dias,
      }));
    }
  }, [formData.fechaDesde, formData.fechaHasta]);

  useEffect(() => {
    // Validación para habilitar/deshabilitar el botón Enviar
    const isFormValid = () => {
      if (!formData.tipo || !formData.categoria) return false;

      if (formData.tipo === 'Licencia') {
        if (!formData.fechaDesde || !formData.fechaHasta || !formData.diasSolicitados) return false;
      } else if (formData.tipo === 'Permiso') {
        if (formData.categoria === 'Salir por un momento') {
          if (!formData.fechaPermiso) {
            setFormData((prev) => ({
              ...prev,
              fechaPermiso: dayjs().format('DD-MM-YYYY'),
            }));
          }
          return formData.motivo.length > 0
        }
        // if (formData.categoria === 'Salir por un momento' && !formData.motivo) return false;
        if (!formData.fechaPermiso || !formData.motivo) return false;
      }

      return true;
    };

    setDeshabilitarSubmit(!isFormValid());
  }, [formData]);

  const handleCambioAnio = (e) => {
    console.log(feriados);
    setAnio(dayjs(e).year());
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      empleado_id: empleado.id,
      fecha: dayjs().format('DD-MM-YYYY'),
    }));
  };

  const handleChangeTipoSolicitud = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...initialState,
      [name]: value,
    }));
  }

  const handleCancel = () => {
    setFormData(initialState);
    setLicencias([])
    setPermisos([])
    close();
  };

  const handleCompensatorioChange = () => {
    setCompensatorio(!compensatorio);
  };

  const handleConfirm = () => {
    
    dispatch(createSolicitud(formData));
    dispatch(getSolicitudesXEmpleado(empleado.id));
    setFormData(initialState);
    reload();
    close();
  };

  const handleClick = (id) => {
    setTipoSolicitudId(id);
    const licencia = licencias.find((licencia) => licencia.id === id);
    if (licencia) {
      setDiasRestantes(licencia.diasCorrespondientes);
    } else {
      setDiasRestantes(0);
    }
    // setDiasRestantes(licencias.find(licencia => licencia.id === id).diasCorrespondientes);    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validarFechasLicencia(formData.fechaDesde || formData.fechaPermiso, formData.fechaHasta, eventosYaSolicitados, setErrorFecha)) {
      validateForm(setFormData(prev => ({ ...prev, fechaDesde: '', fechaHasta: '' })));
      return;
    }


    setOpen(true);
  };

  return (
    <>
      <FormularioVisual
        formData={formData}
        setFormData={setFormData}
        diasRestantes={diasRestantes}
        handleChange={handleChange}
        handleChangeTipoSolicitud={handleChangeTipoSolicitud}
        permisos={permisos} // Pasamos permisos a FormularioVisual
        licencias={licencias} // Pasamos licencias a FormularioVisual
        shouldDisableDate={date => shouldDisableDate(date, feriados)}
        handleCambioAnio={handleCambioAnio}
        handleSubmit={handleSubmit} // Actualizamos handleSubmit
        handleCancel={handleCancel}
        deshabilitarSubmit={deshabilitarSubmit}
        compensatorio={compensatorio}
        handleCompensatorioChange={handleCompensatorioChange}
        handleClick={handleClick}
        feriados={feriados}
        dayLoading={dayLoading}
        setErrorFecha={setErrorFecha}
        errorFecha={errorFecha} // Pasamos errorFecha a FormularioVisual
      />
      <Confirmacion
        open={open}
        close={close} // La propiedad `close` se pasa al componente
        formData={formData} // Se asegura de pasar el estado completo del formulario
        cancel={handleCancel} // Cancelar acción
        confirm={handleConfirm} // Confirmar acción
      />
    </>
  );
};

export default FormularioContainer;
