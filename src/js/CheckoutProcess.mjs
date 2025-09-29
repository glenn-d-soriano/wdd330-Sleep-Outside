import ExternalServices from "./ExternalServices.mjs";
import { getLocalStorage, setLocalStorage, removeAllAlerts, alertMessage } from "./utils.mjs";

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
        // calculate the tax and shipping amounts. Add those to the cart total to figure out the order total
        this.tax = (this.itemTotal * 0.06).toFixed(2);

        if (this.qttytotal === 1) {
            this.shipping = 10;
        } else {
            this.shipping = 10 + (this.qttytotal - 1) * 2; 
        }
        
        this.orderTotal = (this.itemTotal + this.shipping  + this.itemTotal * 0.0).toFixed(2)

        // display totals
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
    // get the form element data by the form name
    // convert the form data to a JSON order object using the formDataToJSON function
    // populate the JSON order object with the order Date, orderTotal, tax, shipping, and list of items
    // call the checkout method in the ExternalServices module and send it the JSON order data.
        const formElement = document.forms["formChOout"];
        const order = formDataToJSON(formElement);

        order.orderDate = new Date().toISOString();
        order.orderTotal = this.orderTotal;
        order.tax = this.tax;
        order.shipping = this.shipping;
        order.items = packageItems(this.list);
        // console.log(order);

        try {
            const response = await services.checkout(order);
            console.log(response);
            setLocalStorage(this.key, []);
            location.assign("/checkout/success.html")
        } catch (err) {
            removeAllAlerts();
            for ( let message in err.message) {
                alertMessage( err.message[message] );
            }
            // console.log(err);

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