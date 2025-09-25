import { getLocalStorage } from "./utils.mjs";

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
}