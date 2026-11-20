fetch('https://dummyjson.com/products/category/smartphones?limit=10')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        crearTarjetas(data.products, '#productos-destacados');
        document.querySelector('#estado-destacados').innerHTML = '';
    })
    .catch(function () {
        document.querySelector('#estado-destacados').innerHTML = 'No se pudieron cargar los productos.';
    });

fetch('https://dummyjson.com/products/category/mobile-accessories?limit=10')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        crearTarjetas(data.products, '#productos-nuevos');
        document.querySelector('#estado-nuevos').innerHTML = '';
    })
    .catch(function () {
        document.querySelector('#estado-nuevos').innerHTML = 'No se pudieron cargar los productos.';
    });
