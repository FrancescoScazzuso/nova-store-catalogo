let enlaceLogout = document.querySelector('.enlace-logout');

enlaceLogout.addEventListener('click', function (event) {
    event.preventDefault();
    try {
        localStorage.removeItem('emailUsuario');
        actualizarSaludo();
    } catch (error) {
        document.querySelector('.saludo').innerText = 'No se pudo cerrar la sesión. Volvé a intentar.';
    }
});
