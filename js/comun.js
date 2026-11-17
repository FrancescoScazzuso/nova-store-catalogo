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
    let nombres = { 'mobile-accessories': 'Accesorios', 'impresion-3d': 'Impresión 3D', 'realidad-virtual': 'Realidad virtual', 'perifericos': 'Periféricos', 'camaras': 'Cámaras' };
    return nombres[slug] || slug.replaceAll('-', ' ');
}

function formatearPrecio(precio) {
    return '$ ' + Number(precio).toLocaleString('es-AR');
}

function crearTarjetas(productos) {
    let tarjetas = '';

    for (let i = 0; i < productos.length; i++) {
        let producto = productos[i];
        tarjetas += `
            <article>
                <img src="${escaparTexto(producto.thumbnail)}" alt="${escaparTexto(producto.alt || producto.title)}" loading="lazy">
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
    campoBusqueda.setAttribute('aria-invalid', 'false');

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
        campoBusqueda.setAttribute('aria-invalid', 'true');
        campoBusqueda.focus();
    }
});

campoBusqueda.addEventListener('input', function () {
    errorBusqueda.innerText = '';
    campoBusqueda.setAttribute('aria-invalid', 'false');
});

// Las categorías y los productos se cargan del catálogo original de Nova Store.
let listaCategorias = document.querySelector('.lista-categorias');
let estadoCategorias = document.querySelector('.estado-categorias');

fetch('data/catalogo.json')
    .then(function (response) {
        if (!response.ok) {
            throw new Error('No se pudieron cargar las categorías.');
        }
        return response.json();
    })
    .then(function (data) {
        let categorias = data.categories;
        let enlaces = '';
        let parametros = new URLSearchParams(location.search);
        let categoriaActual = parametros.get('categoria');

        for (let i = 0; i < categorias.length; i++) {
            let categoria = categorias[i];
            let seleccionada = '';
            if (location.pathname.endsWith('/category.html') && categoriaActual === categoria.slug) {
                seleccionada = ' aria-current="page"';
            }
            enlaces += `<li><a href="category.html?categoria=${encodeURIComponent(categoria.slug)}"${seleccionada}>${escaparTexto(categoria.name)}</a></li>`;
        }

        listaCategorias.innerHTML = enlaces;
        estadoCategorias.innerText = '';
    })
    .catch(function (error) {
        estadoCategorias.innerText = 'No se pudieron cargar las categorías. Recargá la página para volver a intentar.';
        console.log(error);
    });

function mostrarErrorCampo(campo, mensaje, texto) {
    mensaje.innerText = texto;
    campo.setAttribute('aria-invalid', texto === '' ? 'false' : 'true');
}

function validarEmail(campo, mensaje) {
    let texto = '';
    if (campo.value.trim() === '') {
        texto = 'El email es obligatorio.';
    } else if (campo.validity.typeMismatch) {
        texto = 'Ingresá un email válido.';
    }
    mostrarErrorCampo(campo, mensaje, texto);
    return texto === '';
}

function validarContrasena(campo, mensaje) {
    let texto = '';
    if (campo.value.trim() === '') {
        texto = 'La contraseña es obligatoria.';
    } else if (campo.value.length < 6) {
        texto = 'La contraseña debe tener al menos 6 caracteres';
    }
    mostrarErrorCampo(campo, mensaje, texto);
    return texto === '';
}
