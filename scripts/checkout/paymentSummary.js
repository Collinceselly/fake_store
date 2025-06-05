import { calculateCartQuantity, cart, removeFromCart, updateQuantity, updateDeliveryOption } from "../cart.js";
import { getMatchingProduct, getProducts } from "../products.js";
import { deliveryOptions, getDeliveryOption, calculateDeliveryDate } from "../deliveryOptions.js";
import { formatCurrency } from "../money.js"


export async function renderPaymentSummary() {
    let productPrice = 0;
    let shippingpriceCents = 0;

    for (const cartItem of cart) {
        const product = await getMatchingProduct(cartItem.productId);

        productPrice += product.price * cartItem.quantity;
       
        const deliverOption = getDeliveryOption(cartItem.deliveryOptionId);
        shippingpriceCents += deliverOption.priceCents;

    }

    const totalBeforeTaxCents = productPrice * 100 + shippingpriceCents;
    const totalBeforeTax = formatCurrency(totalBeforeTaxCents);
    const taxCents = totalBeforeTaxCents * 0.1;
    const tax = formatCurrency(taxCents);
    const orderTotalCents = totalBeforeTaxCents + taxCents;
    const orderTotal = formatCurrency(orderTotalCents);

    const paymentSummaryHTML = `
        <h2>Payment Summary</h2>
            <div>
                <span>Items:(${calculateCartQuantity()})</span>
                <span>$${productPrice}</span>
            </div>
            <div>
                <span>Shipping & Handling:</span>
                <span>$${formatCurrency(shippingpriceCents)}</span>
            </div>
            <div>
                <span>Total before Tax:</span>
                <span>$${totalBeforeTax}</span>
            </div>
            <div>
                <span>Estimated Tax:</span>
                <span>$${tax}</span>
            </div>
            <div class="total">
                <span>Order Total:</span>
                <span>$${orderTotal}</span>
            </div>
            <button class="place-order-button">Place Order</button>
    `

    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;

}