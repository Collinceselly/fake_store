import { cart } from "../cart.js";
import { getMatchingProduct, getProducts } from "../products.js";


export async function renderOrderSummary(){

    let cartSummaryHTML = '';

    for (const cartItem of cart) {

        const productId = parseInt(cartItem.productId, 10);

        const matchingProduct = await getMatchingProduct(productId);

        console.log('Matching Product: ', matchingProduct);

        cartSummaryHTML += `
        
        <div class="order-item">
                <img class="order-item-image" src="${matchingProduct.image}" alt="Product Image">
                <div class="order-item-details">
                    <div class="order-item-date">Estimated Delivery: May 30, 2025</div>
                    <div class="order-item-title">${matchingProduct.title}</div>
                    <div class="order-item-quantity-actions">
                        <div class="order-item-quantity">Quantity: ${cartItem.quantity}</div>
                        <button class="update-quantity-button">Update Quantity</button>
                        <button class="delete-button">Delete</button>
                    </div>
                </div>
                <div class="delivery-options">
                    <div class="delivery-label">Choose a delivery option</div>
                    <label><input type="radio" name="delivery-1" value="standard"> Standard (5-7 days)</label>
                    <label><input type="radio" name="delivery-1" value="express"> Express (2-3 days)</label>
                    <label><input type="radio" name="delivery-1" value="overnight"> Overnight (1 day)</label>
                </div>
        </div>

        `

        
    };

    document.querySelector('.js-order-summary')
        .innerHTML = cartSummaryHTML; 

    }
renderOrderSummary();