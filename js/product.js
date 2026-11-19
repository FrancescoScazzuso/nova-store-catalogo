let queryString = location.search;
let parametros = new URLSearchParams(queryString);
let idProducto = parametros.get('id');
let estadoProducto = document.querySelector('#estado-producto');

if (Number(idProducto) > 0) {
    fetch('https://dummyjson.com/products/' + idProducto)
        .then(function (response) {
            return response.json();
        })
        .then(function (producto) {
            if (producto.id === undefined) {
                estadoProducto.innerText = 'No se encontró el producto.';
                return;
            }

            document.querySelector('#nombre-producto').innerText = producto.title;
            document.querySelector('#descripcion-producto').innerText = producto.description;
            document.querySelector('#precio-producto').innerText = 'USD ' + producto.price;
            document.querySelector('#foto-producto').src = producto.thumbnail;
            document.querySelector('#stock-producto').innerText = producto.stock + ' unidades';

            let marca = 'Sin marca informada';
            if (producto.brand !== undefined && producto.brand !== null) {
                marca = producto.brand;
            }
            document.querySelector('#marca-producto').innerText = marca;
            document.querySelector('#categoria-producto').innerHTML = `<a href="category.html?categoria=${producto.category}"></a>`;
            document.querySelector('#categoria-producto a').innerText = producto.category;

            let etiquetas = [];
            if (producto.tags !== undefined && producto.tags !== null) {
                etiquetas = producto.tags;
            }
            let tags = '';
            for (let i = 0; i < etiquetas.length && i < 3; i++) {
                tags += '<li></li>';
            }
            document.querySelector('#tags-producto').innerHTML = tags;
            let textosTags = document.querySelectorAll('#tags-producto li');
            for (let i = 0; i < etiquetas.length && i < 3; i++) {
                textosTags[i].innerText = etiquetas[i];
            }

            let comentarios = [];
            if (producto.reviews !== undefined && producto.reviews !== null) {
                comentarios = producto.reviews;
            }
            let reviews = '';
            for (let i = 0; i < comentarios.length; i++) {
                reviews += `
                    <article>
                        <h3 class="rating"></h3>
                        <p class="comentario"></p>
                        <p class="fecha"></p>
                        <p class="usuario"></p>
                    </article>`;
            }
            document.querySelector('#reviews').innerHTML = reviews;
            let ratings = document.querySelectorAll('#reviews .rating');
            let textos = document.querySelectorAll('#reviews .comentario');
            let fechas = document.querySelectorAll('#reviews .fecha');
            let usuarios = document.querySelectorAll('#reviews .usuario');
            for (let i = 0; i < comentarios.length; i++) {
                ratings[i].innerText = 'Rating: ' + comentarios[i].rating + ' / 5';
                textos[i].innerText = comentarios[i].comment;
                fechas[i].innerText = 'Fecha: ' + comentarios[i].date;
                usuarios[i].innerText = 'Usuario: ' + comentarios[i].reviewerName;
            }
            if (comentarios.length === 0) {
                document.querySelector('#estado-reviews').innerText = 'Este producto todavía no tiene reviews.';
            }

            estadoProducto.innerText = '';
            document.querySelector('#detalle-producto').style.display = 'block';
            document.querySelector('#seccion-reviews').style.display = 'block';
        })
        .catch(function () {
            estadoProducto.innerText = 'No se pudo cargar el producto.';
        });
} else {
    estadoProducto.innerText = 'Elegí un producto desde el catálogo.';
}
