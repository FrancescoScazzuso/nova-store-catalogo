let parametrosBusqueda = new URLSearchParams(location.search);
let terminoBusqueda = (parametrosBusqueda.get('busqueda') || '').trim();
let tituloBusqueda = document.querySelector('#titulo-busqueda');
let resultados = document.querySelector('#resultados');
let estadoResultados = document.querySelector('#estado-productos');

campoBusqueda.value = terminoBusqueda;

if (terminoBusqueda.length < 3) {
    estadoResultados.innerText = 'Ingresá al menos 3 caracteres en el buscador para buscar productos.';
} else {
    tituloBusqueda.innerText = 'Resultados de búsqueda para: ' + terminoBusqueda;

    fetch('data/catalogo.json')
        .then(function (response) {
            if (!response.ok) {
                throw new Error('No se pudo realizar la búsqueda.');
            }
            return response.json();
        })
        .then(function (data) {
            let productos = [];
            for (let i = 0; i < data.products.length; i++) {
                let producto = data.products[i];
                let texto = (producto.title + " " + producto.description + " " + (producto.brand || "")).toLowerCase();
                if (texto.includes(terminoBusqueda.toLowerCase())) {
                    productos.push(producto);
                }
            }
            resultados.innerHTML = crearTarjetas(productos);
            if (productos.length === 0) {
                estadoResultados.innerText = 'No hay resultados para el término: ' + terminoBusqueda;
            } else {
                estadoResultados.innerText = productos.length + ' productos encontrados.';
            }
        })
        .catch(function (error) {
            estadoResultados.innerText = 'No se pudo realizar la búsqueda. Volvé a intentar.';
            console.log(error);
        });
}
