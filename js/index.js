function cargarSeccion(seccion, contenedor, estado) {
    fetch('data/catalogo.json')
        .then(function (response) {
            if (!response.ok) {
                throw new Error('No se pudo cargar la sección.');
            }
            return response.json();
        })
        .then(function (data) {
            let productos = [];
            for (let i = 0; i < data.products.length; i++) {
                if (data.products[i].section === seccion) {
                    productos.push(data.products[i]);
                }
            }
            contenedor.innerHTML = crearTarjetas(productos);
            estado.innerText = '';
            if (productos.length === 0) {
                estado.innerText = 'No hay productos disponibles en esta sección.';
            }
        })
        .catch(function (error) {
            estado.innerText = 'No se pudieron cargar los productos. Recargá la página para volver a intentar.';
            console.log(error);
        });
}

cargarSeccion('destacados', document.querySelector('#productos-destacados'), document.querySelector('#estado-destacados'));
cargarSeccion('nuevos', document.querySelector('#productos-nuevos'), document.querySelector('#estado-nuevos'));
