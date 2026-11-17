document.querySelector('#formulario-registro').addEventListener('submit', function (event) {
    event.preventDefault();
    let cuentaValida = validarCuenta();
    let contrasena = document.querySelector('#contrasena').value;
    let repeticion = document.querySelector('#repetir-contrasena').value;
    let coinciden = contrasena === repeticion;
    let terminos = document.querySelector('#terminos').checked;

    document.querySelector('#error-repetir').innerText = coinciden ? '' : 'Las contraseñas no coinciden';
    document.querySelector('#error-terminos').innerText = terminos ? '' : 'Debés aceptar los términos y condiciones.';

    if (cuentaValida && coinciden && terminos) {
        location.href = 'login.html';
    }
});
