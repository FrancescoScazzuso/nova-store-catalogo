let termino = (new URLSearchParams(location.search).get('busqueda') || '').trim();
let estadoResultados = document.querySelector('#estado-productos');
campoBusqueda.value = termino;

if (termino.length < 3) {
    estadoResultados.innerText = 'Ingresá al menos 3 caracteres.';
} else {
    document.querySelector('#titulo-busqueda').innerText = 'Resultados de búsqueda para: ' + termino;
    fetch('https://dummyjson.com/products/search?q=' + encodeURIComponent(termino) + '&limit=0')
        .then(function (response) {
            if (!response.ok) {
                throw new Error('No se pudieron cargar los datos.');
            }
            return response.json();
        })
        .then(function (data) {
            document.querySelector('#resultados').innerHTML = crearTarjetas(data.products);
            estadoResultados.innerText = data.products.length === 0 ? 'No hay resultados para el término: ' + termino : '';
        })
        .catch(function () {
            estadoResultados.innerText = 'No se pudieron cargar los datos. Volvé a intentar.';
        });
}
