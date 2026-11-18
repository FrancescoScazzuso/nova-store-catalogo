let categoria = new URLSearchParams(location.search).get('categoria');
let estadoProductos = document.querySelector('#estado-productos');

if (!categoria) {
    estadoProductos.innerText = 'Elegí una categoría del menú.';
} else {
    document.querySelector('#titulo-categoria').innerText = 'Categoría: ' + nombreCategoria(categoria);
    fetch('https://dummyjson.com/products/category/' + encodeURIComponent(categoria) + '?limit=0')
        .then(function (response) {
            if (!response.ok) {
                throw new Error('No se pudieron cargar los datos.');
            }
            return response.json();
        })
        .then(function (data) {
            document.querySelector('#productos-categoria').innerHTML = crearTarjetas(data.products);
            estadoProductos.innerText = data.products.length === 0 ? 'No hay productos en esta categoría.' : '';
        })
        .catch(function () {
            estadoProductos.innerText = 'No se pudieron cargar los datos. Volvé a intentar.';
        });
}
