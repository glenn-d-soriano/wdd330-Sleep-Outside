import { setSuperscript, loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

loadHeaderFooter();
setSuperscript();

const cart = new ShoppingCart("so-cart", ".product-list");
cart.init();