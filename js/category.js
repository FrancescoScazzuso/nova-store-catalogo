let parametrosCategoria = new URLSearchParams(location.search);
let categoria = parametrosCategoria.get('categoria');
let tituloCategoria = document.querySelector('#titulo-categoria');
let productosCategoria = document.querySelector('#productos-categoria');
let estadoProductos = document.querySelector('#estado-productos');

if (!categoria || categoria.trim() === '') {
    estadoProductos.innerText = 'Elegí una categoría del menú para ver sus productos.';
} else {
    tituloCategoria.innerText = 'Categoría: ' + nombreCategoria(categoria);
    document.title = 'Nova Store - ' + nombreCategoria(categoria);

    // Se muestran solo los productos originales que pertenecen a la categoría elegida.
    fetch('data/catalogo.json')
        .then(function (response) {
            if (!response.ok) {
                throw new Error('No se pudo cargar la categoría.');
            }
            return response.json();
        })
        .then(function (data) {
            let productos = [];
            for (let i = 0; i < data.products.length; i++) {
                if (data.products[i].category === categoria) {
                    productos.push(data.products[i]);
                }
            }
            productosCategoria.innerHTML = crearTarjetas(productos);
            if (productos.length === 0) {
                estadoProductos.innerText = 'No hay productos en esta categoría.';
            } else {
                estadoProductos.innerText = productos.length + ' productos en esta categoría.';
            }
        })
        .catch(function (error) {
            estadoProductos.innerText = 'No se pudo cargar la categoría. Elegí otra del menú o recargá la página.';
            console.log(error);
        });
}
