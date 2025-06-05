import { cart, addTocart } from "./cart.js";

export async function getProducts() {

    try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;

    } catch (error) {
        console.log('Fetch error', error);
        return null;
    }
}


async function renderProducts() {

    const products = await getProducts();

    let productsHTML = '';

    products.forEach((product) => {

        productsHTML += `
        
        <div class="product-card">
            <img class="product-image" src="${product.image}" alt="Product Image">
            <div class="product-title">${product.title}</div>
            <div class="product-price">$${product.price}</div>
            <div class="product-rating">${product.rating.rate} stars (${product.rating.count} reviews)</div>
            <select class="quantity-select js-quantity-selector-${product.id}">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>

            <div class="product-spacer"></div>

            <div class="added-to-cart js-added-to-cart-${product.id}">
              <img src="images/checkmark.png">
              Added
            </div>

            <button class="add-to-cart-button js-add-to-cart-button" data-product-id="${product.id}">Add to Cart</button>
        </div>
        
        `
    })

    document.querySelector('.js-products-grid')
        .innerHTML = productsHTML;
    
    
    function updateCartQuantity() {
        let cartQuantity = 0;

        cart.forEach((cartItem) => {
            cartQuantity += cartItem.quantity;
        
        })
        document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
    }
    updateCartQuantity();
    
    
    document.querySelectorAll('.js-add-to-cart-button')
        .forEach((button) => {
            button.addEventListener('click', () => {
                const productId = button.dataset.productId;
                addTocart(productId);
                updateCartQuantity();
                // console.log(cart);

                const addedMessageTimeouts = {};
                const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);
                addedMessage.classList.add('added-message-visible');

                setTimeout(() => {
                    const previousTimeoutId = addedMessageTimeouts[productId];

              if (previousTimeoutId) {
                  clearTimeout(previousTimeoutId);
                }
          
                const timeoutId = setTimeout(() => {
                  addedMessage.classList.remove('added-message-visible');
                }, 2000);
          
                // Save the timeoutId for this product
                // so we can stop it later if we need to.
                addedMessageTimeouts[productId] = timeoutId;
                })
            })
        })
     
}

// document.addEventListener('DOMContentLoaded', renderProducts);
renderProducts();


export async function getMatchingProduct(productId) {

    const products = await getProducts();

    let matchingProduct;

    products.forEach((product) => {
        if (product.id === productId) {
            matchingProduct = product;
        }
    })

    return matchingProduct;
}

// getMatchingProduct(productId);

/*
async function logProduct() {
    const result = await getMatchingProduct(1);
    console.log(result); // Logs the resolved value (the matching product)
}

logProduct(); */