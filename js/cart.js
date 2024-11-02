document.addEventListener("DOMContentLoaded", function () {

    // Llama a la función para mostrar el carrito en la página
    
    displayCart();
});

//Verificar si se guardo algo en el carrito
function displayCart () {
    const cartItemsContainer = document.getElementById("cart-list");
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    cartItemsContainer.innerHTML = "";

    if(cartItems.length ===0) {
        cartItemsContainer.innerHTML = `
            <p>Aun no has añadido nungun producto</p>
            <br>
            <a href="index.html">Volver a inicio</a>`;     
    } else {
        cartItems.forEach((product, index) => {

        let newItem = `
            <div class="card mb-3 bg-secondary">
            <div class="row g-0 m-5">
              
                <div class="col-md-4 col-sm-12 d-flex justify-content-center align-items-center ">
                    <div class="card-img-top d-flex justify-content-center ">
                        <img src="${product.image}" alt="${product.name}" class="img-fluid" style="max-width: 100%; height: auto;">
                    </div>
                </div>
                
                
                <div class="col-md-8 col-sm-12 ps-4">
                    <div class="card-body d-flex flex-column justify-content-between position-relative h-100">
                        <h3 class="card-title">${product.name}</h3>
                        <p class="card-text fw-bold price">${product.cost}</p>
                        <p class="card-text">Cod-${product.id}</p>

                        <div class="product d-flex align-items-center mb-2 w-sm-auto d-sm-block">
                            <span class="me-2">Cantidad:</span>
                            <div class="input-group flex-nowrap " style="max-width: 120px;">
                                <button id="subtract" class="btn btn-light decrease-btn">-</button>
                                <input type="number" value="1" id="quantity" min="1" class="form-control text-center quantity-input">
                                <button id="add" class="btn btn-light increase-btn">+</button>
                            </div>
                        </div>

                        <button id="ver-btn-${product.id}" class="btn btn-dark position-relative m-2 order-2 order-sm-5" href="">Ver Detalles</button>
                        <button onclick="removeCartItem(${index})" class="btn btn-dark position-relative m-2 order-2 order-sm-5" href="">Eliminar</button>
                        
                    </div>
                </div>
            </div>
          </div>
        `;
        //Añadir tarjeta del producto
        cartItemsContainer.innerHTML += newItem;

        // Agregar evento para guardar ID y redirigir
        document.getElementById(`ver-btn-${product.id}`).addEventListener('click', function() {
            saveProductId(product.id, category);
        });

    });

    // Obtener todos los contenedores de productos
    const products = document.querySelectorAll('.product');

    // Iterar sobre cada contenedor de producto
    products.forEach(product => {
        const decreaseBtn = product.querySelector('.decrease-btn');
        const increaseBtn = product.querySelector('.increase-btn');
        const quantityInput = product.querySelector('.quantity-input');
    
        quantityInput.addEventListener('input', updateSubTotal);
    
        increaseBtn.addEventListener('click', () => {
            quantityInput.value = parseInt(quantityInput.value) + 1;
            updateSubTotal()
        });

        decreaseBtn.addEventListener('click', () => {
            quantityInput.value = parseInt(quantityInput.value) - 1;
            updateSubTotal()
        });
    })

    updateSubTotal();

    function updateSubTotal(){
        const subtotalElement = document.getElementById("subTotal");
        let subTotalValor = 0;

        let cards = document.querySelectorAll(".card-body")
    
        cards.forEach(card => {
            const quantityInput = card.querySelector('.quantity-input');
            const priceElement = card.querySelector('.price'); 

            //Por las dudas para asegurarme de que cantidad solo traiga números
            quantityInput.value = parseInt(quantityInput.value.replace(/[^0-9]/g, '')); 
    
            subTotalValor += quantityInput.value * priceElement.textContent;
        })
    
        subtotalElement.textContent = '$' + subTotalValor.toFixed(2);
    }
}}

 // Función para guardar el ID y redirigir a la página de detalles
 function saveProductId(id, category) {
    const queryString = `?id=${id}&category=${category}`;
    window.location.href = `product-info.html${queryString}`;
}

// Función para eliminar un producto del carrito
function removeCartItem(index) {
    
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    cartItems.splice(index, 1); // Eliminar el producto del array

    localStorage.setItem("cart", JSON.stringify(cartItems));

    displayCart(); // Actualizar la lista
}


