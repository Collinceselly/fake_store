import { calculateCartQuantity, cart, removeFromCart, updateQuantity, updateDeliveryOption } from "../cart.js";
import { getMatchingProduct, getProducts } from "../products.js";
import { deliveryOptions, getDeliveryOption, calculateDeliveryDate } from "../deliveryOptions.js";
import { formatCurrency } from "../money.js";
import { renderPaymentSummary } from "./paymentSummary.js";

export async function renderOrderSummary(){

    let cartSummaryHTML = '';

    for (const cartItem of cart) {

        const productId = parseInt(cartItem.productId, 10);

        const matchingProduct = await getMatchingProduct(productId);

        const deliveryOptionId = cartItem.deliveryOptionId;
      
        const deliveryOption = getDeliveryOption(deliveryOptionId);

        const dateString = calculateDeliveryDate(deliveryOption);


        // console.log('Matching Product: ', matchingProduct);

        cartSummaryHTML += `
        
        <div class="order-item js-order-item-${matchingProduct.id}">
                <img class="order-item-image" src="${matchingProduct.image}" alt="Product Image">
                <div class="order-item-details">
                    <div class="order-item-date">Delivery Date: ${dateString}</div>
                    <div class="order-item-title">${matchingProduct.title}</div>
                    <div class="order-item-price">$${matchingProduct.price}</div>
                    <div class="order-item-quantity-actions">
                        <div class="order-item-quantity js-order-item-quantity-${matchingProduct.id}">Quantity: ${cartItem.quantity}</div>
                        <button class="update-quantity-button js-update-quantity-button" data-product-id = "${matchingProduct.id}">Update Quantity</button>
                        <input class="new-quantity-input js-new-quantity-input-enter js-new-quantity-input-${matchingProduct.id}" data-product-id = "${matchingProduct.id}">
                        <button class="save-quantity-link link-primary js-save-quantity-link" data-product-id = "${matchingProduct.id}">save</button>
                        <button class="delete-button js-delete-button" data-product-id = "${matchingProduct.id}">Delete</button>
                    </div>
                </div>
                <div class="delivery-options">
                    <div class="delivery-label">Choose a delivery option</div>
                    ${deliveryOptionsHTML(matchingProduct, cartItem)}
                </div>
        </div>

        `

        
    };

    function deliveryOptionsHTML(matchingProduct, cartItem){
        let html = '';

        deliveryOptions.forEach((deliveryOption) => {
            const dateString = calculateDeliveryDate(deliveryOption);

            let priceString;

            if (deliveryOption.priceCents === 0) {
                priceString = 'FREE-Delivery'
            }
            else {
                priceString = `$${formatCurrency(deliveryOption.priceCents)} - Shipping`
            }

            const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

            html += `
                    <div class="delivery-option js-delvery-option"data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
                        <input type="radio" 
                        ${isChecked ? 'checked' : ''}
                            class="delivery-option-input"
                            name="delivery-option-${matchingProduct.id}">
                        <div>
                            <div class="delivery-option-date">
                            ${dateString}
                            </div>
                            <div class="delivery-option-price">
                            ${priceString}
                            </div>
                        </div>
                    </div>
            `
        })
        return html;


    }

    document.querySelector('.js-order-summary')
        .innerHTML = cartSummaryHTML; 
    
    
    document.querySelectorAll(`.js-delete-button`)
        .forEach((link) => {
            const productId = link.dataset.productId;
            link.addEventListener('click', () => {
                removeFromCart(productId);
            
            const container = document.querySelector(`.js-order-item-${productId}`);
           
            container.remove();


            updateCartQuantity();

            renderOrderSummary();

            renderPaymentSummary();

            })
        })

        function updateCartQuantity() {
            const cartQuantity = calculateCartQuantity();

            document.querySelector('.js-page-title').innerHTML = `Checkout (${cartQuantity} Items)`
        }
        updateCartQuantity()

    
    document.querySelectorAll('.js-update-quantity-button')
        .forEach((link) => {
            const productId = link.dataset.productId;
            link.addEventListener('click', () => {
                const container = document.querySelector(`.js-order-item-${productId}`);

                container.classList.add('is-editing-quantity');
            })
        })


    document.querySelectorAll('.js-save-quantity-link')
        .forEach((link) => {
            const productId = link.dataset.productId;

            link.addEventListener('click', () => {

                const quantityInput = document.querySelector(`.js-new-quantity-input-${productId}`);

                const newQuantity = Number(quantityInput.value);

                if (newQuantity < 0 || newQuantity >= 1000) {
                    alert('Quantity must be at least 0 and less than 1000');
                    return;
                  }
                updateQuantity(productId, newQuantity)

                const container = document.querySelector(`.js-order-item-${productId}`);
                
                container.classList.remove('is-editing-quantity');

                const quantityLabel = document.querySelector(`.js-order-item-quantity-${productId}`);

                quantityLabel.innerHTML = newQuantity;

                updateCartQuantity();

                renderOrderSummary();

                renderPaymentSummary();
                
            })
        })

    
    document.querySelectorAll('.js-new-quantity-input-enter')
        .forEach((input) => {
            const productId = input.dataset.productId;
            input.addEventListener('keydown', (event) => {

                if (event.key === 'Enter') {

                    const quantityInput = document.querySelector(`.js-new-quantity-input-${productId}`);

                    const newQuantity = Number(quantityInput.value)
                    
                    if (newQuantity < 0 || newQuantity >= 1000) {
                        alert('Quantity must be at least 0 and less than 1000');
                        return;
                    }
                    updateQuantity(productId, newQuantity);

                    const container = document.querySelector(`.js-order-item-${productId}`);
                    
                    container.classList.remove('is-editing-quantity');

                    const quantityLabel = document.querySelector(`.js-order-item-quantity-${productId}`);

                    quantityLabel.innerHTML = newQuantity;

                    updateCartQuantity();

                    renderOrderSummary();

                    renderPaymentSummary();
            }

            })
        })

         document.querySelectorAll('.js-delvery-option')
            .forEach((button) => {
            button.addEventListener('click', () => {
                const {productId, deliveryOptionId} = button.dataset
                updateDeliveryOption(productId, deliveryOptionId)
                
                renderOrderSummary()

                renderPaymentSummary()
            })
            })

    }
// renderOrderSummary();