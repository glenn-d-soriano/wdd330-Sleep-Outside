import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

const checkOP = new CheckoutProcess("so-cart", "checkout-summary");

checkOP.init();

loadHeaderFooter();
