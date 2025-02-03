const validarDomicilio = (domicilio) => {
    let errores = {};

    if (!domicilio.calle || domicilio.calle.trim() === '') {
        errores.calle = 'La calle es obligatoria';
    }

    if (!domicilio.numero || domicilio.numero.trim() === '') {
        errores.numero = 'El número es obligatorio';
    }

    if (!domicilio.ciudad || domicilio.ciudad.trim() === '') {
        errores.ciudad = 'La ciudad es obligatoria';
    }

    if (!domicilio.cod_postal || domicilio.cod_postal.trim() === '') {
        errores.cod_postal = 'El código postal es obligatorio';
    }

    return errores;
}

export default validarDomicilio;