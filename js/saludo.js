function actualizarSaludo() {
    let emailUsuario = null;
    let saludo = document.querySelector('.saludo');
    let enlaceLogin = document.querySelector('.enlace-login');
    let enlaceRegistro = document.querySelector('.enlace-registro');
    let enlaceLogout = document.querySelector('.enlace-logout');

    try {
        emailUsuario = localStorage.getItem('emailUsuario');
    } catch (error) {
        console.log('El almacenamiento local no está disponible.');
    }

    if (emailUsuario) {
        saludo.innerText = 'Bienvenido: ' + emailUsuario;
        saludo.hidden = false;
        enlaceLogout.hidden = false;
        enlaceLogin.hidden = true;
        enlaceRegistro.hidden = true;
    } else {
        saludo.innerText = '';
        saludo.hidden = true;
        enlaceLogout.hidden = true;
        enlaceLogin.hidden = false;
        enlaceRegistro.hidden = false;
    }
}

actualizarSaludo();
window.addEventListener('pageshow', actualizarSaludo);
window.addEventListener('storage', actualizarSaludo);
