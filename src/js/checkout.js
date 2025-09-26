import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const checkOP = new CheckoutProcess("so-cart", "checkout-summary");

checkOP.init();

// Add event listeners to fire calculateOrderTotal when the user changes the zip code
document.querySelector("#zip").addEventListener("blur", checkOP.calculateOrderTotal.bind(checkOP));

// listening for click on the button
document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
  if (!form.checkValidity()) {
      e.preventDefault(); // Stop form submission
      alert('Please fill out all required fields correctly.');
    } else {
      checkOP.checkout();
    }  
});
