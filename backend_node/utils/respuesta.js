module.exports = {
    exito: (datos, mensaje = 'Operación realizada correctamente') => ({
        ok: true,
        datos: datos,
        mensaje: mensaje,
    }),

    error: (datos, mensaje = "Error en la consulta", codError) => ({
        ok: false,
        datos: null,
        mensaje: mensaje,
        codError: codError,
    })
}