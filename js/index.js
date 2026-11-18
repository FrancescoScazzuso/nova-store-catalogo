fetch('https://dummyjson.com/products/category/smartphones?limit=10')
    .then(function (response) {
        if (!response.ok) {
            throw new Error('No se pudieron cargar los datos.');
        }
        return response.json();
    })
    .then(function (data) {
        document.querySelector('#productos-destacados').innerHTML = crearTarjetas(data.products);
        document.querySelector('#estado-destacados').innerText = '';
    })
    .catch(function () {
        document.querySelector('#estado-destacados').innerText = 'No se pudieron cargar los datos. Volvé a intentar.';
    });

fetch('https://dummyjson.com/products/category/mobile-accessories?limit=10')
    .then(function (response) {
        if (!response.ok) {
            throw new Error('No se pudieron cargar los datos.');
        }
        return response.json();
    })
    .then(function (data) {
        document.querySelector('#productos-nuevos').innerHTML = crearTarjetas(data.products);
        document.querySelector('#estado-nuevos').innerText = '';
    })
    .catch(function () {
        document.querySelector('#estado-nuevos').innerText = 'No se pudieron cargar los datos. Volvé a intentar.';
    });
