let parametrosProducto = new URLSearchParams(location.search);
let idProducto = parametrosProducto.get('id');
let estadoProducto = document.querySelector('#estado-producto');
let detalleProducto = document.querySelector('#detalle-producto');
let seccionReviews = document.querySelector('#seccion-reviews');

if (!idProducto || !/^\d+$/.test(idProducto) || Number(idProducto) < 1) {
    estadoProducto.innerText = 'Elegí un producto desde el catálogo para ver su detalle.';
} else {
    cargarDatos('https://dummyjson.com/products/' + encodeURIComponent(idProducto), function (producto) {
        document.querySelector('#nombre-producto').innerText = producto.title;
        document.querySelector('#marca-producto').innerText = producto.brand || 'Sin marca informada';
        document.querySelector('#descripcion-producto').innerText = producto.description;
        document.querySelector('#precio-producto').innerText = formatearPrecio(producto.price);
        document.querySelector('#stock-producto').innerText = producto.stock == null ? 'No informado' : producto.stock + ' unidades';
        document.title = 'Nova Store - ' + producto.title;

        let fotoProducto = document.querySelector('#foto-producto');
        fotoProducto.src = producto.images[0] || producto.thumbnail;
        fotoProducto.alt = producto.title;

        let enlaceCategoria = document.querySelector('#categoria-producto');
        enlaceCategoria.innerText = nombreCategoria(producto.category);
        enlaceCategoria.href = 'category.html?categoria=' + encodeURIComponent(producto.category);

        let etiquetas = producto.tags || [];
        let comentarios = producto.reviews || [];
        let tags = '';
        for (let i = 0; i < etiquetas.length && i < 3; i++) {
            tags += '<li>' + escaparTexto(etiquetas[i]) + '</li>';
        }
        document.querySelector('#tags-producto').innerHTML = tags;

        let reviews = '';
        for (let i = 0; i < comentarios.length; i++) {
            let review = comentarios[i];
            reviews += `
                <article>
                    <h3>Rating: ${escaparTexto(review.rating)} / 5</h3>
                    <p>${escaparTexto(review.comment)}</p>
                    <p>Fecha: ${escaparTexto(review.date.slice(0, 10))}</p>
                    <p>Usuario: ${escaparTexto(review.reviewerName)}</p>
                </article>`;
        }
        document.querySelector('#reviews').innerHTML = reviews;
        if (comentarios.length === 0) {
            document.querySelector('#estado-reviews').innerText = 'Este producto todavía no tiene reviews.';
        }

        estadoProducto.innerText = '';
        detalleProducto.hidden = false;
        seccionReviews.hidden = false;
    }, estadoProducto);
}
