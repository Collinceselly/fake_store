import { renderOrderSummary } from "./checkout/orderSummary.js";
import { getProducts } from "./products.js";
import { cart } from "./cart.js";


export async function loadCheckoutPage() {

    try{
        const productList = await getProducts();
        // console.log('ProductList: ', productList)
    }
    catch {
        console.log('Unexpected Error occured! Try again later.')
    }

    renderOrderSummary();
}

loadCheckoutPage();