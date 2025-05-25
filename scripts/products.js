async function getProducts() {

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
    console.log(products);

    let productsHTML = '';

    products.forEach((product) => {

        productsHTML += `
        
        <div class="product-card">
            <img class="product-image" src="${product.image}" alt="Product Image">
            <div class="product-title">${product.title}</div>
            <div class="product-price">$${product.price}</div>
            <div class="product-rating">${product.rating.rate} stars (${product.rating.count} reviews)</div>
            <select class="quantity-select">
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
            <button class="add-to-cart-button js-add-to-cart-button">Add to Cart</button>
        </div>
        
        `
    })

    document.querySelector('.js-products-grid')
        .innerHTML = productsHTML;

}
renderProducts(); 