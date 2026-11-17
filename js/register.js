let formularioRegistro = document.querySelector('#formulario-registro');
let emailRegistro = document.querySelector('#email');
let contrasenaRegistro = document.querySelector('#contrasena');
let repetirContrasena = document.querySelector('#repetir-contrasena');
let terminos = document.querySelector('#terminos');

formularioRegistro.addEventListener('submit', function (event) {
    event.preventDefault();
    let emailValido = validarEmail(emailRegistro, document.querySelector('#error-email'));
    let contrasenaValida = validarContrasena(contrasenaRegistro, document.querySelector('#error-contrasena'));
    let contrasenasCoinciden = contrasenaRegistro.value === repetirContrasena.value;
    let mensajeRepetir = '';

    if (!contrasenasCoinciden) {
        mensajeRepetir = 'Las contraseñas no coinciden';
    } else if (repetirContrasena.value === '') {
        mensajeRepetir = 'Repetí la contraseña.';
        contrasenasCoinciden = false;
    }
    mostrarErrorCampo(repetirContrasena, document.querySelector('#error-repetir'), mensajeRepetir);

    let mensajeTerminos = '';
    if (!terminos.checked) {
        mensajeTerminos = 'Debés aceptar los términos y condiciones.';
    }
    mostrarErrorCampo(terminos, document.querySelector('#error-terminos'), mensajeTerminos);

    if (!emailValido) {
        emailRegistro.focus();
    } else if (!contrasenaValida) {
        contrasenaRegistro.focus();
    } else if (!contrasenasCoinciden) {
        repetirContrasena.focus();
    } else if (!terminos.checked) {
        terminos.focus();
    } else {
        // El registro de esta entrega redirige al login y no almacena contraseñas.
        location.href = 'login.html';
    }
});
