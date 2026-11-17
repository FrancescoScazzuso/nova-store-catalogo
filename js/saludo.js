function actualizarSaludo() {
    let email = localStorage.getItem('emailUsuario');
    let saludo = document.querySelector('.saludo');

    saludo.innerText = email ? 'Bienvenido: ' + email : '';
    saludo.hidden = !email;
    document.querySelector('.enlace-logout').hidden = !email;
    document.querySelector('.enlace-login').hidden = Boolean(email);
    document.querySelector('.enlace-registro').hidden = Boolean(email);
}

actualizarSaludo();
window.addEventListener('pageshow', actualizarSaludo);
