import ShoppingCart from "./ShoppingCart.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const parentElement = document.querySelector(".product-list");
const cart = new ShoppingCart("so-cart", parentElement);

document.querySelector("#btnChOut").addEventListener("click", () => {
  window.location.href = "/checkout/index.html";
});

cart.init();
loadHeaderFooter();
