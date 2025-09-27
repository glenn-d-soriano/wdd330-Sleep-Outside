import ExternalServices from "./ExternalServices.mjs";
import { getLocalStorage, alertMessage } from "./utils.mjs";

const services = new ExternalServices();

export default class CheckoutProcess  {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.tax = 0;
        this.shipping = 0;
        this.orderTotal = 0;
        this.qttytotal = 0;
    }

    init() {
        this.list = getLocalStorage(this.key);
        this.calculateItemSubtotal();
        // this.calculateItemSummary();
    }

    calculateItemSubtotal() {
        // calculate and display the total dollar amount of the items in the cart,
        //  and the number of items.
        this.itemTotal =  this.list.reduce( (sum, item) => sum + item.FinalPrice * item.quantity, 0 );

        this.qttytotal = this.list.reduce((sum, item) => sum + item.quantity, 0 );

        this.calculateOrderTotal();
    }

    calculateOrderTotal() {


        // Calculate tax (as a number, and then convert to string for display later)
        this.tax = this.itemTotal * 0.06; // Keep as a number here!

        // Calculate shipping
        if (this.qttytotal === 1) {
            this.shipping = 10;
        } else {
            this.shipping = 10 + (this.qttytotal - 1) * 2;
        }

        // Calculate orderTotal (Keep as a number here!)
        this.orderTotal = this.itemTotal + this.shipping + this.tax;

        // Display totals (this is where we use toFixed for presentation)
        this.displayOrderTotals();
    }

    displayOrderTotals() {
        // once the totals are all calculated display them in the order summary page
        document.querySelector("#subT").value = `$ ${this.itemTotal.toFixed(2)}`;
        document.querySelector("#tax").value = `$ ${(this.itemTotal * 0.06).toFixed(2)}`;
        document.querySelector("#shipping").value = `$ ${this.shipping.toFixed(2)}`;
        document.querySelector("#oTotal").value = `$ ${this.orderTotal}`;
    }

    async checkout(form) {
        // ... code to build the order object (order.orderDate, order.items, etc.) ...
        // 1. Get form data and convert to JSON object
        const order = formDataToJSON(form);

        // 2. Populate the order object with calculated totals and items
        // (Ensure calculateOrderTotal has run recently, perhaps by calling it here)
        this.calculateOrderTotal();

        order.orderDate = new Date().toISOString();
        order.items = packageItems(this.list);
        order.orderTotal = this.orderTotal;
        order.tax = this.tax;
        order.shipping = this.shipping;


        try {
            // This is the code that might fail and throw the custom error
            const response = await this.externalServices.checkout(order);

            // 👇 SUCCESS PATH (Handle the Happy Path - Step 5)
            // Clear cart and redirect
            localStorage.removeItem(this.key);
            window.location.assign('/checkout/success.html');

        } catch (err) {
            // 👇 FAILURE PATH (Handle the Unhappy Path - Stretch Goal)
            // The 'err' object is the custom object we threw: { name: 'servicesError', message: jsonResponse }

            // We expect the detailed server errors to be in err.message.errors
            console.log(err);

            // Example: If the server returns specific validation errors:
            if (err.message && err.message.errors) {
                const errorList = Object.values(err.message.errors)
                    .map(e => e.message)
                    .join('<br>');

                // Use the alertMessage utility (from Stretch Goal)
                alertMessage(`There was an error with your order: <br>${errorList}`);
            } else {
                // General error fallback
                alertMessage('An unknown error occurred during checkout.');
            }
        }
    }
}

// takes the items currently stored in the cart (localstorage)
// and returns them in a simplified form.
function packageItems(items) {
// convert the list of products from localStorage to the simpler form 
// required for the checkout process. An Array.map would be perfect for this process.
    const simplifiedItems = items.map((item) => {
        console.log(item);
        return {
            id: item.Id,
            price: item.FinalPrice,
            name: item.Name,
            quantity: item.quantity,
        };
    });
  return simplifiedItems;
}



// takes a form element and returns an object where the key is the "name" of the form input.
function formDataToJSON(formElement) {
  const formData = new FormData(formElement), convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}