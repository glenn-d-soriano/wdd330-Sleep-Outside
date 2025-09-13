import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ProductData("tents");
const productId = getParam("product");

const product = new ProductDetails(productId, dataSource);
product.init();

// console.log(dataSource.findProductById(productId));

// Function to add a product to the cart
// function addProductToCart(product) {
//   // Ensure cart is always an array
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
//     cart.push(product);
//   }

//   // Save updated array back into localStorage
//   setLocalStorage("so-cart", cart);
// }

// add to cart button event handler
// async function addToCartHandler(e) {
//   const product = await dataSource.findProductById(e.target.dataset.id);
//   addProductToCart(product);
// }

// add listener to Add to Cart button
// document
//   .getElementById("addToCart")
//   .addEventListener("click", addToCartHandler);
