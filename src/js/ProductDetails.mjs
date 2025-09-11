import { setLocalStorage, getLocalStorage } from "./utils.mjs";

export default class ProductDetails {

    constructor(productId, dataSource){
        this.productId = productId;
        this.dataSource = dataSource;
        this.product = {};
    }

    async init(){
        // use the datasource to get the details for the current product. 
        // findProductById will return a promise! use await or .then() to process it
        this.product = await this.dataSource.findProductById(this.productId);
        // the product details are needed before rendering the HTML
        this.renderProductDetails();
        // once the HTML is rendered, add a listener to the Add to Cart button
        // Notice the .bind(this). This callback will not work if the bind(this) is missing. Review the readings from this week on 'this' to understand w
        document
          .getElementById("addToCart")
          .addEventListener("click", this.addProductToCart.bind(this));
    }

    addProductToCart(){

        const cartItems = getLocalStorage("so-cart") || [];
        cartItems.push(this.product);
        setLocalStorage("so-cart", cartItems);
        // Ensure cart is always an array
        //   let cart = getLocalStorage("so-cart");
        //   if (!Array.isArray(cart)) {
        //     cart = [];
        //   }
        
        //   // Check if product already exists in cart
        //   const existingItem = cart.find((item) => item.Id === product.Id);
        
        //   if (existingItem) {
        //     existingItem.Quantity = (existingItem.Quantity || 1) + 1;
        //   } else {
        //     product.Quantity = 1;
        //     cart.push(this.product);
        //   }
        
        //   // Save updated array back into localStorage
        //   setLocalStorage("so-cart", cart);
    }

    renderProductDetails(){
        productDetailTemplate(this.product);
    }
}

function productDetailTemplate(product) {
        document.querySelector("h3").textContent = product.NameWithoutBrand;
        document.querySelector("h2").textContent = product.Brand.Name;

        const prodImg = document.querySelector("#prodImg");
        prodImg.src = product.Image;
        prodImg.alt = product.NameWithoutBrand;

        document.querySelector("#prodPrice").textContent = product.FinalPrice;
        document.querySelector("#prodColor").textContent = product.Colors[0].ColorName;
        document.querySelector("#prodDesc").innerHTML = product.DescriptionHtmlSimple;
        document.querySelector("#addToCart").dataset.Id = product.Id;
}

