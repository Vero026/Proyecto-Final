document.addEventListener('DOMContentLoaded', () => {
    const mainProductContainer = document.getElementById('main-product');
    const otherProductsContainer = document.getElementById('other-products');
    const catID = localStorage.getItem('catID');
    const apiUrl = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            const products = data.products;

            for (let i = 0; i < products.length; i++) {
                const esteProducto = products[i];
                
                if (i === 0){
                    mainProductContainer.innerHTML = `
                    <img src="${esteProducto.image}" alt="${esteProducto.name}">
                    <div class="description-container">
                        <h2>${esteProducto.name}</h2>
                        <p class="price">${esteProducto.currency + ' ' + esteProducto.cost}</p>
                        <p class="description">${esteProducto.description}</p>
                        <p class="sold">Cantidad vendidos: ${esteProducto.soldCount}</p>
                    </div>`;
                } else {
                    const productDiv = document.createElement('div');
                    productDiv.classList.add('item');
                    productDiv.innerHTML = `
                    <img src="${esteProducto.image}" alt="${esteProducto.name}">
                    <div class="description-container">
                        <h2>${esteProducto.name}</h2>
                        <p class="price">${esteProducto.currency + ' ' + esteProducto.cost}</p>
                        <p class="description">${esteProducto.description}</p>
                        <p class="sold">Cantidad vendidos: ${esteProducto.soldCount}</p>
                    </div>`;
                    otherProductsContainer.appendChild(productDiv);
                }
            }
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
});
