let formularioLogin = document.querySelector('#formulario-login');
let emailLogin = document.querySelector('#email');
let contrasenaLogin = document.querySelector('#contrasena');
let mensajeEmailLogin = document.querySelector('#error-email');
let mensajeContrasenaLogin = document.querySelector('#error-contrasena');
let errorLogin = document.querySelector('#error-login');

formularioLogin.addEventListener('submit', function (event) {
    event.preventDefault();
    errorLogin.innerText = '';
    let emailValido = validarEmail(emailLogin, mensajeEmailLogin);
    let contrasenaValida = validarContrasena(contrasenaLogin, mensajeContrasenaLogin);

    if (!emailValido) {
        emailLogin.focus();
    } else if (!contrasenaValida) {
        contrasenaLogin.focus();
    } else {
        // La consigna pide un login local: se guarda solo el email, nunca la contraseña.
        try {
            localStorage.setItem('emailUsuario', emailLogin.value.trim());
            location.href = 'index.html';
        } catch (error) {
            errorLogin.innerText = 'No se pudo guardar la sesión. Habilitá el almacenamiento del navegador y volvé a intentar.';
        }
    }
});
