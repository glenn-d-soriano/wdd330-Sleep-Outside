import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";
import ExternalServices from "./ExternalServices.mjs"; // 👈 1. Import ExternalServices

loadHeaderFooter();

// Create an instance of ExternalServices
const services = new ExternalServices(); // 👈 2. Instantiate ExternalServices

// Instantiate CheckoutProcess, passing the cart key and the selector for the summary (though you might not use the selector here)
const checkOP = new CheckoutProcess("so-cart", "checkout-summary");

// 3. Link the ExternalServices instance to the CheckoutProcess instance
checkOP.externalServices = services;

checkOP.init();

// Add event listeners to fire calculateOrderTotal when the user changes the zip code
document.querySelector("#zip").addEventListener("blur", checkOP.calculateOrderTotal.bind(checkOP));

// 4. Update the event listener to correctly handle form validation and submission
document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
    e.preventDefault(); // ALWAYS prevent default on the button click

    // Get the form element (Assuming it's the first form on the page)
    const myForm = document.forms[0];

    // Check validation status
    const chk_status = myForm.checkValidity();

    // Display the built-in browser messages for invalid fields
    myForm.reportValidity();

    // If valid, proceed with the checkout process
    if (chk_status) {
        // Pass the form element to the checkout method for data extraction
        checkOP.checkout(myForm);
    }
});