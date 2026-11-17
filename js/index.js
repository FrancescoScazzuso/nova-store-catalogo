function cargarSeccion(categoria, nombre) {
    let contenedor = document.querySelector('#productos-' + nombre);
    let estado = document.querySelector('#estado-' + nombre);

    cargarDatos('https://dummyjson.com/products/category/' + categoria + '?limit=10', function (data) {
        contenedor.innerHTML = crearTarjetas(data.products);
        estado.innerText = '';
    }, estado);
}

cargarSeccion('smartphones', 'destacados');
cargarSeccion('mobile-accessories', 'nuevos');
