let parametrosProducto = new URLSearchParams(location.search);
let idProducto = parametrosProducto.get('id');
let estadoProducto = document.querySelector('#estado-producto');
let detalleProducto = document.querySelector('#detalle-producto');
let seccionReviews = document.querySelector('#seccion-reviews');

if (!idProducto || !/^\d+$/.test(idProducto) || Number(idProducto) < 1) {
    estadoProducto.innerText = 'Elegí un producto desde el catálogo para ver su detalle.';
} else {
    fetch('data/catalogo.json')
        .then(function (response) {
            if (!response.ok) {
                throw new Error('No se encontró el producto.');
            }
            return response.json();
        })
        .then(function (data) {
            let producto = null;
            for (let i = 0; i < data.products.length; i++) {
                if (data.products[i].id === Number(idProducto)) {
                    producto = data.products[i];
                }
            }
            if (!producto) {
                throw new Error("No se encontró el producto.");
            }
            // Cada dato se inserta en su elemento correspondiente de la maqueta.
            document.querySelector('#nombre-producto').innerText = producto.title;
            document.querySelector('#marca-producto').innerText = producto.brand || 'Sin marca informada';
            document.querySelector('#descripcion-producto').innerText = producto.detailDescription || producto.description;
            document.querySelector('#precio-producto').innerText = formatearPrecio(producto.price);
            document.querySelector('#stock-producto').innerText = producto.stock === null ? 'No informado' : producto.stock + ' unidades';
            document.title = 'Nova Store - ' + producto.title;

            let fotoProducto = document.querySelector('#foto-producto');
            fotoProducto.src = producto.images[0] || producto.thumbnail;
            fotoProducto.alt = producto.detailAlt || producto.alt || producto.title;

            let enlaceCategoria = document.querySelector('#categoria-producto');
            enlaceCategoria.innerText = nombreCategoria(producto.category);
            enlaceCategoria.href = 'category.html?categoria=' + encodeURIComponent(producto.category);

            let tags = '';
            for (let i = 0; i < producto.tags.length && i < 3; i++) {
                tags += '<li>' + escaparTexto(producto.tags[i]) + '</li>';
            }
            document.querySelector('#tags-producto').innerHTML = tags;

            let reviews = '';
            for (let i = 0; i < producto.reviews.length; i++) {
                let review = producto.reviews[i];
                reviews += `
                    <article>
                        <h3>Rating: ${escaparTexto(review.rating)} / 5</h3>
                        <p>${escaparTexto(review.comment)}</p>
                        <p>Fecha: ${escaparTexto(review.date.slice(0, 10))}</p>
                        <p>Usuario: ${escaparTexto(review.reviewerName)}</p>
                    </article>`;
            }
            document.querySelector('#reviews').innerHTML = reviews;
            if (producto.reviews.length === 0) {
                document.querySelector('#estado-reviews').innerText = 'Este producto todavía no tiene reviews.';
            }

            estadoProducto.innerText = '';
            detalleProducto.hidden = false;
            seccionReviews.hidden = false;
        })
        .catch(function (error) {
            estadoProducto.innerText = 'No se pudo cargar el producto. Revisá el enlace o volvé al catálogo.';
            console.log(error);
        });
}
