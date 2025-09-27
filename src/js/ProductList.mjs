import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    let discountHtml = '';

    // 1. Check for a discount
    if (product.SuggestedRetailPrice > product.FinalPrice) {
        // 2. Calculate the discount percentage
        const discountAmount = product.SuggestedRetailPrice - product.FinalPrice;
        // Calculate the percentage and round it
        const discountPercent = Math.round((discountAmount / product.SuggestedRetailPrice) * 100);

        // 3. Generate the discount badge HTML
        discountHtml = `<div class="discount-badge">SAVE ${discountPercent}%</div>`;
    }

    // Determine which price to display: FinalPrice or SuggestedRetailPrice
    const priceDisplay = (product.SuggestedRetailPrice > product.FinalPrice) ? `<div> <p class="product-card_price discount-price-original">Original Price: $${product.SuggestedRetailPrice.toFixed(2) }</p> <p class="product-card_price current-price">Discounted Price: $${product.FinalPrice.toFixed(2)}</p> </div>` : `<p class="product-card_price">$ ${product.FinalPrice.toFixed(2)}</p>`;

    return `
        <li class="product-card">
            <a href="/product_pages/?product=${product.Id}">
                ${discountHtml} <img src="${product.Images.PrimaryLarge}" alt="Image of ${product.Name}"  loading="lazy"/>
                <h3 class="card_brand">${product.Brand.Name}</h3>
                <h4 class="card_name">${product.Name}</h4>
                ${priceDisplay} </a>
        </li>
        `;
}

// to generate a list of product cards in HTML from an array
export default class ProductList {

    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        const list = await this.dataSource.getData(this.category);
        this.renderList(list);
    }

    renderList(list) {
        // apply use new utility function instead of the commented code above
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
}