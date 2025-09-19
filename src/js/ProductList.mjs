import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `
        <li class="product-card">
            <a href="/product_pages/?product=${product.Id}">
                <img src="${product.Images.PrimaryLarge}" alt="Image of ${product.Name}"  loading="lazy"/>
                <h3 class="card_brand">${product.Brand.Name}</h3>
                <h4 class="card_name">${product.Name}</h4>
                <p class="product-card_price">$ ${product.FinalPrice}</p>
            </a>
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
        // const htmlStrings = list.map(productCardTemplate);
        // this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));

        // apply use new utility function instead of the commented code above
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
}