import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

// Function to add a product to the cart
function addProductToCart(product) {
  // get current cart or empty array
  let cart = getLocalStorage("so-cart") || [];

  // Find the existing item in the cart by its ID
  const existingItem = cart.find(item => item.Id === product.Id);

  if (existingItem) {
    // If the item exists, increment its quantity
    existingItem.Quantity = (existingItem.Quantity || 1) + 1;
  } else {
    // If the item doesn't exist, add it to the cart with a quantity of 1
    product.Quantity = 1;
    cart.push(product);
  }

  // save back to localStorage
  setLocalStorage("so-cart", cart);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);