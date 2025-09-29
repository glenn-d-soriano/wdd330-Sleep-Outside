import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter();

const checkOP = new CheckoutProcess("so-cart", "checkout-summary");

checkOP.init();

// Add event listeners to fire calculateOrderTotal when the user changes the zip code
document.querySelector("#zip").addEventListener("blur", checkOP.calculateOrderTotal.bind(checkOP));

// listening for click on the button
document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
  e.preventDefault(); // Stop form submission
  const form = document.forms[0];
  form.reportValidity();
  
  // if (!form.checkValidity()) {      
  //     alert('Please fill out all required fields correctly.');
  // } else {
  //     checkOP.checkout();
  // }
  
  if (form.checkValidity()) {      
      checkOP.checkout();
  }
});
