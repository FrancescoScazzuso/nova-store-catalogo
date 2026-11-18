// Funciones compartidas por las seis páginas.
function escaparTexto(texto) {
    return String(texto)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');
}

function nombreCategoria(slug) {
    return slug.replaceAll('-', ' ');
}

function formatearPrecio(precio) {
    return 'USD ' + Number(precio).toFixed(2);
}

function crearTarjetas(productos) {
    let tarjetas = '';

    for (let i = 0; i < productos.length; i++) {
        let producto = productos[i];
        tarjetas += `
            <article>
                <img src="${escaparTexto(producto.thumbnail)}" alt="${escaparTexto(producto.title)}" loading="lazy">
                <h3>${escaparTexto(producto.title)}</h3>
                <p>${escaparTexto(producto.description)}</p>
                <p class="precio">${formatearPrecio(producto.price)}</p>
                <a class="boton-detalle" href="product.html?id=${encodeURIComponent(producto.id)}">Ver detalle</a>
            </article>`;
    }

    return tarjetas;
}

// El buscador usa GET para que el término viaje en la query string.
let formularioBusqueda = document.querySelector('.formulario-busqueda');
let campoBusqueda = document.querySelector('#buscador');
let errorBusqueda = document.querySelector('#error-busqueda');

formularioBusqueda.addEventListener('submit', function (event) {
    let termino = campoBusqueda.value.trim();
    errorBusqueda.innerText = '';

    if (termino === '') {
        event.preventDefault();
        errorBusqueda.innerText = 'Ingresá un término de búsqueda.';
    } else if (termino.length < 3) {
        event.preventDefault();
        errorBusqueda.innerText = 'La búsqueda debe tener al menos 3 caracteres.';
    } else {
        campoBusqueda.value = termino;
    }

    if (errorBusqueda.innerText !== '') {
        campoBusqueda.focus();
    }
});

campoBusqueda.addEventListener('input', function () {
    errorBusqueda.innerText = '';
});

let listaCategorias = document.querySelector('.lista-categorias');
let estadoCategorias = document.querySelector('.estado-categorias');

fetch('https://dummyjson.com/products/categories')
    .then(function (response) {
        if (!response.ok) {
            throw new Error('No se pudieron cargar los datos.');
        }
        return response.json();
    })
    .then(function (categorias) {
        let enlaces = '';
        for (let i = 0; i < categorias.length; i++) {
            enlaces += `<li><a href="category.html?categoria=${encodeURIComponent(categorias[i].slug)}">${escaparTexto(categorias[i].name)}</a></li>`;
        }
        listaCategorias.innerHTML = enlaces;
        estadoCategorias.innerText = '';
    })
    .catch(function () {
        estadoCategorias.innerText = 'No se pudieron cargar los datos. Volvé a intentar.';
    });

function validarCuenta() {
    let email = document.querySelector('#email');
    let contrasena = document.querySelector('#contrasena').value;
    let errorEmail = '';
    let errorContrasena = '';

    if (email.value.trim() === '') {
        errorEmail = 'El email es obligatorio.';
    } else if (email.validity.typeMismatch) {
        errorEmail = 'Ingresá un email válido.';
    }
    if (contrasena.trim() === '') {
        errorContrasena = 'La contraseña es obligatoria.';
    } else if (contrasena.length < 6) {
        errorContrasena = 'La contraseña debe tener al menos 6 caracteres';
    }

    document.querySelector('#error-email').innerText = errorEmail;
    document.querySelector('#error-contrasena').innerText = errorContrasena;
    return errorEmail === '' && errorContrasena === '';
}
