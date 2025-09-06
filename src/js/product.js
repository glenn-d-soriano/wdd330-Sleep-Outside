import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

// Function to add a product to the cart
function addProductToCart(product) {
  // Ensure cart is always an array
  let cart = getLocalStorage("so-cart");
  if (!Array.isArray(cart)) {
    cart = [];
  }

  // Check if product already exists in cart
  const existingItem = cart.find((item) => item.Id === product.Id);

  if (existingItem) {
    existingItem.Quantity = (existingItem.Quantity || 1) + 1;
  } else {
    product.Quantity = 1;
    cart.push(product);
  }

  // Save updated array back into localStorage
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
