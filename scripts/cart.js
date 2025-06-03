export let cart = JSON.parse(localStorage.getItem('cart'), (key, value) => {
    if (key === 'productId') return parseInt(value, 10); // Converts the productId into integers since in json it is stored as a string
    return value;
}); // Retreiving products from the cart object if any.

if (!cart) { // If cart empty, use the below array of objects
    cart = [{
        productId: '1',
        quantity: 1,
        deliveryOptionId: '1'
    },{
        productId: '2',
        quantity: 2,
        deliveryOptionId: '2'
    }]
}


function saveTostorage() { 
    localStorage.setItem('cart', JSON.stringify(cart)); // Save the cart into local storage
}


// A function that add items to a cart and save in local storage
export function addTocart(productId) {
    const id = parseInt(productId, 10)
    let matchingItem;

    cart.forEach((cartItem) => {
        if (cartItem.productId === id) {
            matchingItem = cartItem; // Getting a product that matches the productId selected
        }
    })

    const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`); 
    const quantityValue = Number(quantitySelector.value); // Getting the value from the select list and converting into numbers

    if (matchingItem) {
        matchingItem.quantity += quantityValue; // If product already exists in the cart, just update the quantity
    }
    else {
        cart.push({                  // If a new product, push or add into the cart
            productId: productId,
            quantity: quantityValue,
            deliveryOptionId: '1'
        })
    }
    saveTostorage();

}

export function calculateCartQuantity() {
    let cartQuantity = 0;
    cart.forEach((cartItem)  => {
        cartQuantity += cartItem.quantity;
    })

    return cartQuantity;
}

export function removeFromCart(productId) {
    const id = parseInt(productId, 10);
    const newCart = [];

    cart.forEach((cartItem) => {
        if (cartItem.productId !== id) {
            newCart.push(cartItem)
        }
    })

    cart = newCart;

    saveTostorage();

}

export function updateQuantity(productId, newQuantity) {
    let marchingItem;

    cart.forEach((cartItem) => {
        const id = parseInt(productId, 10);
        
        if (cartItem.productId === id) {
            marchingItem = cartItem;
        }
    })
    marchingItem.quantity = newQuantity;

    saveTostorage();
}


export function updateDeliveryOption(productId, deliveryOptionId) {
    let machingItem;

    cart.forEach((cartItem) => {
        const id = parseInt(productId, 10)
        if (id === cartItem.productId) {
            machingItem = cartItem;
        }
    });


    machingItem.deliveryOptionId = deliveryOptionId;

    saveTostorage();
}

