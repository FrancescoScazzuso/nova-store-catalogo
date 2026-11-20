let queryString = location.search;
let parametros = new URLSearchParams(queryString);
let categoria = parametros.get('categoria');
let estadoProductos = document.querySelector('#estado-productos');

if (categoria === null || categoria === '') {
    estadoProductos.innerText = 'Elegí una categoría del menú.';
} else {
    document.querySelector('#titulo-categoria').innerText = 'Categoría: ' + categoria;
    fetch('https://dummyjson.com/products/category/' + categoria + '?limit=0')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            crearTarjetas(data.products, '#productos-categoria');
            estadoProductos.innerText = '';
            if (data.products.length === 0) {
                estadoProductos.innerText = 'No hay productos en esta categoría.';
            }
        })
        .catch(function () {
            estadoProductos.innerText = 'No se pudieron cargar los productos.';
        });
}
